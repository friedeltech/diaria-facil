import Header from "@/components/header";

export default function Home() {
  return (
    <div className="min-h-screen w-screen flex items-start justify-center">
      <div className="w-full max-w-[1100px] px-4 lg:px-0">
        <Header />
        <div className="pt-8 px-4 lg:px-0">
          <div
            className="bg-cover bg-center bg-no-repeat rounded-2xl p-8 lg:p-12 min-h-[150px] lg:min-h-[300px] flex flex-col justify-end relative"
            style={{
              backgroundImage: "url('/casa-limpa.png')",
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          >
            <div className="absolute inset-0 bg-black/30 rounded-2xl"></div>
            <div className="relative z-10">
              <h1 className="font-bold text-2xl sm:text-3xl lg:text-4xl leading-tight text-white drop-shadow-lg">
                Sua casa limpa e organizada, sem esforço.
              </h1>
              <span className="text-sm sm:text-base text-white/90 mt-4 block drop-shadow-md">
                Conectamos você aos melhores profissionais de limpeza. Agende em
                minutos
              </span>
            </div>
          </div>
          <div className="mt-8 relative overflow-hidden">
            <div className="bg-linear-to-r from-(--primary)/5 via-(--primary)/10 to-(--primary)/5 rounded-2xl p-8 lg:p-12 border border-(--primary)/20 shadow-lg">
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <img src="/icon.svg" alt="Ícone" className="w-12 h-12" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-(--primary) mb-4">
                  Em breve mais informações
                </h2>
                <p className="text-base sm:text-lg text-gray-700 max-w-2xl mx-auto">
                  Estamos preparando algo incrível para você!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
