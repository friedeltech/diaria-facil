# Templates HTML no Build

Este documento explica como os templates HTML são incluídos no build de produção.

## Configuração

### 1. Next.js Config (next.config.ts)

- Configurado para output standalone
- Regra webpack para processar arquivos HTML
- Templates são copiados para `static/templates/`

### 2. TypeScript Config (tsconfig.json)

- Incluído `**/*.html` no array de includes
- Permite que o TypeScript reconheça arquivos HTML

### 3. Script de Build

- Script `copy-templates.sh` copia templates para o build standalone
- Executado automaticamente após `next build`

## Estrutura de Arquivos

```
src/lib/email-templates/
├── welcome.html          # Template de boas-vindas
└── ...                   # Outros templates

.next/standalone/src/lib/email-templates/
├── welcome.html          # Copiado durante o build
└── ...                   # Outros templates copiados
```

## Uso

### Carregando Templates

```typescript
import {
  loadEmailTemplate,
  replaceTemplateVariables,
} from "@/lib/template-loader";

// Carregar template
const template = loadEmailTemplate("welcome.html");

// Substituir variáveis
const html = replaceTemplateVariables(template, {
  leadName: "João Silva",
});
```

### Adicionando Novos Templates

1. Crie o arquivo HTML em `src/lib/email-templates/`
2. Use `{{variableName}}` para variáveis substituíveis
3. Carregue com `loadEmailTemplate('nomeDoTemplate.html')`

## Deploy

O build automaticamente:

1. Compila o projeto Next.js
2. Copia os templates para o build standalone
3. Os templates ficam disponíveis em produção

## Troubleshooting

Se os templates não estiverem disponíveis em produção:

1. Verifique se o script `copy-templates.sh` foi executado
2. Confirme que os arquivos estão em `.next/standalone/src/lib/email-templates/`
3. Verifique os logs de build para erros de cópia
