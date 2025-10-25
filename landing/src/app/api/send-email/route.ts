import { Resend } from "resend";

export async function POST(request: Request) {
  const { leadEmail, leadName } = await request.json();

  const secretKey = request.headers.get("x-secret-key");

  if (secretKey !== process.env.NEXT_SECRET_KEY) {
    return new Response("Unauthorized", { status: 401 });
  }

  const resend = new Resend(process.env.RESEND_API_KEY!);

  const { data, error } = await resend.emails.send({
    from: "Diária Fácil <no-reply@diaria-facil.app.br>",
    to: [`${leadName} <${leadEmail}>`],
    subject: "Bem vindo ao Diária Fácil!",
    html: `<strong>Bem vindo ao Diária Fácil ${leadName}!</strong>`,
  });

  if (error) {
    console.error("Erro ao enviar e-mail:", { error });
    return new Response("Erro ao enviar e-mail", { status: 500 });
  }

  console.log("E-mail enviado com sucesso:", { data });
  return new Response(
    JSON.stringify({ message: "E-mail enviado com sucesso", data }),
    { status: 200 }
  );
}
