import { Resend } from "resend";
import { loadEmailTemplate, replaceTemplateVariables } from "./template-loader";

export async function sendWelcomeEmail(leadEmail: string, leadName: string) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY!);

    // Carregar o template HTML
    const htmlTemplate = loadEmailTemplate("welcome.html");

    // Substituir variáveis no template
    const processedTemplate = replaceTemplateVariables(htmlTemplate, {
      leadName,
    });

    const { data, error } = await resend.emails.send({
      from: "Diária Fácil <no-reply@diaria-facil.app.br>",
      to: [`${leadName} <${leadEmail}>`],
      subject: "Bem vindo ao Diária Fácil!",
      html: processedTemplate,
    });

    if (error) {
      console.error("❌ Erro ao enviar e-mail:", { error });
      throw error;
    }

    console.log("✅ E-mail enviado com sucesso:", { data });
    return { success: true, data };
  } catch (error) {
    console.error("❌ Erro ao enviar e-mail:", error);
    return { success: false, error };
  }
}
