"use client";

import { submitLead } from "@/app/actions/lead-actions";
import Header from "@/components/header";
import { formatCEP, removeCEPFormatting } from "@/lib/cep-mask";
import { getOperatingSystem, getUserBrowser } from "@/lib/get-user-info";
import { formatPhoneNumber, removePhoneFormatting } from "@/lib/phone-mask";
import Link from "next/link";
import {
  startTransition,
  useActionState,
  useEffect,
  useRef,
  useState,
} from "react";
import toast, { Toaster } from "react-hot-toast";
import {
  DeviceType,
  ServiceFrequency,
  Urgency,
} from "../../../../generated/prisma/enums";

const SERVICE_TYPES = [
  { id: "limpeza-completa", label: "Limpeza Completa" },
  { id: "limpeza-pesada", label: "Limpeza Pesada" },
  { id: "pos-obra", label: "Pós-Obra" },
  { id: "passadoria", label: "Passar Roupas" },
  { id: "limpeza-rapida", label: "Limpeza Rápida" },
  { id: "organizacao", label: "Organização" },
  { id: "limpeza-vidros", label: "Limpeza de Vidros" },
  { id: "outro", label: "Outro" },
];

const FREQUENCY_OPTIONS = [
  { id: "WEEKLY", label: "Semanal" },
  { id: "BIWEEKLY", label: "Quinzenal" },
  { id: "MONTHLY", label: "Mensal" },
  { id: "ONE_TIME", label: "Uma Vez" },
];

const URGENCY_OPTIONS = [
  { id: "THIS_WEEK", label: "Esta Semana" },
  { id: "THIS_MONTH", label: "Este Mês" },
  { id: "JUST_CHECKING", label: "Só Estou Pesquisando" },
];

