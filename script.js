// script.js

document.addEventListener('DOMContentLoaded', () => {

  // Função utilitária para mostrar alerta  na tela
  function mostrarAlerta(mensagem, tipo = 'success', duracao = 3000) {
    const alerta = document.getElementById('alerta');
    const alertaMensagem = document.getElementById('alerta-mensagem');

    if (!alerta || !alertaMensagem) {
      // fallback: se não existir o elemento, usa alert clássico
      window.alert(mensagem);
      return;
    }

    // Remove classes de tipo anteriores
    alerta.classList.remove('success', 'error', 'info');
    alerta.classList.add('mostrar');

    // Adiciona a classe do tipo (se existir)
    if (tipo === 'success') alerta.classList.add('success');
    else if (tipo === 'error') alerta.classList.add('error');
    else alerta.classList.add('info');

    alertaMensagem.textContent = mensagem;
    alerta.style.display = 'flex';

    // Limpar qualquer timeout anterior
    if (alerta._timeout) {
      clearTimeout(alerta._timeout);
    }

    alerta._timeout = setTimeout(() => {
      alerta.classList.remove('mostrar');
      // pequena transição antes de esconder display
      setTimeout(() => {
        alerta.style.display = 'none';
      }, 350);
    }, duracao);
  }

  // Função para alternar menu em mobile
  const btnMenu = document.getElementById('btn-menu');
  const nav = document.querySelector('.nav');
  if (btnMenu) {
    btnMenu.addEventListener('click', () => {
      nav.classList.toggle('active');
    });
  }

  // Filtro de produtos por categoria
  const filtro = document.getElementById('filtro-categoria');
  const produtos = document.querySelectorAll('.produto');

  if (filtro) {
    filtro.addEventListener('change', () => {
      const categoriaSelecionada = filtro.value;

      produtos.forEach(produto => {
        const categoriaProduto = produto.getAttribute('data-categoria');

        if (categoriaSelecionada === 'todos' || categoriaSelecionada === categoriaProduto) {
          produto.style.display = 'flex';
        } else {
          produto.style.display = 'none';
        }
      });
    });
  }

  // Função para validar formulário simples
  const formContato = document.getElementById('form-contato');

  if (formContato) {
    formContato.addEventListener('submit', e => {
      e.preventDefault();

      const nome = formContato.nome.value.trim();
      const email = formContato.email.value.trim();
      const mensagem = formContato.mensagem.value.trim();

      if (!nome || !email || !mensagem) {
        mostrarAlerta('Por favor, preencha todos os campos.', 'error');
        return;
      }

      if (!validateEmail(email)) {
        mostrarAlerta('Por favor, insira um email válido.', 'error');
        return;
      }

      mostrarAlerta(`Obrigado pelo contato, ${nome}! Responderemos em breve.`, 'success');
      formContato.reset();
    });
  }

  // Função simples para validar email
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email.toLowerCase());
  }

  // Função para comprar produto (exemplo)
  const botoesComprar = document.querySelectorAll('.btn-comprar');
  const botoesCarrinho = document.querySelectorAll('.btn-carrinho');

  botoesComprar.forEach(botao => {
    botao.addEventListener('click', () => {
      const nomeProdutoEl = botao.parentElement.parentElement.querySelector('h4');
      const nomeProduto = nomeProdutoEl ? nomeProdutoEl.textContent : 'Produto';
      // usar alerta na tela em vez de alert()
      mostrarAlerta(`Você comprou: ${nomeProduto}! 💖`, 'success');
    });
  });

  botoesCarrinho.forEach(botao => {
    botao.addEventListener('click', () => {
      const nomeProdutoEl = botao.parentElement.parentElement.querySelector('h4');
      const nomeProduto = nomeProdutoEl ? nomeProdutoEl.textContent : 'Produto';
      mostrarAlerta(`"${nomeProduto}" foi adicionado ao carrinho 🛍️`, 'success');
    });
  });

  // Função para contar cliques no banner
  const btnBanner = document.querySelector('.btn-banner');
  let contadorCliques = 0;

  if (btnBanner) {
    btnBanner.addEventListener('click', () => {
      contadorCliques++;
      mostrarAlerta(`Você clicou ${contadorCliques} vezes no botão da coleção.`, 'info');
    });
  }

  // Função para alterar tema entre claro e escuro
  const body = document.body;
  let temaEscuro = false;

  function toggleTema() {
    temaEscuro = !temaEscuro;
    if (temaEscuro) {
      body.style.backgroundColor = '#222';
      body.style.color = '#eee';
    } else {
      body.style.backgroundColor = '#EDDCD4';
      body.style.color = '#333';
    }
  }

  // Lightbox
  const imagens = document.querySelectorAll('.produto img');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.querySelector('.lightbox-img');
  const fechar = document.querySelector('.lightbox .fechar');

  imagens.forEach(img => {
    img.addEventListener('click', () => {
      if (lightbox && lightboxImg) {
        lightbox.style.display = 'flex';
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
      }
    });
  });

  if (fechar) {
    fechar.addEventListener('click', () => {
      if (lightbox) lightbox.style.display = 'none';
    });
  }

  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        lightbox.style.display = 'none';
      }
    });
  }

  // Pesquisa de produtos
  const inputPesquisa = document.getElementById('input-pesquisa');
  const btnPesquisar = document.getElementById('btn-pesquisar');
  const mensagemNaoEncontrado = document.getElementById('mensagem-nao-encontrado');

  function pesquisarProdutos() {
    const termo = (inputPesquisa ? inputPesquisa.value : '').trim().toLowerCase();
    let algumEncontrado = false;

    produtos.forEach(produto => {
      const nomeEl = produto.querySelector('h4');
      const nomeProduto = nomeEl ? nomeEl.textContent.toLowerCase() : '';
      const categoriaProduto = produto.getAttribute('data-categoria');

      if (nomeProduto.includes(termo) && (filtro.value === 'todos' || filtro.value === categoriaProduto)) {
        produto.style.display = 'flex';
        algumEncontrado = true;
      } else {
        produto.style.display = 'none';
      }
    });

    if (mensagemNaoEncontrado) {
      mensagemNaoEncontrado.style.display = algumEncontrado ? 'none' : 'block';
    }
  }

  if (btnPesquisar) btnPesquisar.addEventListener('click', pesquisarProdutos);

  if (inputPesquisa) {
    inputPesquisa.addEventListener('keyup', (e) => {
      if (e.key === 'Enter') {
        pesquisarProdutos();
      }
    });
  }

  // Expor a função globalmente 
  window.mostrarAlerta = mostrarAlerta;

});
