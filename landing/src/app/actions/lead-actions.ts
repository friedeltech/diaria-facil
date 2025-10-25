"use server";

import { sendWelcomeEmail } from "@/lib/email";
import { prisma } from "@/lib/prisma";
import { CustomerLeadType, ProfessionalLeadType } from "@/schemas/lead-schemas";
import { headers } from "next/headers";

type SubmitLeadState = {
  success: boolean;
  data?: unknown;
  existing?: boolean;
  error?: string;
};

export async function submitLead(
  prevState: SubmitLeadState | null,
  leadData: CustomerLeadType
) {
  try {
    console.log("✅ Recebido novo lead", leadData);
    const headersList = headers();

    leadData.ipAddress =
      (await headersList).get("x-forwarded-for")?.split(",")[0] ||
      (await headersList).get("x-real-ip") ||
      (await headersList).get("cf-connecting-ip") || // Cloudflare
      (await headersList).get("x-client-ip") ||
      "IP não disponível";

    const existingLead = await prisma.leadCustomers.findUnique({
      where: { email: leadData.email },
    });

    if (existingLead) {
      console.log(
        "⚠️ Lead já existente:",
        leadData.email,
        " - Atualizando informações."
      );
      await prisma.leadCustomers.update({
        where: { email: leadData.email },
        data: {
          ...leadData,
          updatedAt: new Date(),
        },
      });
      return { success: true, data: existingLead, existing: true };
    }

    const lead = await prisma.leadCustomers.create({
      data: leadData,
    });

    console.log("🎉 Novo lead criado:", lead.email);

    // Enviar e-mail de boas-vindas de forma assíncrona (fire and forget)
    await sendWelcomeEmail(lead.email, lead.fullName);

    return { success: true, data: lead, existing: false };
  } catch (error) {
    console.error("❌ Erro ao processar lead:", error);

    return { success: false, error: String(error) };
  }
}

export async function submitProfessionalLead(
  prevState: SubmitLeadState | null,
  leadData: ProfessionalLeadType
) {
  try {
    console.log("✅ Recebido novo lead de profissional", leadData);
    const headersList = headers();

    leadData.ipAddress =
      (await headersList).get("x-forwarded-for")?.split(",")[0] ||
      (await headersList).get("x-real-ip") ||
      (await headersList).get("cf-connecting-ip") || // Cloudflare
      (await headersList).get("x-client-ip") ||
      "IP não disponível";

    const existingLead = await prisma.leadProfessionals.findUnique({
      where: { email: leadData.email },
    });

    if (existingLead) {
      console.log(
        "⚠️ Lead de profissional já existente:",
        leadData.email,
        " - Atualizando informações."
      );
      await prisma.leadProfessionals.update({
        where: { email: leadData.email },
        data: {
          ...leadData,
          updatedAt: new Date(),
        },
      });
      return { success: true, data: existingLead, existing: true };
    }

    const lead = await prisma.leadProfessionals.create({
      data: leadData,
    });

    console.log("🎉 Novo lead de profissional criado:", lead.email);

    // Enviar e-mail de boas-vindas
    await sendWelcomeEmail(lead.email, lead.fullName);

    return { success: true, data: lead, existing: false };
  } catch (error) {
    console.error("❌ Erro ao processar lead de profissional:", error);

    return { success: false, error: String(error) };
  }
}