export default function RegisterProfessional() {
  const [submitLeadActionResult, submitLeadAction, submitLeadActionIsPending] =
    useActionState(submitLead, null);
  const formRef = useRef<HTMLFormElement>(null);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedFrequency, setSelectedFrequency] = useState<
    ServiceFrequency | undefined
  >(undefined);
  const [selectedUrgency, setSelectedUrgency] = useState<Urgency | undefined>(
    undefined
  );

  useEffect(() => {
    if (!submitLeadActionResult) return;

    if (!submitLeadActionResult?.success) {
      toast.error("Erro ao enviar o formulário. Tente novamente.");
    } else {
      // Exibir toast de sucesso
      toast.success(
        "Cadastro realizado com sucesso! Em breve entraremos em contato.",
        {
          duration: 4000,
        }
      );

      // Resetar o formulário
      formRef.current?.reset();
      setSelectedServices([]);
      setSelectedFrequency(undefined);
      setSelectedUrgency(undefined);

      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [submitLeadActionResult]);

  const toggleService = (serviceId: string) => {
    setSelectedServices((prev) =>
      prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const selectFrequency = (frequencyId: string) => {
    setSelectedFrequency(frequencyId as ServiceFrequency);
  };

  const selectUrgency = (urgencyId: string) => {
    setSelectedUrgency(urgencyId as Urgency);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.value = formatPhoneNumber(e.target.value);
  };

  const handleCEPChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCEP(e.target.value);
    e.target.value = formatted;

    // Remove formatação para verificar se tem 8 dígitos
    const cleanCEP = removeCEPFormatting(formatted);

    // Se o CEP estiver completo (8 dígitos), busca os dados
    if (cleanCEP.length === 8) {
      try {
        const response = await fetch(
          `https://viacep.com.br/ws/${cleanCEP}/json/`
        );
        const data = await response.json();

        // Verifica se houve erro na API
        if (data.erro) {
          console.log("CEP não encontrado.");
          return;
        }

        // Preenche os campos automaticamente
        const form = e.target.form;
        if (form) {
          (form.elements.namedItem("neighborhood") as HTMLInputElement).value =
            data.bairro || "";
          (form.elements.namedItem("city") as HTMLInputElement).value =
            data.localidade || "";
          (form.elements.namedItem("state") as HTMLInputElement).value =
            data.uf || "";
        }
      } catch (error) {
        console.error("Erro ao buscar CEP:", error);
      }
    } else {
      // Se o CEP não estiver completo, limpa os campos relacionados
      const form = e.target.form;
      if (form) {
        (form.elements.namedItem("neighborhood") as HTMLInputElement).value =
          "";
        (form.elements.namedItem("city") as HTMLInputElement).value = "";
        (form.elements.namedItem("state") as HTMLInputElement).value = "";
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    // Coletar dados do formulário
    const leadData = {
      fullName: formData.get("fullName") as string,
      email: formData.get("email") as string,
      phone: removePhoneFormatting(formData.get("phone") as string),
      zipCode: removeCEPFormatting(formData.get("zipCode") as string),
      city: (formData.get("city") as string) || undefined,
      state: (formData.get("state") as string) || undefined,
      neighborhood: (formData.get("neighborhood") as string) || undefined,
      serviceTypes: selectedServices.length > 0 ? selectedServices : undefined,
      desiredFrequency: selectedFrequency || undefined,
      urgency: selectedUrgency || undefined,
      consentedToMarketing: formData.get("consent") === "on",
      consentedAt: formData.get("consent") === "on" ? new Date() : undefined,
      notes: (formData.get("notes") as string) || undefined,
      deviceType: /Mobi|Android/i.test(navigator.userAgent)
        ? DeviceType.MOBILE
        : DeviceType.DESKTOP,
      browser: getUserBrowser(navigator.userAgent),
      operatingSystem: getOperatingSystem(navigator.userAgent),
      userAgent: navigator.userAgent,
    };

    try {
      startTransition(() => {
        submitLeadAction(leadData);
      });
    } catch (error) {
      console.error("Erro ao enviar lead:", error);
      toast.error("Erro ao enviar o formulário. Tente novamente.");
    }
  };

  return (
    <div className="min-h-screen w-screen flex items-start justify-center bg-gray-50">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="w-full max-w-[1100px] px-4 lg:px-0">
        <Header />

        <div className="py-8 px-4 lg:px-0">
          <div className="max-w-2xl mx-auto">
            <div className="mb-8">
              <Link
                href="/"
                className="text-sm text-gray-600 hover:text-(--primary) transition-colors inline-flex items-center mb-4"
              >
                ← Voltar para home
              </Link>
              <h1 className="text-4xl font-extrabold mb-3">Seja um Cliente</h1>
              <p className="text-gray-600 text-base">
                Cadastre-se para agendar limpezas de forma rápida e prática.
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 lg:p-8"
              ref={formRef}
            >
              <div className="mb-6">
                <h2 className="text-xl font-bold mb-4">Dados Pessoais</h2>

                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="fullName"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Nome Completo <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-(--primary) focus:border-(--primary) outline-none transition-all placeholder:text-gray-300"
                      placeholder="Digite seu nome completo"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-semibold text-gray-700 mb-2"
                      >
                        E-mail <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-(--primary) focus:border-(--primary) outline-none transition-all placeholder:text-gray-300"
                        placeholder="seu@email.com"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-semibold text-gray-700 mb-2"
                      >
                        Telefone/WhatsApp{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="phone"
                        name="phone"
                        required
                        onChange={handlePhoneChange}
                        maxLength={15}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-(--primary) focus:border-(--primary) outline-none transition-all placeholder:text-gray-300"
                        placeholder="(47) 99999-9999"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h2 className="text-xl font-bold mb-4">Localização</h2>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="zipCode"
                        className="block text-sm font-semibold text-gray-700 mb-2"
                      >
                        CEP <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="zipCode"
                        name="zipCode"
                        required
                        onChange={handleCEPChange}
                        maxLength={9}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-(--primary) focus:border-(--primary) outline-none transition-all placeholder:text-gray-300"
                        placeholder="00000-000"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="neighborhood"
                        className="block text-sm font-semibold text-gray-700 mb-2"
                      >
                        Bairro
                      </label>
                      <input
                        type="text"
                        id="neighborhood"
                        name="neighborhood"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-(--primary) focus:border-(--primary) outline-none transition-all placeholder:text-gray-300"
                        placeholder="Digite seu bairro"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-2">
                      <label
                        htmlFor="city"
                        className="block text-sm font-semibold text-gray-700 mb-2"
                      >
                        Cidade
                      </label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-(--primary) focus:border-(--primary) outline-none transition-all placeholder:text-gray-300"
                        placeholder="Digite sua cidade"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="state"
                        className="block text-sm font-semibold text-gray-700 mb-2"
                      >
                        Estado
                      </label>
                      <input
                        type="text"
                        id="state"
                        name="state"
                        maxLength={2}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-(--primary) focus:border-(--primary) outline-none transition-all uppercase placeholder:text-gray-300"
                        placeholder="SP"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h2 className="text-xl font-bold mb-4">
                  Informações Adicionais
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Tipos de Serviço
                    </label>
                    <p className="text-xs text-gray-500 mb-3">
                      Selecione um ou mais serviços que você precisa. Caso
                      selecione outros, descreva na seção de observações.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {SERVICE_TYPES.map((service) => (
                        <button
                          key={service.id}
                          type="button"
                          onClick={() => toggleService(service.id)}
                          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                            selectedServices.includes(service.id)
                              ? "bg-(--primary) text-white shadow-md"
                              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                          }`}
                        >
                          {service.label}
                        </button>
                      ))}
                    </div>
                    {/* Hidden input para validação do formulário */}
                    <input
                      type="hidden"
                      name="serviceTypes"
                      value={selectedServices.join(",")}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Frequência Desejada
                    </label>
                    <p className="text-xs text-gray-500 mb-3">
                      Com que frequência você gostaria do serviço?
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {FREQUENCY_OPTIONS.map((frequency) => (
                        <button
                          key={frequency.id}
                          type="button"
                          onClick={() => selectFrequency(frequency.id)}
                          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                            selectedFrequency === frequency.id
                              ? "bg-(--primary) text-white shadow-md"
                              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                          }`}
                        >
                          {frequency.label}
                        </button>
                      ))}
                    </div>
                    <input
                      type="hidden"
                      name="frequency"
                      value={selectedFrequency || ""}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Quando Você Precisa?
                    </label>
                    <p className="text-xs text-gray-500 mb-3">
                      Selecione a urgência do serviço
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {URGENCY_OPTIONS.map((urgency) => (
                        <button
                          key={urgency.id}
                          type="button"
                          onClick={() => selectUrgency(urgency.id)}
                          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                            selectedUrgency === urgency.id
                              ? "bg-(--primary) text-white shadow-md"
                              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                          }`}
                        >
                          {urgency.label}
                        </button>
                      ))}
                    </div>
                    <input
                      type="hidden"
                      name="urgency"
                      value={selectedUrgency || ""}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="notes"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Observações
                    </label>
                    <textarea
                      id="notes"
                      name="notes"
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-(--primary) focus:border-(--primary) outline-none transition-all resize-none placeholder:text-gray-300"
                      placeholder="Alguma informação adicional que queira nos passar?"
                    />
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="consent"
                    required
                    className="mt-1 w-5 h-5 rounded border-gray-300 text-(--primary) focus:ring-(--primary)"
                  />
                  <span className="text-sm text-gray-700">
                    Aceito receber ofertas especiais e novidades por e-mail.
                    Você receberá acesso antecipado às nossas funcionalidades e
                    ofertas exclusivas. <span className="text-red-500">*</span>
                  </span>
                </label>
              </div>

              {submitLeadActionResult?.error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                  <p className="text-red-800 font-semibold">
                    ✗ {submitLeadActionResult.error.replace("Error: ", "")}
                  </p>
                </div>
              )}

              <button
                type="submit"
                disabled={submitLeadActionIsPending}
                className="w-full bg-(--primary) text-white py-4 px-6 rounded-xl font-bold text-base transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitLeadActionIsPending ? "Enviando..." : "Enviar Cadastro"}
              </button>

              <p className="text-xs text-gray-500 text-center mt-4">
                <span className="text-red-500">*</span> Campos obrigatórios
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
