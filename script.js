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

botoesComprar.forEach(botao => {
  botao.addEventListener('click', () => {
    alert('Produto adicionado ao carrinho!');
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
