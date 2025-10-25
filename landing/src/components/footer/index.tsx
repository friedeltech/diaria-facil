import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-white border-t border-t-(--primary)/20">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Top Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 pb-6">
          {/* Logo and Name */}
          <div className="flex items-center">
            <div className="h-10 w-10 flex items-center justify-center">
              <Image
                src="/icon.svg"
                alt="Diária Fácil Logo"
                width={32}
                height={32}
                className="w-8 h-8"
              />
            </div>
            <span className="ml-2 text-lg font-bold text-gray-900">
              Diária Fácil
            </span>
          </div>

          {/* Links */}
          <nav className="flex flex-wrap gap-6">
            <Link
              href="/termos-de-servico"
              className="text-gray-700 hover:text-(--primary) text-sm font-medium transition-colors"
            >
              Termos de Serviço
            </Link>
            <Link
              href="/politica-de-privacidade"
              className="text-gray-700 hover:text-(--primary) text-sm font-medium transition-colors"
            >
              Política de Privacidade
            </Link>
            <Link
              href="/contato"
              className="text-gray-700 hover:text-(--primary) text-sm font-medium transition-colors"
            >
              Contato
            </Link>
          </nav>
        </div>

        {/* Bottom Section */}
        <div className="pt-6">
          <p className="text-center text-sm text-gray-600">
            © {currentYear} Diária Fácil. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
