// Função para alternar menu em mobile
const btnMenu = document.getElementById('btn-menu');
const nav = document.querySelector('.nav');

btnMenu.addEventListener('click', () => {
  nav.classList.toggle('active');
});

// Filtro de produtos por categoria
const filtro = document.getElementById('filtro-categoria');
const produtos = document.querySelectorAll('.produto');

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

// Função para validar formulário simples
const formContato = document.getElementById('form-contato');

formContato.addEventListener('submit', e => {
  e.preventDefault();

  const nome = formContato.nome.value.trim();
  const email = formContato.email.value.trim();
  const mensagem = formContato.mensagem.value.trim();

  if (!nome || !email || !mensagem) {
    alert('Por favor, preencha todos os campos.');
    return;
  }

  if (!validateEmail(email)) {
    alert('Por favor, insira um email válido.');
    return;
  }

  alert(`Obrigado pelo contato, ${nome}! Responderemos em breve.`);
  formContato.reset();
});

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
    const nomeProduto = botao.parentElement.parentElement.querySelector('h4').textContent;
    alert(`Você comprou: ${nomeProduto}! 💖`);
  });
});

botoesCarrinho.forEach(botao => {
  botao.addEventListener('click', () => {
    const nomeProduto = botao.parentElement.parentElement.querySelector('h4').textContent;
    alert(`"${nomeProduto}" foi adicionado ao carrinho 🛍️`);
  });
});

// Função para contar cliques no banner
const btnBanner = document.querySelector('.btn-banner');
let contadorCliques = 0;

btnBanner.addEventListener('click', () => {
  contadorCliques++;
  alert(`Você clicou ${contadorCliques} vezes no botão da coleção.`);
});

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
    lightbox.style.display = 'flex';
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
  });
});

fechar.addEventListener('click', () => {
  lightbox.style.display = 'none';
});

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) {
    lightbox.style.display = 'none';
  }
});


// Pesquisa de produtos
const inputPesquisa = document.getElementById('input-pesquisa');
const btnPesquisar = document.getElementById('btn-pesquisar');
const mensagemNaoEncontrado = document.getElementById('mensagem-nao-encontrado');

function pesquisarProdutos() {
  const termo = inputPesquisa.value.trim().toLowerCase();
  let algumEncontrado = false;

  produtos.forEach(produto => {
    const nomeProduto = produto.querySelector('h4').textContent.toLowerCase();
    const categoriaProduto = produto.getAttribute('data-categoria');

    // Filtra pelo termo e categoria selecionada
    if (nomeProduto.includes(termo) && (filtro.value === 'todos' || filtro.value === categoriaProduto)) {
      produto.style.display = 'flex';
      algumEncontrado = true;
    } else {
      produto.style.display = 'none';
    }
  });

  mensagemNaoEncontrado.style.display = algumEncontrado ? 'none' : 'block';
}

// Pesquisar ao clicar no botão
btnPesquisar.addEventListener('click', pesquisarProdutos);

// Pesquisar ao pressionar Enter no input
inputPesquisa.addEventListener('keyup', (e) => {
  if (e.key === 'Enter') {
    pesquisarProdutos();
  }
});


