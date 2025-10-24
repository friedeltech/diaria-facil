"use server";

import { prisma } from "@/lib/prisma";
import { CustomerLeadType } from "@/schemas/lead-schemas";
import { headers } from "next/headers";
import { Resend } from "resend";

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

    // Enviar e-mail de boas-vindas
    sendWelcomeEmail(lead.email, lead.fullName);

    return { success: true, data: lead, existing: false };
  } catch (error) {
    console.error("❌ Erro ao processar lead:", error);

    return { success: false, error: String(error) };
  }
}

async function sendWelcomeEmail(leadEmail: string, leadName: string) {
  // Implementar lógica de envio de e-mail aqui
  const resend = new Resend(process.env.RESEND_API_KEY!);

  const { data, error } = await resend.emails.send({
    from: "Diária Fácil <no-reply@diaria-facil.app.br>",
    to: [`${leadName} <${leadEmail}>`],
    subject: "Bem vindo ao Diária Fácil!",
    html: `<strong>Bem vindo ao Diária Fácil ${leadName}!</strong>`,
  });

  if (error) {
    return console.error("Erro ao enviar e-mail:", { error });
  }

  console.log("E-mail enviado com sucesso:", { data });
}
