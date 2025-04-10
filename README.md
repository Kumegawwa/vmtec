# VMTEC Engenharia - Website (Projeto de Estudo)

## Descrição

Este repositório contém o código-fonte de um website desenvolvido como projeto de estudo para a empresa fictícia (ou real, se for o caso) VMTEC Engenharia. O objetivo principal foi praticar e aplicar conceitos de desenvolvimento web frontend e backend básicos, criando um site responsivo e funcional.

O site apresenta informações sobre a empresa, seus valores, serviços, clientes, depoimentos, projetos realizados e um formulário de contato funcional.

**Nota:** Este é um projeto desenvolvido para fins de aprendizado e portfólio.

## Páginas e Funcionalidades

*   **Página Principal (`index.html`):**
    *   Header fixo (Sticky Top) com informações de contato e navegação.
    *   Slider de imagens principal (Bootstrap Carousel).
    *   Seção de Valores (Missão, Visão, Pessoas).
    *   Seção "Quem Somos" com texto e vídeo de apresentação (HTML5 Video).
    *   Listagem detalhada de Serviços.
    *   Seção específica sobre Manutenção de Máquinas de Papel.
    *   Slider de Clientes (Swiper.js).
    *   Slider de Depoimentos (Swiper.js).
    *   Formulário de Contato com envio assíncrono (Fetch API) para script PHP.
    *   Footer com informações de copyright (ano dinâmico via JS) e links sociais (Facebook, WhatsApp).
*   **Página de Projetos (`projetos.html`):**
    *   Galeria de projetos realizados pela empresa.
    *   Filtros de categoria para visualizar projetos específicos (JavaScript).
    *   Modal (Bootstrap Modal) para visualização ampliada das imagens dos projetos (simulando um Lightbox).
*   **Responsividade:** O layout se adapta a diferentes tamanhos de tela (desktop, tablet, mobile) utilizando Bootstrap.
*   **Interatividade:** Smooth scroll na página principal, sliders, validação e envio de formulário sem recarregar a página.
*   **Backend Básico:** Script PHP (`assets/scripts/contato.php`) para receber os dados do formulário, formatar um e-mail e enviá-lo para o destinatário configurado, retornando uma resposta JSON.

## Tecnologias Utilizadas

*   **Frontend:**
    *   HTML5 (Estrutura semântica)
    *   CSS3 (Estilização, Variáveis CSS, Layouts Flexbox/Grid implícitos via Bootstrap)
    *   JavaScript (Vanilla JS ES6+ para interatividade, manipulação do DOM, filtros, AJAX)
    *   **Bootstrap v5.3.3:** Framework CSS para layout responsivo, componentes (Navbar, Carousel, Modal, Cards, Grid, Utilities) e sistema de grid.
    *   **Swiper.js v11:** Biblioteca JavaScript para sliders/carrosséis (Clientes e Depoimentos).
    *   **Font Awesome v6.5.1:** Biblioteca de ícones vetoriais.
    *   **Google Fonts:** Para as fontes 'Lato' e 'Montserrat'.
*   **Backend:**
    *   **PHP:** Linguagem utilizada para o processamento do formulário de contato no lado do servidor (`mail()` function).
*   **Conceitos:**
    *   Design Responsivo
    *   AJAX (Fetch API)
    *   Manipulação do DOM
    *   Versionamento com Git (implícito)

## Estrutura de Arquivos (Simplificada)

├── index.html # Página principal

├── projetos.html # Página da galeria de projetos
├── assets/
│ ├── styles/
│ │ └── style.css # Folha de estilos principal
│ ├── scripts/
│ │ ├── script.js # Script JavaScript principal
│ │ └── contato.php # Script PHP para processar o formulário
│ ├── images/ # Imagens gerais (logo, favicon, slides, clientes, etc.)
│ │ └── projetos/ # Imagens específicas dos projetos
│ ├── icons/ # Ícones SVG personalizados (missao, visao, etc.)
│ └── video/ # Arquivos de vídeo (apresentacao)
└── README.md # Este arquivo

## Como Executar Localmente

1.  **Clone o repositório:**
    ```bash
    git clone <url-do-seu-repositorio>
    cd <nome-da-pasta-do-repositorio>
    ```
2.  **Visualização Estática:**
    *   Você pode abrir os arquivos `index.html` e `projetos.html` diretamente no navegador. A maioria das funcionalidades frontend (layout, sliders, filtros, modal) funcionará.
3.  **Para Funcionalidade Completa (Formulário de Contato):**
    *   Você precisa de um servidor web local com suporte a PHP (como XAMPP, MAMP, WAMP, Laragon ou o servidor embutido do PHP).
    *   Coloque a pasta do projeto no diretório do seu servidor local (ex: `htdocs` no XAMPP).
    *   Acesse o projeto através do navegador usando o endereço do seu servidor local (ex: `http://localhost/nome-da-pasta-do-repositorio/`).
    *   **Configuração do E-mail:** Abra o arquivo `assets/scripts/contato.php` e configure a variável `$para` com o endereço de e-mail que deve receber as mensagens do formulário. Certifique-se também que seu ambiente PHP está configurado corretamente para enviar e-mails (pode exigir configurações adicionais no `php.ini` ou um serviço SMTP).