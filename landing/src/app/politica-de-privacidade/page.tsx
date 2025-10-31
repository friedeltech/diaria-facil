import Footer from "@/components/footer";
import Header from "@/components/header";

export default function PoliticaDePrivacidadePage() {
  return (
    <div className="min-h-screen w-screen flex flex-col items-center bg-gray-50">
      <div className="w-full max-w-[1100px] px-4 lg:px-0 flex-1 flex flex-col">
        <Header />
        <main className="flex-1 py-8">
          <h1 className="text-2xl font-bold mb-4">Política de Privacidade</h1>
          <p>
            Em construção: Esta página de Política de Privacidade está em
            desenvolvimento e será atualizada em breve.
          </p>
        </main>
        <Footer />
      </div>
    </div>
  );
}
