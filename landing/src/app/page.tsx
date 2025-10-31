import Card from "@/components/card";
import Footer from "@/components/footer";
import Header from "@/components/header";
import CalendarIcon from "@/components/icons/calendar";
import ChooseTaskIcon from "@/components/icons/choose-task";
import ClockIcon from "@/components/icons/clock";
import LikeIcon from "@/components/icons/like";
import RelaxIcon from "@/components/icons/relax";
import SecurityIcon from "@/components/icons/security";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen w-screen flex items-start justify-center">
      <div className="w-full max-w-[1100px] px-4 lg:px-0">
        <Header />
        <div className="py-8 px-4 lg:px-0">
          <div
            className="bg-cover bg-center bg-no-repeat rounded-4xl p-8 lg:p-10 min-h-60 lg:min-h-[480px] flex flex-col justify-end relative mb-8"
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
                  href="/register/customer"
                  className="text-white p-4 rounded-xl text-sm font-bold transition-colors hover:opacity-90 bg-(--primary) text-center"
                >
                  Agendar Limpeza
                </Link>
                <Link
                  href="/register/professional"
                  className="text-black p-4 rounded-xl text-sm font-bold transition-colors hover:opacity-90 bg-white text-center"
                >
                  Seja um profissional
                </Link>
              </div>
            </div>
          </div>

          <section id="como-funciona" className="scroll-mt-20">
            <h1 className="text-4xl font-extrabold mb-2">Como Funciona</h1>
            <span className="font-light text-sm text-zinc-600">
              Agendar uma limpeza nunca foi tão fácil. Siga estes simples
              passos:
            </span>
            <div className="flex items-center justify-between sm:flex-row flex-col gap-4 p-10">
              <Card
                icon={<ChooseTaskIcon />}
                title="Escolha o serviço"
                description="Selecione o tipo de limpeza que você precisa, seja para sua casa, escritório ou outro espaço."
              />
              <Card
                icon={<CalendarIcon />}
                title="Agende"
                description="Escolha a data e horário que melhor se encaixam à sua rotina."
              />
              <Card
                icon={<RelaxIcon />}
                title="Relaxe"
                description="Deixe o resto com a gente. Um profissional verificado cuidará da limpeza para você."
              />
            </div>
          </section>

          <section id="nossos-diferenciais" className="scroll-mt-20">
            <h1 className="text-4xl font-extrabold mb-2">
              Nossos Diferenciais
            </h1>
            <span className="font-light text-sm text-zinc-600">
              Oferecemos a melhor experiência em serviços de limpeza com
              segurança e qualidade.
            </span>
            <div className="flex items-center justify-between sm:flex-row flex-col gap-4 p-10">
              <Card
                icon={<SecurityIcon />}
                title="Segurança em primeiro lugar"
                description="Todos os nossos profissionais passam por um rigoroso processo de verificação para sua tranquilidade."
              />
              <Card
                icon={<LikeIcon />}
                title="Qualidade Garantida"
                description="Se não ficar satisfeito, nós resolvemos. Sua felicidade é nossa prioridade."
              />
              <Card
                icon={<ClockIcon />}
                title="Flexibilidade total"
                description="Agende para hoje, amanhã ou quando for melhor para você."
              />
            </div>
          </section>

          <section
            id="faq"
            className="mt-8 scroll-mt-20 flex items-center justify-center flex-col"
          >
            <h1 className="text-4xl font-extrabold mb-2">
              Perguntas Frequentes (FAQ)
            </h1>
            <span className="text-gray-500">
              Tem alguma dúvida? Encontre as respostas aqui.
            </span>
            <div className="w-full max-w-3xl mt-8">
              <div className="space-y-4">
                <details className="bg-(--primary)/12 rounded-lg p-4 group">
                  <summary className="font-semibold text-lg cursor-pointer hover:opacity-80 flex items-center gap-2 list-none">
                    <svg
                      className="w-5 h-5 text-(--primary) transition-transform group-open:rotate-90"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Como funciona o agendamento?
                  </summary>
                  <p className="mt-4 text-gray-700">
                    É muito simples! Você seleciona o tipo de serviço, escolhe a
                    data e horário que melhor funciona para você, escolhe um
                    profissional disponível, realiza o pagamento integrado no
                    aplicativo e pronto! Seu serviço está agendado.
                  </p>
                </details>

                <details className="bg-(--primary)/12 rounded-lg p-4 group">
                  <summary className="font-semibold text-lg cursor-pointer hover:opacity-80 flex items-center gap-2 list-none">
                    <svg
                      className="w-5 h-5 text-(--primary) transition-transform group-open:rotate-90"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Os profissionais são verificados?
                  </summary>
                  <p className="mt-4 text-gray-700">
                    Sim! Todos os nossos profissionais passam por um rigoroso
                    processo de verificação, incluindo checagem de antecedentes
                    e avaliação de experiência.
                  </p>
                </details>

                <details className="bg-(--primary)/12 rounded-lg p-4 group">
                  <summary className="font-semibold text-lg cursor-pointer hover:opacity-80 flex items-center gap-2 list-none">
                    <svg
                      className="w-5 h-5 text-(--primary) transition-transform group-open:rotate-90"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Posso cancelar ou reagendar meu serviço?
                  </summary>
                  <p className="mt-4 text-gray-700">
                    Claro! Você pode cancelar ou reagendar seu serviço até 24
                    horas antes do horário marcado, sem nenhuma taxa adicional.
                  </p>
                </details>
              </div>
            </div>
          </section>
        </div>

        <Footer />
      </div>
    </div>
  );
}
