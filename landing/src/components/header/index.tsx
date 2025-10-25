"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
    setIsMenuOpen(false); // Fechar menu mobile após clicar
  };

  return (
    <header className="bg-white border-b border-b-(--primary)/20 flex w-full justify-between items-center h-16 px-4 lg:px-0">
      <div>
        <Link href="/" className="flex items-center">
          <div className="h-10 w-10 flex items-center justify-center">
            <Image
              src="/icon.svg"
              alt="Diária Fácil Logo"
              width={32}
              height={32}
              className="w-8 h-8"
            />
          </div>
          <span className="ml-2 mr-2 text-lg font-bold text-gray-900">
            Diária Fácil
          </span>
        </Link>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden lg:flex space-x-8">
        <button
          onClick={() => scrollToSection("como-funciona")}
          className="text-gray-700 hover:text-(--primary) px-3 py-2 text-sm font-semibold transition-colors"
        >
          Como funciona
        </button>
        <button
          onClick={() => scrollToSection("nossos-diferenciais")}
          className="text-gray-700 hover:text-(--primary) px-3 py-2 text-sm font-semibold transition-colors"
        >
          Nossos diferenciais
        </button>
        <button
          onClick={() => scrollToSection("depoimentos")}
          className="text-gray-700 hover:text-(--primary) px-3 py-2 text-sm font-semibold transition-colors"
        >
          Depoimentos
        </button>
        <button
          onClick={() => scrollToSection("faq")}
          className="text-gray-700 hover:text-(--primary) px-3 py-2 text-sm font-semibold transition-colors"
        >
          FAQ
        </button>
      </nav>

      {/* Desktop Buttons */}
      <div className="hidden lg:flex items-center ml-4 gap-2">
        <Link
          href="/register/customer"
          className="text-white px-4 py-2 rounded-xl text-sm font-bold transition-colors hover:opacity-90 bg-(--primary)"
        >
          Agendar Limpeza
        </Link>
        <Link
          href="/register/professional"
          className="text-(--primary) px-4 py-2 rounded-xl text-sm font-bold transition-colors hover:opacity-90 bg-(--primary)/20"
        >
          Seja um profissional
        </Link>
      </div>

      {/* Mobile Menu Button */}
      <button
        className="lg:hidden flex flex-col items-center justify-center w-8 h-8 space-y-1"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle menu"
      >
        <span
          className={`block w-6 h-0.5 bg-gray-700 transition-transform ${
            isMenuOpen ? "rotate-45 translate-y-1.5" : ""
          }`}
        ></span>
        <span
          className={`block w-6 h-0.5 bg-gray-700 transition-opacity ${
            isMenuOpen ? "opacity-0" : ""
          }`}
        ></span>
        <span
          className={`block w-6 h-0.5 bg-gray-700 transition-transform ${
            isMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
          }`}
        ></span>
      </button>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-16 left-0 right-0 bg-white border-b border-b-(--primary)/20 shadow-lg z-50 lg:hidden">
          <nav className="flex flex-col py-4">
            <button
              onClick={() => scrollToSection("como-funciona")}
              className="text-gray-700 hover:text-(--primary) px-6 py-3 text-sm font-semibold transition-colors text-left"
            >
              Como funciona
            </button>
            <button
              onClick={() => scrollToSection("nossos-diferenciais")}
              className="text-gray-700 hover:text-(--primary) px-6 py-3 text-sm font-semibold transition-colors text-left"
            >
              Nossos diferenciais
            </button>
            <button
              onClick={() => scrollToSection("depoimentos")}
              className="text-gray-700 hover:text-(--primary) px-6 py-3 text-sm font-semibold transition-colors text-left"
            >
              Depoimentos
            </button>
            <button
              onClick={() => scrollToSection("faq")}
              className="text-gray-700 hover:text-(--primary) px-6 py-3 text-sm font-semibold transition-colors text-left"
            >
              FAQ
            </button>
            <div className="flex flex-col gap-3 px-6 pt-4 border-t border-gray-200 mt-4">
              <Link
                href="/"
                className="text-white px-4 py-3 rounded-xl text-sm font-bold transition-colors hover:opacity-90 bg-(--primary) text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Agendar Limpeza
              </Link>
              <Link
                href="/"
                className="text-(--primary) px-4 py-3 rounded-xl text-sm font-bold transition-colors hover:opacity-90 bg-(--primary)/20 text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Seja um profissional
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
