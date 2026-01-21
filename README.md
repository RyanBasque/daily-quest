# 🗡️ Daily Quest

> **Transforme suas tarefas diárias em uma aventura gamificada**

## 📱 O que é?

**Daily Quest** é um aplicativo mobile híbrido que transforma a gestão de tarefas em uma jornada gamificada. Com uma interface minimalista e foco total na experiência do usuário, o app ajuda você a manter o foco, construir hábitos e acompanhar sua evolução.

Desenvolvido com tecnologias web modernas (Next.js + React) e empacotado como app nativo usando Capacitor, o Daily Quest oferece uma experiência fluida tanto em iOS quanto em Android.

---

## ✨ Principais Funcionalidades

### 🎯 **Onboarding Interativo**
- Fluxo de apresentação com 3 etapas
- Animações suaves usando GSAP
- Navegação intuitiva (próximo/voltar)
- Indicadores de progresso animados

### 🔐 **Sistema de Autenticação**
- Tela de login e recuperação de senha
- Suporte para NextAuth (preparado para integração com MongoDB)
- Possibilidade de integração com Supabase, Firebase ou outros provedores

### 📊 **Dashboard de Tarefas**
- Interface limpa e focada
- Acompanhamento de progresso
- Sistema de streaks (sequências)

### 📱 **APIs Nativas**
- **Câmera**: Captura de fotos e seleção da galeria
- **Device Info**: Informações do dispositivo (modelo, sistema operacional, ID único)
- **Push Notifications**: Notificações push (prontas para configuração)
- **Status Bar**: Customização da barra de status
- **Splash Screen**: Tela de abertura nativa

### 🎨 **Tema Claro/Escuro**
- Alternância entre modos light e dark
- Preferências salvas localmente
- Animações suaves na transição

---

## 🛠️ Stack Tecnológica

### **Frontend**
- **Next.js 15.1.3** - Framework React com App Router e Static Export
- **React 19** - Biblioteca UI com hooks modernos
- **TypeScript 5.7** - Tipagem estática para maior segurança
- **Tailwind CSS 4.0** - Framework CSS utility-first
- **GSAP 3.12** - Biblioteca de animações profissionais

### **Mobile**
- **Capacitor 8.0** - Framework para criar apps nativos com web tech
  - `@capacitor/camera` - Acesso à câmera e galeria
  - `@capacitor/device` - Informações do dispositivo
  - `@capacitor/push-notifications` - Notificações push
  - `@capacitor/status-bar` - Controle da barra de status
  - `@capacitor/splash-screen` - Tela de abertura

### **Backend (Preparado)**
- **NextAuth 5.0** - Autenticação (configurável)
- **MongoDB Adapter** - Integração com MongoDB
- **MongoDB 6.21** - Banco de dados NoSQL

### **Dev Tools**
- **ESLint 9** - Linting de código
- **PostCSS** - Processamento de CSS
- **fnm** - Gerenciador de versões do Node.js

---

## 📁 Arquitetura do Projeto

```
daily-quest/
├── capacitor.config.ts          # Configuração do Capacitor
├── next.config.ts               # Next.js com static export
├── src/
│   ├── app/                     # App Router (Next.js)
│   │   ├── page.tsx            # Home (onboarding check)
│   │   ├── layout.tsx          # Layout raiz com providers
│   │   ├── dashboard/          # Dashboard principal
│   │   ├── login/              # Autenticação
│   │   └── forgot-password/    # Recuperação de senha
│   ├── components/             # Componentes reutilizáveis
│   │   ├── atoms/              # Componentes básicos
│   │   ├── molecules/          # Componentes compostos
│   │   ├── organisms/          # Componentes complexos
│   │   ├── providers/          # Context providers
│   │   └── templates/          # Layouts de página
│   ├── context/                # React Contexts
│   ├── hooks/                  # Custom hooks
│   │   └── useNativeAPIs.ts   # Hook para APIs do Capacitor
│   ├── lib/                    # Utilitários e configs
│   │   ├── capacitor.ts       # Helpers do Capacitor
│   │   └── mongodb.ts         # Conexão MongoDB
│   └── assets/                 # Cores, imagens, etc.
├── ios/                        # Projeto Xcode nativo
├── android/                    # Projeto Android Studio nativo
└── out/                        # Build estático (gerado)
```

---

## 🚀 Comandos Disponíveis

### **Desenvolvimento**
```bash
npm run dev          # Inicia servidor de desenvolvimento (localhost:3000)
npm run build        # Build de produção
npm run lint         # Verifica erros de código
```

### **Mobile (Capacitor)**
```bash
npm run export              # Gera build estático em /out
npm run cap:sync            # Sincroniza código web com plataformas nativas
npm run cap:open:ios        # Abre projeto no Xcode
npm run cap:open:android    # Abre projeto no Android Studio
npm run cap:run:ios         # Build + sync + executa no iOS
npm run cap:run:android     # Build + sync + executa no Android
```

---

## 🎨 Design System

### **Atomic Design**
O projeto segue a metodologia Atomic Design:
- **Atoms**: Button, Input, Typography, ThemeToggle
- **Molecules**: (Em desenvolvimento)
- **Organisms**: Header, OnboardingFlow
- **Templates**: CenterTemplate
- **Pages**: Páginas do App Router

### **Tema**
- Cores definidas em `src/assets/colors.ts`
- CSS variables para light/dark mode
- Suporte a safe area (notch do iPhone)
- Mobile-first responsive design

---

## 📱 Compatibilidade

### **Plataformas**
- ✅ **iOS 13.0+** (iPhone, iPad)
- ✅ **Android 6.0+** (API 23+)
- ✅ **Web** (Progressive Web App)

### **Navegadores**
- Safari (iOS/macOS)
- Chrome (Android/Desktop)
- Firefox, Edge (Desktop)

---

## 🔧 Configuração do Ambiente

### **Requisitos**
- Node.js 22+ (instalado via fnm)
- Xcode 14+ (para iOS)
- Android Studio (para Android)
- Capacitor CLI 8+

### **Instalação**
```bash
# Instalar dependências
npm install

# Adicionar plataformas nativas
npm run cap:add:ios
npm run cap:add:android

# Sincronizar código
npm run cap:sync
```

## 🎯 Próximos Passos

### **Em Desenvolvimento**
- [ ] Implementar CRUD de tarefas
- [ ] Sistema de gamificação (XP, níveis, conquistas)
- [ ] Integração com backend real
- [ ] Notificações push funcionais
- [ ] Sincronização offline
- [ ] Testes unitários e E2E

### **Futuro**
- [ ] Widgets nativos (iOS/Android)
- [ ] Apple Watch app
- [ ] Compartilhamento social
- [ ] Estatísticas avançadas
- [ ] Temas customizáveis

---

## 👨‍💻 Autor

**Ryan Basque**

Projeto criado como template de produção para apps mobile híbridos usando as melhores práticas de desenvolvimento web e mobile.

---

## 📄 Licença

Este projeto é de código privado. Todos os direitos reservados.

---

## 🤝 Contribuindo

Este é um projeto de template/portfólio. Sinta-se à vontade para usar como referência ou base para seus próprios projetos.

---

<div align="center">

**Daily Quest** - Transformando tarefas em aventuras 🗡️✨

</div>
