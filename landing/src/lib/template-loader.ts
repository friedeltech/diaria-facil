import { readFileSync } from "fs";
import { join } from "path";

/**
 * Carrega um template HTML do diretório de templates
 * @param templateName Nome do arquivo do template (ex: "welcome.html")
 * @returns Conteúdo do template como string
 */
export function loadEmailTemplate(templateName: string): string {
  try {
    const templatePath = join(
      process.cwd(),
      "src",
      "lib",
      "email-templates",
      templateName
    );

    return readFileSync(templatePath, "utf-8");
  } catch (error) {
    console.error(`❌ Erro ao carregar template ${templateName}:`, error);
    throw new Error(`Template ${templateName} não encontrado`);
  }
}

/**
 * Substitui variáveis em um template HTML
 * @param template Conteúdo do template
 * @param variables Objeto com as variáveis para substituir
 * @returns Template com variáveis substituídas
 */
export function replaceTemplateVariables(
  template: string,
  variables: Record<string, string>
): string {
  let processedTemplate = template;

  for (const [key, value] of Object.entries(variables)) {
    const regex = new RegExp(`\\{\\{${key}\\}\\}`, "g");
    processedTemplate = processedTemplate.replace(regex, value);
  }

  return processedTemplate;
}
