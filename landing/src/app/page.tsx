import Header from "@/components/header";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen w-screen flex items-start justify-center">
      <div className="w-full max-w-[1100px] px-4 lg:px-0">
        <Header />
        <div className="py-8 px-4 lg:px-0">
          <div
            className="bg-cover bg-center bg-no-repeat rounded-4xl p-8 lg:p-10 min-h-[240px] lg:min-h-[480px] flex flex-col justify-end relative"
            style={{
              backgroundImage: "url('/casa-limpa.png')",
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          >
            <div className="absolute inset-0 bg-black/30 rounded-4xl"></div>
            <div className="relative z-10">
              <h1 className="font-bold text-2xl sm:text-3xl lg:text-4xl leading-tight text-white drop-shadow-lg">
                Sua casa limpa e organizada, sem esforço.
              </h1>
              <span className="text-sm sm:text-base text-white/90 mt-4 block drop-shadow-md">
                Conectamos você aos melhores profissionais de limpeza. Agende em
                minutos
              </span>

              {/* Botões de ação */}
              <div className="flex flex-col sm:flex-row gap-3 mt-6">
                <Link
                  href="/"
                  className="text-white p-4 rounded-xl text-sm font-bold transition-colors hover:opacity-90 bg-(--primary) text-center"
                >
                  Agendar Limpeza
                </Link>
                <Link
                  href="/"
                  className="text-black p-4 rounded-xl text-sm font-bold transition-colors hover:opacity-90 bg-white text-center"
                >
                  Seja um profissional
                </Link>
              </div>
            </div>
          </div>

          <section id="como-funciona" className="mt-8">
            <h1 className="text-4xl font-extrabold mb-2">Como Funciona</h1>
            <span className="font-light text-sm text-zinc-600">
              Agendar uma limpeza nunca foi tão fácil. Siga estes simples
              passos:
            </span>
          </section>

          <section id="nossos-diferenciais" className="mt-8">
            <h1 className="text-4xl font-extrabold mb-2">
              Nossos Diferenciais
            </h1>
            <span className="font-light text-sm text-zinc-600">
              Oferecemos a melhor experiência em serviços de limpeza com
              segurança e qualidade.
            </span>
          </section>

          <section id="depoimentos" className="mt-8">
            <h1 className="text-4xl font-extrabold mb-2">Depoimentos</h1>
            <span className="font-light text-sm text-zinc-600">
              Veja o que nossos clientes dizem sobre nossos serviços.
            </span>
          </section>

          <section id="faq" className="mt-8">
            <h1 className="text-4xl font-extrabold mb-2">FAQ</h1>
            <span className="font-light text-sm text-zinc-600">
              Perguntas frequentes sobre nossos serviços.
            </span>
          </section>
        </div>
      </div>
    </div>
  );
}
