"use server";

import { prisma } from "@/lib/prisma";
import { CustomerLeadType } from "@/schemas/lead-schemas";
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

    const secret = process.env.NEXT_SECRET_KEY;

    // Obter URL base da aplicação dinamicamente
    const host = (await headersList).get("host");
    const protocol = (await headersList).get("x-forwarded-proto") || "https";
    const baseUrl = `${protocol}://${host}`;

    // Enviar e-mail de boas-vindas
    fetch(`${baseUrl}/api/send-email`, {
      method: "POST",
      body: JSON.stringify({ leadEmail: lead.email, leadName: lead.fullName }),
      headers: {
        "Content-Type": "application/json",
        "x-secret-key": secret || "",
      },
    }).catch((err) => {
      console.error("❌ Erro ao enviar e-mail:", err);
    }); // Fire and forget

    return { success: true, data: lead, existing: false };
  } catch (error) {
    console.error("❌ Erro ao processar lead:", error);

    return { success: false, error: String(error) };
  }
}
