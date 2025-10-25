import { Resend } from "resend";

export async function sendWelcomeEmail(leadEmail: string, leadName: string) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY!);

    const { data, error } = await resend.emails.send({
      from: "Diária Fácil <no-reply@diaria-facil.app.br>",
      to: [`${leadName} <${leadEmail}>`],
      subject: "Bem vindo ao Diária Fácil!",
      html: `<!DOCTYPE html>
<html lang="pt-br">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Confirmação de Pré-cadastro na Diária Fácil!</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 0;
        background-color: #f8f9fa;
        color: #333333;
      }

      .container {
        max-width: 600px;
        margin: 0 auto;
        background-color: #ffffff;
        padding: 0;
      }

      .header {
        text-align: center;
        padding: 30px 20px;
        background-color: #ffffff;
      }

      .logo {
        height: 40px;
        width: auto;
      }

      .hero-image {
        width: 100%;
        padding: 15px;
        box-sizing: border-box;
      }

      .hero-bg {
        width: 100%;
        height: 200px;
        background-image: url("https://diaria-facil.app.br/hero.png");
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        border-radius: 8px;
      }

      .content {
        padding: 20px;
        text-align: center;
      }

      .title {
        font-size: 32px;
        font-weight: bold;
        color: #333333;
        margin: 30px 0 15px 0;
        line-height: 1.2;
      }

      .description {
        font-size: 16px;
        color: #495057;
        line-height: 1.5;
        margin: 15px 0 25px 0;
      }

      .button-container {
        margin: 25px 0;
      }

      .button {
        display: inline-block;
        background-color: #13a4ec;
        color: #ffffff;
        padding: 12px 24px;
        text-decoration: none;
        border-radius: 8px;
        font-weight: bold;
        font-size: 16px;
        min-width: 200px;
        box-sizing: border-box;
      }

      .signature {
        font-size: 16px;
        color: #495057;
        margin: 30px 0;
        line-height: 1.5;
      }

      .footer {
        background-color: #f8f9fa;
        padding: 40px 20px;
        text-align: center;
      }

      .footer-links {
        margin-bottom: 30px;
      }

      .footer-link {
        color: #13a4ec;
        text-decoration: none;
        margin: 0 20px;
        font-size: 16px;
      }

      .social-links {
        margin: 20px 0;
      }

      .social-link {
        display: inline-block;
        margin: 0 10px;
        color: #495057;
        text-decoration: none;
        font-size: 24px;
      }

      .copyright {
        font-size: 14px;
        color: #495057;
        margin-top: 20px;
      }

      @media (max-width: 600px) {
        .container {
          width: 100% !important;
        }

        .title {
          font-size: 28px;
        }

        .description {
          font-size: 14px;
        }

        .footer-link {
          display: block;
          margin: 10px 0;
        }
      }
    </style>
  </head>
  <body>
    <div class="container">
      <!-- Header -->
      <div class="header">
        <img
          alt="Diária Fácil Logo"
          class="logo"
          src="https://diaria-facil.app.br/logo.png"
        />
      </div>

      <!-- Hero Image -->
      <div class="hero-image">
        <div
          class="hero-bg"
          alt="Ilustração de itens de limpeza em um fundo azul claro."
        ></div>
      </div>

      <!-- Content -->
      <div class="content">
        <h1 class="title">Obrigado por se cadastrar!</h1>

        <p class="description">
          Seu pré-cadastro foi realizado com sucesso. Em breve, você será um dos
          primeiros a receber novidades sobre o lançamento da nossa plataforma,
          acesso antecipado e ofertas exclusivas.
        </p>

        <div class="button-container">
          <a href="https://diaria-facil.app.br" class="button"
            >Visite nosso Site</a
          >
        </div>

        <p class="signature">
          Atenciosamente,<br />
          Equipe Diária Fácil
        </p>
      </div>

      <!-- Footer -->
      <div class="footer">
        <div class="footer-links">
          <a href="https://diaria-facil.app.br" class="footer-link"
            >Cancelar inscrição</a
          >
          <a href="https://diaria-facil.app.br" class="footer-link">Contato</a>
        </div>

        <div class="social-links">
          <a href="https://diaria-facil.app.br" class="social-link">📊</a>
          <a href="https://diaria-facil.app.br" class="social-link">📷</a>
          <a href="https://diaria-facil.app.br" class="social-link">🚀</a>
        </div>

        <p class="copyright">
          © 2025 Diária Fácil. Todos os direitos reservados.
        </p>
      </div>
    </div>
  </body>
</html>
`,
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
