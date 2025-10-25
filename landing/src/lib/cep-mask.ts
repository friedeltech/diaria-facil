/**
 * Formata uma string de CEP (Código de Endereçamento Postal) aplicando o padrão de máscara padrão.
 * Remove todos os caracteres não numéricos, limita a 8 dígitos e aplica o formato 00000-000.
 *
 * @param value - A string de entrada a ser formatada como CEP
 * @returns A string de CEP formatada no padrão 00000-000, ou formato parcial se menos de 6 dígitos
 *
 * @example
 * ```typescript
 * formatCEP("12345678") // Retorna "12345-678"
 * formatCEP("123") // Retorna "123"
 * formatCEP("12345abc678") // Retorna "12345-678"
 * ```
 */
export function formatCEP(value: string): string {
  // Remove tudo que não é número
  const numbers = value.replace(/\D/g, "");

  // Limita a 8 dígitos
  const limited = numbers.slice(0, 8);

  // Aplica a máscara 00000-000
  if (limited.length <= 5) {
    return limited;
  }

  return `${limited.slice(0, 5)}-${limited.slice(5)}`;
}

export function removeCEPFormatting(value: string): string {
  return value.replace(/\D/g, "");
}
