#!/bin/bash

# Script para copiar templates para o build standalone
echo "📄 Copiando templates de email para o build..."

# Criar diretório de destino se não existir
mkdir -p .next/standalone/src/lib/email-templates

# Copiar templates
cp -r src/lib/email-templates/* .next/standalone/src/lib/email-templates/

echo "✅ Templates copiados com sucesso!"