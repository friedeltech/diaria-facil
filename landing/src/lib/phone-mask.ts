/**
 * Formata um número de telefone brasileiro com máscara
 * Aceita números com 10 dígitos (sem 9º dígito) ou 11 dígitos (com 9º dígito)
 *
 * @param value - String contendo o número de telefone (pode conter caracteres não numéricos)
 * @returns String formatada no padrão (XX) XXXXX-XXXX ou (XX) XXXX-XXXX
 *
 * @example
 * formatPhoneNumber("47992505900") // "(47) 99250-5900"
 * formatPhoneNumber("4792505900")  // "(47) 9250-5900"
 */
export function formatPhoneNumber(value: string): string {
  // Remove tudo que não é número
  let numbers = value.replace(/\D/g, "");

  // Limita a 11 dígitos
  if (numbers.length > 11) {
    numbers = numbers.slice(0, 11);
  }

  let formatted = "";

  if (numbers.length > 0) {
    formatted = "(" + numbers.substring(0, 2);

    if (numbers.length > 2) {
      formatted += ") ";

      if (numbers.length <= 6) {
        // (47) 9250
        formatted += numbers.substring(2);
      } else if (numbers.length <= 10) {
        // (47) 9250-5900 (sem 9º dígito)
        formatted += numbers.substring(2, 6) + "-" + numbers.substring(6);
      } else {
        // (47) 99250-5900 (com 9º dígito)
        formatted += numbers.substring(2, 7) + "-" + numbers.substring(7);
      }
    }
  }

  return formatted;
}

/**
 * Remove a formatação de um número de telefone, retornando apenas os dígitos
 *
 * @param value - String contendo o número de telefone formatado
 * @returns String contendo apenas os dígitos
 *
 * @example
 * removePhoneFormatting("(47) 99250-5900") // "47992505900"
 */
export function removePhoneFormatting(value: string): string {
  return value.replace(/\D/g, "");
}
