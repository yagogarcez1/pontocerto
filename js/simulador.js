/**
 * ============================================
 * CONSTRU FÁCIL MATERIAIS - SIMULADOR DE CIMENTO
 * ============================================
 * Calcula a quantidade de sacos de cimento necessários
 * para diferentes tipos de aplicação.
 */

// Aguarda o DOM estar completamente carregado
document.addEventListener('DOMContentLoaded', function() {
  
  const simuladorForm = document.querySelector('.simulador-form');
  const areaInput = document.getElementById('area');
  const aplicacaoSelect = document.getElementById('aplicacao');
  const calcularBtn = document.getElementById('calcular');
  const resultadoDiv = document.querySelector('.simulador-resultado');
  const resultadoTexto = document.getElementById('resultado-texto');
  const whatsappBtn = document.getElementById('whatsapp-resultado');
  
  // ==========================================
  // TABELA DE CONSUMO DE CIMENTO
  // ==========================================
  // Valores aproximados por m² (sacos de 50kg)
  const consumoPorM2 = {
    'contrapiso': 6,      // 6 sacos por m²
    'reboco': 2,          // 2 sacos por m²
    'assentamento': 4     // 4 sacos por m²
  };
  
  // ==========================================
  // FUNÇÃO DE CÁLCULO
  // ==========================================
  function calcularCimento() {
    // Obtém os valores dos campos
    const area = parseFloat(areaInput.value);
    const aplicacao = aplicacaoSelect.value;
    
    // Validação da área
    if (isNaN(area) || area <= 0) {
      alert('Por favor, digite uma área válida em m²!');
      areaInput.focus();
      return;
    }
    
    if (area > 10000) {
      alert('Área muito grande! Por favor, entre em contato conosco para um orçamento personalizado.');
      return;
    }
    
    // Obtém o consumo por m² baseado na aplicação
    const consumo = consumoPorM2[aplicacao];
    
    if (!consumo) {
      alert('Selecione um tipo de aplicação!');
      return;
    }
    
    // Calcula a quantidade de sacos
    const sacosNecessarios = Math.ceil(area * consumo);
    
    // Exibe o resultado
    exibirResultado(sacosNecessarios, area, aplicacao);
  }
  
  // ==========================================
  // EXIBIR RESULTADO
  // ==========================================
  function exibirResultado(sacos, area, aplicacao) {
    // Nomes amigáveis para as aplicações
    const nomesAplicacao = {
      'contrapiso': 'contrapiso',
      'reboco': 'reboco',
      'assentamento': 'assentamento de pisos'
    };
    
    // Monta a mensagem de resultado
    const mensagem = `Você vai precisar de <strong>${sacos} sacos de cimento de 50kg</strong> para ${area}m² de ${nomesAplicacao[aplicacao]}.`;
    
    resultadoTexto.innerHTML = mensagem;
    resultadoDiv.classList.add('ativo');
    
    // Atualiza o botão do WhatsApp com a mensagem personalizada
    const mensagemWhatsApp = `Olá! Fiz uma simulação no site e preciso de ${sacos} sacos de cimento para ${area}m² de ${nomesAplicacao[aplicacao]}. Poderia me passar um orçamento?`;
    
    if (whatsappBtn) {
      whatsappBtn.setAttribute('data-mensagem', mensagemWhatsApp);
    }
    
    // Rola suavemente até o resultado
    resultadoDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
  
  // ==========================================
  // ABRIR WHATSAPP COM MENSAGEM PERSONALIZADA
  // ==========================================
  function abrirWhatsAppSimulador() {
    const mensagem = this.getAttribute('data-mensagem') || 'Olá! Gostaria de fazer um pedido de materiais de construção.';
    const numeroWhatsApp = '5511999999999';
    
    const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;
    window.open(url, '_blank');
  }
  
  // ==========================================
  // EVENTOS
  // ==========================================
  if (calcularBtn) {
    calcularBtn.addEventListener('click', function(event) {
      event.preventDefault();
      calcularCimento();
    });
  }
  
  if (simuladorForm) {
    simuladorForm.addEventListener('submit', function(event) {
      event.preventDefault();
      calcularCimento();
    });
  }
  
  if (whatsappBtn) {
    whatsappBtn.addEventListener('click', abrirWhatsAppSimulador);
  }
  
  // ==========================================
  // VALIDAÇÃO EM TEMPO REAL
  // ==========================================
  if (areaInput) {
    areaInput.addEventListener('input', function() {
      // Remove caracteres não numéricos
      let valor = this.value.replace(/[^0-9.]/g, '');
      
      // Permite apenas um ponto decimal
      const partes = valor.split('.');
      if (partes.length > 2) {
        valor = partes[0] + '.' + partes.slice(1).join('');
      }
      
      this.value = valor;
    });
    
    // Validação ao perder o foco
    areaInput.addEventListener('blur', function() {
      const valor = parseFloat(this.value);
      
      if (isNaN(valor) || valor <= 0) {
        this.style.borderColor = '#ff4444';
      } else {
        this.style.borderColor = '#e0e0e0';
      }
    });
    
    // Remove o destaque vermelho ao começar a digitar
    areaInput.addEventListener('focus', function() {
      this.style.borderColor = '#FF6600';
    });
  }
  
  // ==========================================
  // DICAS DE CONSUMO (INFORMATIVO)
  // ==========================================
  function exibirDicaAplicacao() {
    const dicas = {
      'contrapiso': '📌 Dica: Para contrapiso, recomenda-se usar cimento, areia e brita na proporção 1:3:3.',
      'reboco': '📌 Dica: Para reboco, use cimento, cal e areia na proporção 1:1:6 para melhor acabamento.',
      'assentamento': '📌 Dica: Para assentamento de pisos, use cimento e areia na proporção 1:3.'
    };
    
    const aplicacao = aplicacaoSelect.value;
    let dicaElement = document.querySelector('.simulador-dica');
    
    if (!dicaElement) {
      dicaElement = document.createElement('div');
      dicaElement.className = 'simulador-dica';
      dicaElement.style.cssText = 'margin-top: 15px; padding: 15px; background-color: #fff3e0; border-radius: 8px; font-size: 0.9rem; color: #666; display: none;';
      simuladorForm.appendChild(dicaElement);
    }
    
    dicaElement.textContent = dicas[aplicacao];
    dicaElement.style.display = 'block';
  }
  
  if (aplicacaoSelect) {
    aplicacaoSelect.addEventListener('change', exibirDicaAplicacao);
  }
  
  console.log('✅ Simulador de Cimento carregado com sucesso!');
});
