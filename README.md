<div align="center">

# Motoshock

**Sua preferência, nosso maior valor.**

Site institucional e catálogo de acessórios para motos — com atendimento direto via WhatsApp.

[![Next.js](https://img.shields.io/badge/Next.js-16-000000?style=flat&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=flat&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

</div>

---

## Sobre o projeto

Site da **Motoshock**, empresa especializada em peças, acessórios e manutenção de motos em Pernambuco, com unidades em Prazeres (Jaboatão dos Guararapes) e Cabo de Santo Agostinho.

O site reúne:

- **Landing page** institucional com hero animado (GSAP), seção sobre a empresa, serviços, diferenciais e localização
- **Catálogo de acessórios** — Capacetes, Capas de Chuva, Jaquetas, Calças, Luvas, Botas e Óleos (motor, freio e suspensão)
- **Seleção de unidade** — o usuário escolhe a loja preferida e todos os links de WhatsApp respeitam essa seleção
- **CTA direto pro WhatsApp** em todos os produtos, sem exibir preços

---

## Tecnologias

| Categoria | Stack |
|-----------|-------|
| **Framework** | Next.js 16 (App Router) |
| **UI** | React 19 + TypeScript 5 |
| **Estilização** | Tailwind CSS v4 + CSS inline |
| **Animações** | GSAP (hero) |
| **Estado** | React Context API + localStorage |
| **Dados** | Arquivos TypeScript em `lib/data/` |
| **Versionamento** | Git + GitHub |

---

## Estrutura de pastas

```
motoshock-site/
├── app/
│   ├── page.tsx                          # Homepage
│   ├── layout.tsx                        # Layout raiz
│   └── catalogo/
│       └── acessorios/
│           ├── page.tsx                  # Grid de categorias
│           ├── capacetes/
│           ├── capas-de-chuva/
│           ├── oleos/
│           │   ├── oleo-motor/
│           │   ├── oleo-freio/
│           │   └── oleo-suspensao/
│           └── [tipo]/                   # Jaquetas, Calças, Luvas, Botas
├── components/
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── ConsultorCard.tsx
│   ├── HeroGsap.tsx
│   └── SelecionarUnidade.tsx
├── lib/
│   ├── context/unidade.tsx               # Contexto de seleção de unidade
│   ├── data/
│   │   ├── empresa.ts                    # Endereços e WhatsApp
│   │   ├── acessorios.ts                 # Catálogo de acessórios
│   │   └── marcas.ts                     # Marcas de moto
│   └── utils.ts                          # Gerador de link WhatsApp
├── public/Imagens/                       # Imagens dos produtos
├── next.config.ts
└── tsconfig.json
```

---

## Começando

### Pré-requisitos

- Node.js **18.17+**
- npm, yarn ou pnpm

### Instalação

```bash
git clone https://github.com/kibedev/motoshock-site.git
cd motoshock-site
npm install
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

---

## Scripts

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Build de produção |
| `npm run start` | Executa a build localmente |
| `npx tsc --noEmit` | Verificação de tipos |

---

## Deploy

Recomendado via [Vercel](https://vercel.com/):

1. Importe o repositório em [vercel.com/new](https://vercel.com/new)
2. Deploy automático a cada `push` na branch `main`

---

<div align="center">

Desenvolvido por [kibedev](https://github.com/kibedev)

</div>
