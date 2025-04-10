// Função IIFE para encapsular o código e evitar poluir o escopo global
(function() {
    'use strict';

    // --- PRELOADER (Opcional) ---
    const preloader = document.getElementById('preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            preloader.classList.add('loaded');
        });
    }

    // --- ATUALIZAR ANO NO FOOTER ---
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // --- SMOOTH SCROLL PARA LINKS ÂNCORA (Navbar - Apenas para index.html) ---
    // Verifica se estamos na página principal antes de adicionar listeners de scroll
    if (window.location.pathname === '/' || window.location.pathname.endsWith('index.html')) {
        const navLinksInternal = document.querySelectorAll('.navbar-nav .nav-link[href^="#"], .navbar-nav .nav-link[href^="/#"]');
        navLinksInternal.forEach(link => {
            link.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href').split('#')[1]; // Pega só o ID depois de /# ou #
                if (targetId) {
                    e.preventDefault();
                    const targetElement = document.getElementById(targetId);

                    if (targetElement) {
                        // Fecha o menu mobile se estiver aberto
                        const navbarCollapse = document.getElementById('navbarNav');
                        if (navbarCollapse.classList.contains('show')) {
                            const bsCollapse = new bootstrap.Collapse(navbarCollapse, { toggle: false });
                            bsCollapse.hide();
                        }

                        const headerOffset = document.querySelector('.header.sticky-top')?.offsetHeight || 80;
                        const elementPosition = targetElement.getBoundingClientRect().top;
                        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                        window.scrollTo({
                            top: offsetPosition,
                            behavior: 'smooth'
                        });

                        // Atualiza o link ativo (se necessário, pode ser feito pelo scrollspy)
                        // navLinksInternal.forEach(l => l.classList.remove('active'));
                        // this.classList.add('active');
                    }
                }
                 // Se for um link /# vindo de outra página, apenas deixa o navegador ir
            });
        });

         // --- ATIVAR LINK DA NAVBAR AO ROLAR (Scrollspy do Bootstrap) ---
         // Adicione no <body> do index.html: data-bs-spy="scroll" data-bs-target="#navbarNav" data-bs-offset="100" (ou altura do header)
    }


    // --- SWIPER: CLIENTS SLIDER (Apenas no index.html) ---
    const clientsSwiperContainer = document.querySelector('.clients-slider');
    if (clientsSwiperContainer && typeof Swiper !== 'undefined') {
        // ... (código do swiper de clientes como já existe) ...
         new Swiper('.clients-slider', {
            slidesPerView: 2,
            spaceBetween: 20,
            loop: true,
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.clients-pagination',
                clickable: true,
            },
            breakpoints: {
                576: { slidesPerView: 3, spaceBetween: 30 },
                768: { slidesPerView: 4, spaceBetween: 40 },
                992: { slidesPerView: 5, spaceBetween: 50 },
                1200: { slidesPerView: 6, spaceBetween: 60 }
            }
        });
    } else if (clientsSwiperContainer) {
         console.warn("Swiper não carregado ou container .clients-slider não encontrado.");
    }

    // --- SWIPER: TESTIMONIALS SLIDER (Apenas no index.html) ---
     const testimonialsSwiperContainer = document.querySelector('.testimonials-slider');
     if (testimonialsSwiperContainer && typeof Swiper !== 'undefined') {
         // ... (código do swiper de depoimentos como já existe) ...
        new Swiper('.testimonials-slider', {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 6000,
                disableOnInteraction: true,
            },
            navigation: {
                nextEl: '.testimonials-button-next',
                prevEl: '.testimonials-button-prev',
            },
        });
    } else if (testimonialsSwiperContainer) {
        console.warn("Swiper não carregado ou container .testimonials-slider não encontrado.");
    }

    // --- FORMULÁRIO DE CONTATO (AJAX com Fetch API - Apenas no index.html) ---
    const contactForm = document.getElementById('contactForm');
    const formMessages = document.getElementById('form-messages');

    if (contactForm && formMessages) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();

            formMessages.innerHTML = '';
            formMessages.classList.remove('alert', 'alert-success', 'alert-danger');

            const formData = new FormData(contactForm);
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.innerHTML;
            submitButton.disabled = true;
            submitButton.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Enviando...';

            fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json' // Pedir resposta JSON
                }
            })
            .then(response => {
                 // Tenta interpretar como JSON independentemente do status OK
                 // para capturar mensagens de erro do servidor que vêm como JSON
                return response.json().then(data => {
                    // Se a resposta não foi OK (status não 2xx), joga um erro com a mensagem do JSON
                    if (!response.ok) {
                        throw new Error(data.message || `Erro ${response.status}: ${response.statusText}`);
                    }
                    // Se foi OK, retorna os dados JSON
                    return data;
                }).catch(jsonError => {
                     // Se não conseguiu parsear JSON (ex: resposta vazia ou texto puro de erro inesperado)
                     if (response.ok) {
                         // Resposta OK mas não era JSON? Estranho, mas considera sucesso genérico.
                         console.warn("Resposta OK do servidor, mas não era JSON válido.");
                         return { success: true, message: "Operação concluída (resposta não JSON)." };
                     } else {
                         // Resposta não OK e não conseguiu parsear JSON, lança erro genérico
                         throw new Error(`Erro no servidor: Status ${response.status}. Resposta não JSON.`);
                     }
                 });
            })
            .then(data => {
                 if (data.success) {
                    formMessages.innerHTML = `<div class="alert alert-success">${data.message || 'Mensagem enviada com sucesso!'}</div>`;
                    contactForm.reset();
                 } else {
                     // Erro vindo do JSON (data.success === false)
                     formMessages.innerHTML = `<div class="alert alert-danger">${data.message || 'Ocorreu um erro ao enviar a mensagem.'}</div>`;
                 }
            })
            .catch(error => {
                // Erro de rede, erro de parse JSON, ou erro lançado do .then(response => ...)
                console.error('Erro no envio do formulário:', error);
                formMessages.innerHTML = `<div class="alert alert-danger">Erro: ${error.message || 'Não foi possível conectar ao servidor.'}</div>`;
            })
            .finally(() => {
                 submitButton.disabled = false;
                 submitButton.innerHTML = originalButtonText;
            });
        });
    }


    // --- GALERIA DE PROJETOS (Filtro e Modal - Apenas em projetos.html) ---
    const projectGallery = document.getElementById('projetos-galeria');
    if (projectGallery) {
        const filterContainer = document.getElementById('project-filter');
        const filterButtons = filterContainer?.querySelectorAll('.btn-filter-proj');
        const projectItems = projectGallery.querySelectorAll('.project-item');
        const projectModalElement = document.getElementById('projectModal');

        // Filtragem
        if (filterButtons && projectItems.length > 0) {
            filterButtons.forEach(button => {
                button.addEventListener('click', function() {
                    // Remove classe 'active' de todos os botões
                    filterButtons.forEach(btn => btn.classList.remove('active'));
                    // Adiciona 'active' ao botão clicado
                    this.classList.add('active');

                    const filterValue = this.getAttribute('data-filter');

                    projectItems.forEach(item => {
                        const itemCategory = item.getAttribute('data-category');
                        // Verifica se o item deve ser exibido
                        if (filterValue === 'all' || itemCategory === filterValue) {
                            item.style.display = 'block'; // Ou remove d-none se usar display utilities
                        } else {
                            item.style.display = 'none'; // Ou adiciona d-none
                        }
                    });
                });
            });
        } else {
             console.warn("Elementos de filtro ou itens de projeto não encontrados.");
        }

        // Modal Lightbox Population
        if (projectModalElement) {
            const modalImage = projectModalElement.querySelector('#modalImage');
            const modalTitle = projectModalElement.querySelector('#modalTitle'); // Assumindo que você tem um h6 com id="modalTitle" no modal

            projectModalElement.addEventListener('show.bs.modal', function (event) {
                const button = event.relatedTarget; // Botão que acionou o modal
                if (button && modalImage && modalTitle) {
                    const imageSrc = button.getAttribute('data-image');
                    const imageTitle = button.getAttribute('data-title');

                    modalImage.src = imageSrc || ''; // Define o src da imagem no modal
                    modalImage.alt = imageTitle || 'Imagem do Projeto';
                    modalTitle.textContent = imageTitle || ''; // Define o título no modal
                } else {
                     console.error("Não foi possível encontrar o botão de origem ou os elementos do modal (imagem/título).");
                     // Limpa para evitar mostrar dados antigos
                     if(modalImage) modalImage.src = '';
                     if(modalTitle) modalTitle.textContent = 'Erro ao carregar dados';
                }
            });
        } else {
             console.warn("Modal de projeto (#projectModal) não encontrado.");
        }
    }


    // --- VIDEO PLAYER (Controles Padrão HTML5 - Apenas index.html) ---
    const videoHolder = document.getElementById('videoholder');
    const videoPlayer = document.getElementById('videoplayer');
    if (videoHolder && videoPlayer) {
        // O código opcional para play/pause no clique da div pode ser adicionado aqui se desejado
        // Por padrão, os controles HTML5 já funcionam.
    }

})(); // Fim da IIFE