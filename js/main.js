/**
 * ============================================
 * CONSTRU FÁCIL MATERIAIS - JAVASCRIPT GLOBAL
 * ============================================
 */

// Aguarda o DOM estar completamente carregado
document.addEventListener('DOMContentLoaded', function() {
  
  // ==========================================
  // BUSCA NO HEADER - ABRIR/FECHAR (MOBILE)
  // ==========================================
  const buscaToggle = document.querySelector('.busca-toggle');
  const buscaForm = document.querySelector('.busca-form');
  
  if (buscaToggle && buscaForm) {
    buscaToggle.addEventListener('click', function() {
      buscaForm.classList.toggle('ativo');
      const buscaInput = buscaForm.querySelector('.busca-input');
      if (buscaForm.classList.contains('ativo')) {
        buscaInput.focus();
      }
    });
    
    // Fecha a busca ao clicar fora
    document.addEventListener('click', function(event) {
      if (!buscaForm.contains(event.target) && !buscaToggle.contains(event.target)) {
        buscaForm.classList.remove('ativo');
      }
    });
  }
  
  // ==========================================
  // BUSCA NO HEADER - REDIRECIONAR PARA CATÁLOGO
  // ==========================================
  const buscaForms = document.querySelectorAll('.busca-form');
  
  buscaForms.forEach(function(form) {
    form.addEventListener('submit', function(event) {
      event.preventDefault();
      
      const buscaInput = form.querySelector('.busca-input');
      const termo = buscaInput.value.trim();
      
      if (termo) {
        // Redireciona para a página de catálogo com o termo na URL
        const action = form.getAttribute('action') || 'catalogo.html';
        window.location.href = action + '?q=' + encodeURIComponent(termo);
      }
    });
  });
  
  // ==========================================
  // CATÁLOGO - PREENCHER BUSCA DA URL
  // ==========================================
  const urlParams = new URLSearchParams(window.location.search);
  const termoBusca = urlParams.get('q');
  
  if (termoBusca) {
    const buscaInput = document.querySelector('.busca-input');
    if (buscaInput) {
      buscaInput.value = termoBusca;
    }
  }
  
  // ==========================================
  // MENU HAMBURGUER PARA MOBILE
  // ==========================================
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  
  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', function() {
      menuToggle.classList.toggle('active');
      navMenu.classList.toggle('ativo');
      
      // Atualiza o atributo aria-expanded para acessibilidade
      const isExpanded = menuToggle.classList.contains('active');
      menuToggle.setAttribute('aria-expanded', isExpanded);
    });
    
    // Fecha o menu ao clicar em um link
    const navLinks = navMenu.querySelectorAll('.nav-link');
    navLinks.forEach(function(link) {
      link.addEventListener('click', function() {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('ativo');
      });
    });
    
    // Fecha o menu ao clicar fora dele
    document.addEventListener('click', function(event) {
      if (!menuToggle.contains(event.target) && !navMenu.contains(event.target)) {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('ativo');
      }
    });
  }
  
  // ==========================================
  // DESTACAR LINK ATIVO NO MENU
  // ==========================================
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(function(link) {
    const href = link.getAttribute('href');
    if (href === currentPage || 
        (currentPage === '' && href === 'index.html') ||
        (currentPage === '/' && href === 'index.html')) {
      link.classList.add('ativo');
    }
    
    // Verifica também para páginas dentro de pastas (categorias)
    if (currentPage.includes('categorias/')) {
      const categoriaLink = document.querySelector('.nav-link[href="catalogo.html"]');
      if (categoriaLink) {
        categoriaLink.classList.remove('ativo');
      }
    }
  });
  
  // ==========================================
  // NEWSLETTER - FORMULÁRIO
  // ==========================================
  const newsletterForm = document.querySelector('.newsletter-form');
  const newsletterMensagem = document.querySelector('.newsletter-mensagem');
  
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(event) {
      event.preventDefault();
      
      const nomeInput = newsletterForm.querySelector('input[type="text"]');
      const whatsappInput = newsletterForm.querySelector('input[type="tel"]');
      
      // Validação simples
      if (!nomeInput.value.trim() || !whatsappInput.value.trim()) {
        alert('Por favor, preencha todos os campos!');
        return;
      }
      
      // Validação de formato do WhatsApp (básica)
      const whatsappLimpo = whatsappInput.value.replace(/\D/g, '');
      if (whatsappLimpo.length < 10) {
        alert('Por favor, digite um WhatsApp válido!');
        return;
      }
      
      // Simula envio bem-sucedido
      newsletterMensagem.textContent = '✅ ' + nomeInput.value.split(' ')[0] + ', você foi cadastrado com sucesso! Em breve receberá ofertas no seu WhatsApp.';
      newsletterMensagem.style.display = 'block';
      
      // Limpa o formulário
      newsletterForm.reset();
      
      // Esconde a mensagem após 5 segundos
      setTimeout(function() {
        newsletterMensagem.style.display = 'none';
      }, 8000);
    });
  }
  
  // ==========================================
  // CATÁLOGO - BUSCA E FILTRO DE PRODUTOS
  // ==========================================
  const buscaInput = document.querySelector('.busca-input');
  const filtroSelect = document.querySelector('.filtro-select');
  const produtosGrid = document.querySelector('.produtos-grid');
  
  if (buscaInput && produtosGrid) {
    const produtos = Array.from(produtosGrid.querySelectorAll('.produto-card'));
    
    // Função de filtrar produtos
    function filtrarProdutos() {
      const termoBusca = buscaInput.value.toLowerCase().trim();
      const categoriaFiltro = filtroSelect ? filtroSelect.value : 'todos';
      
      let produtosVisiveis = 0;
      
      produtos.forEach(function(produto) {
        const nomeProduto = produto.querySelector('.produto-nome').textContent.toLowerCase();
        const descricaoProduto = produto.querySelector('.produto-descricao').textContent.toLowerCase();
        const dataCategoria = produto.getAttribute('data-categoria') || 'todos';
        
        // Verifica se o produto corresponde à busca
        const correspondeBusca = nomeProduto.includes(termoBusca) || 
                                  descricaoProduto.includes(termoBusca);
        
        // Verifica se o produto corresponde à categoria
        const correspondeCategoria = categoriaFiltro === 'todos' || 
                                      dataCategoria === categoriaFiltro;
        
        // Mostra ou esconde o produto
        if (correspondeBusca && correspondeCategoria) {
          produto.style.display = 'block';
          produtosVisiveis++;
        } else {
          produto.style.display = 'none';
        }
      });
      
      // Mostra mensagem se nenhum produto for encontrado
      let mensagemNaoEncontrados = document.querySelector('.produtos-nao-encontrados');
      
      if (produtosVisiveis === 0) {
        if (!mensagemNaoEncontrados) {
          mensagemNaoEncontrados = document.createElement('div');
          mensagemNaoEncontrados.className = 'produtos-nao-encontrados';
          mensagemNaoEncontrados.innerHTML = '<p>😕 Nenhum produto encontrado com os filtros selecionados.</p>';
          produtosGrid.parentNode.insertBefore(mensagemNaoEncontrados, produtosGrid.nextSibling);
        }
      } else {
        if (mensagemNaoEncontrados) {
          mensagemNaoEncontrados.remove();
        }
      }
    }
    
    // Adiciona eventos de busca e filtro
    buscaInput.addEventListener('input', filtrarProdutos);
    
    if (filtroSelect) {
      filtroSelect.addEventListener('change', filtrarProdutos);
    }
  }
  
  // ==========================================
  // SCROLL SUAVE PARA LINKS INTERNOS
  // ==========================================
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(event) {
      const href = this.getAttribute('href');
      
      // Ignora links "#" vazios
      if (href === '#') return;
      
      const target = document.querySelector(href);
      
      if (target) {
        event.preventDefault();
        
        const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
        const targetPosition = target.offsetTop - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // ==========================================
  // ANIMAÇÃO DE SCROLL (FADE IN)
  // ==========================================
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };
  
  const scrollObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);
  
  // Aplica animação a elementos com a classe 'animar-scroll'
  document.querySelectorAll('.animar-scroll').forEach(function(element) {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    scrollObserver.observe(element);
  });
  
  // ==========================================
  // HEADER - EFEITO DE SOMBRA AO SCROLLAR
  // ==========================================
  const header = document.querySelector('.header');
  
  if (header) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 50) {
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
      } else {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
      }
    });
  }
  
  // ==========================================
  // BOTÃO VOLTAR AO TOPO (OPCIONAL)
  // ==========================================
  // Pode ser adicionado futuramente se necessário
  
  console.log('✅ Ponto Certo da Construção - JavaScript carregado com sucesso!');
});

// ==========================================
// FUNÇÃO GLOBAL PARA FORMATAR WHATSAPP
// ==========================================
function formatarWhatsApp(numero) {
  // Remove todos os caracteres não numéricos
  let numeroLimpo = numero.replace(/\D/g, '');
  
  // Adiciona o código do país se não tiver
  if (numeroLimpo.length === 11) {
    return '55' + numeroLimpo;
  } else if (numeroLimpo.length === 10) {
    return '55' + numeroLimpo;
  }
  
  return numeroLimpo;
}

// ==========================================
// FUNÇÃO GLOBAL PARA ABRIR WHATSAPP
// ==========================================
function abrirWhatsApp(numero, mensagem) {
  const numeroFormatado = formatarWhatsApp(numero);
  const mensagemCodificada = encodeURIComponent(mensagem);
  const url = 'https://wa.me/' + numeroFormatado + '?text=' + mensagemCodificada;
  window.open(url, '_blank');
}
