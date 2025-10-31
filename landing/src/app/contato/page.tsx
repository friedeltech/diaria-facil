import ContactCard from "@/components/contact-card";
import Footer from "@/components/footer";
import Header from "@/components/header";
import EmailIcon from "@/components/icons/email";
import GithubIcon from "@/components/icons/github";
import WhatsappIcon from "@/components/icons/whatsapp";

export default function ContatoPage() {
  return (
    <div className="min-h-screen w-screen flex flex-col items-center bg-linear-to-br from-blue-50 via-white to-purple-50">
      <div className="w-full max-w-[1100px] px-4 lg:px-0 flex-1 flex flex-col">
        <Header />
        <main className="flex-1 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 bg-linear-to-r from-blue-300 to-blue-900 bg-clip-text text-transparent">
              Entre em Contato
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Tem alguma dúvida ou sugestão? Estamos aqui para ajudar! Entre em
              contato através de um dos canais abaixo.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ContactCard
              icon={<EmailIcon />}
              title="Email"
              description="Envie-nos um email"
              contactInfo="maicon.friedel@gmail.com"
              href="mailto:maicon.friedel@gmail.com"
              iconBgColor="bg-linear-to-br from-blue-500 to-blue-600"
              contactColor="text-blue-600 hover:text-blue-700"
            />

            <ContactCard
              icon={<WhatsappIcon />}
              title="WhatsApp"
              description="Fale conosco agora"
              contactInfo="(47) 99250-5900"
              href="https://wa.me/+5547992505900"
              iconBgColor="bg-linear-to-br from-green-500 to-green-600"
              contactColor="text-green-600 hover:text-green-700"
            />

            <ContactCard
              icon={<GithubIcon />}
              title="GitHub"
              description="Confira nosso código. Diária Fácil é um projeto open source!"
              contactInfo="friedeltech/diaria-facil"
              href="https://github.com/friedeltech/diaria-facil"
              iconBgColor="bg-linear-to-br from-gray-700 to-gray-900"
              contactColor="text-gray-700 hover:text-gray-900"
            />
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
