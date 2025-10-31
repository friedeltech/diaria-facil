# 🏠 Diária Fácil - Landing Page

Landing page do projeto **Diária Fácil**, uma plataforma para conectar clientes a profissionais de limpeza residencial de forma prática e segura.

## 📋 Sobre o Projeto

A Diária Fácil é uma solução completa que permite:

- **Para Clientes**: Agendar serviços de limpeza de forma rápida e segura
- **Para Profissionais**: Encontrar oportunidades de trabalho na área de limpeza residencial

Esta landing page é responsável por:

- Apresentar o serviço e seus diferenciais
- Capturar leads de clientes interessados
- Capturar leads de profissionais interessados
- Fornecer informações sobre como funciona o serviço

## 🚀 Tecnologias Utilizadas

- **[Next.js 15](https://nextjs.org/)** - Framework React para produção
- **[React 19](https://react.dev/)** - Biblioteca JavaScript para interfaces
- **[TypeScript](https://www.typescriptlang.org/)** - Superset JavaScript com tipagem estática
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Framework CSS utility-first
- **[Prisma](https://www.prisma.io/)** - ORM para PostgreSQL
- **[PostgreSQL](https://www.postgresql.org/)** - Banco de dados relacional
- **[Zod](https://zod.dev/)** - Validação de schemas TypeScript-first
- **[Resend](https://resend.com/)** - Serviço de envio de emails transacionais
- **[Upstash Rate Limit](https://upstash.com/)** - Rate limiting com Redis
- **[React Hot Toast](https://react-hot-toast.com/)** - Notificações toast

## 📂 Estrutura do Projeto

```
landing/
├── prisma/
│   ├── schema.prisma          # Schema do banco de dados
│   └── migrations/            # Migrações do banco
├── src/
│   ├── app/
│   │   ├── layout.tsx         # Layout principal
│   │   ├── page.tsx           # Página inicial
│   │   ├── actions/           # Server actions
│   │   ├── register/          # Páginas de cadastro
│   │   ├── contato/           # Página de contato
│   │   └── politica-de-privacidade/ # Páginas legais
│   ├── components/
│   │   ├── card/              # Componente de card
│   │   ├── contact-card/      # Card de contato
│   │   ├── footer/            # Rodapé
│   │   ├── header/            # Cabeçalho
│   │   └── icons/             # Ícones customizados
│   ├── lib/
│   │   ├── cep-mask.ts        # Máscara para CEP
│   │   ├── email.ts           # Envio de emails
│   │   ├── phone-mask.ts      # Máscara para telefone
│   │   ├── prisma.ts          # Cliente Prisma
│   │   ├── rate-limit.ts      # Configuração rate limit
│   │   └── get-user-info.ts   # Informações do usuário
│   └── schemas/
│       └── lead-schemas.ts    # Schemas de validação
├── public/                    # Arquivos estáticos
├── docker-compose.yaml        # Configuração Docker
└── package.json               # Dependências e scripts
```

## 🛠️ Pré-requisitos

- **Node.js** 20.x ou superior
- **pnpm** (gerenciador de pacotes)
- **Docker** e **Docker Compose** (para o banco de dados)
- Conta no **[Resend](https://resend.com/)** para envio de emails
- Conta no **[Upstash](https://upstash.com/)** para rate limiting (ou **[Vercel KV](https://vercel.com/storage/kv)**)

## ⚙️ Configuração

### 1. Clone o repositório

```bash
git clone https://github.com/friedeltech/diaria-facil.git
cd diaria-facil/landing
```

### 2. Instale as dependências

```bash
pnpm install
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto `landing/`:

```env
# Database
DATABASE_URL="postgresql://diaria:diaria_password@localhost:5432/diaria_dev"

# Resend API (para envio de emails)
RESEND_API_KEY=seu_resend_api_key

# Upstash Redis / Vercel KV (para rate limiting)
KV_URL=seu_kv_url
KV_REST_API_URL=seu_kv_rest_api_url
KV_REST_API_TOKEN=seu_kv_rest_api_token
KV_REST_API_READ_ONLY_TOKEN=seu_kv_rest_api_read_only_token
REDIS_URL=redis_url
```

### 4. Inicie o banco de dados com Docker

Na raiz do projeto (não na pasta `landing/`):

```bash
docker-compose up -d
```

Isso iniciará:

- PostgreSQL na porta `5432`
- pgAdmin na porta `5050` (acesse em http://localhost:5050)

### 5. Execute as migrações do banco

```bash
pnpm prisma migrate dev
```

### 6. Gere o Prisma Client

```bash
pnpm prisma generate
```

## 🚀 Executando o Projeto

### Modo de desenvolvimento

```bash
pnpm dev
```

A aplicação estará disponível em [http://localhost:3000](http://localhost:3000)

### Build para produção

```bash
pnpm build
pnpm start
```

## 🗄️ Banco de Dados

O projeto utiliza PostgreSQL com Prisma ORM. Os principais modelos são:

### LeadCustomers

Armazena informações de clientes interessados:

- Dados pessoais (nome, email, telefone)
- Localização (CEP, cidade, estado)
- Preferências de serviço
- Status do lead (NEW, CONTACTED, QUALIFIED, CONVERTED, LOST)
- Informações de LGPD e consentimento

### LeadProfessionals

Armazena informações de profissionais interessados:

- Dados pessoais
- Localização e áreas de atuação
- Experiência profissional
- Disponibilidade
- Status do lead

### Comandos úteis do Prisma

```bash
# Abrir Prisma Studio (interface visual do banco)
pnpm prisma studio

# Criar uma nova migration
pnpm prisma migrate dev --name nome_da_migration

# Resetar o banco de dados
pnpm prisma migrate reset

# Visualizar o status das migrations
pnpm prisma migrate status
```

## 📧 Sistema de Emails

O projeto utiliza **Resend** para envio de emails transacionais:

- Email de boas-vindas para novos leads
- Template HTML responsivo
- Configuração em `src/lib/email.ts`

## 🛡️ Rate Limiting

Proteção contra spam e abuso usando **Upstash Rate Limit**:

- Limite: 3 requisições por minuto por IP
- Aplicado nos formulários de cadastro
- Configuração em `src/lib/rate-limit.ts`

## 🎨 Estilização

O projeto utiliza **Tailwind CSS 4** com:

- Design system customizado
- Componentes reutilizáveis
- Responsividade mobile-first
- Animações e transições suaves

## 📱 Funcionalidades

### Página Inicial

- Hero section com call-to-actions
- Seção "Como Funciona"
- Seção "Nossos Diferenciais"
- FAQ interativo
- Design totalmente responsivo

### Cadastro de Clientes

- Formulário com validação
- Captura de informações de localização via CEP
- Máscaras para telefone e CEP
- Envio de email de boas-vindas

### Cadastro de Profissionais

- Formulário específico para profissionais
- Informações sobre experiência
- Áreas de atuação

<!-- ## 🔒 Conformidade LGPD

O projeto está em conformidade com a LGPD:

- Captura de consentimento explícito
- Armazenamento de IP e timestamp de consentimento
- Links para política de privacidade e termos de serviço
- Controle de finalidade dos dados -->

## 🧪 Scripts Disponíveis

```bash
# Desenvolvimento
pnpm dev

# Build
pnpm build

# Produção
pnpm start

# Lint
pnpm lint

# Prisma Studio
pnpm prisma studio

# Migrations
pnpm prisma migrate dev
```

## 📝 Licença

Este projeto é open source e está disponível sob a licença MIT.

## 👥 Contato

Para dúvidas ou sugestões:

- Website: https://diaria-facil.app.br/contato

---

Desenvolvido com ❤️ pela equipe Diária Fácil
