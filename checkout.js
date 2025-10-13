// checkout.js
document.addEventListener('DOMContentLoaded', () => {
  const STORAGE_KEY = 'carrinho';
  const resumoItens = document.getElementById('resumo-itens');
  const subtotalEl = document.getElementById('subtotal');
  const form = document.getElementById('form-checkout');
  const mensagem = document.getElementById('mensagem');

  function carregarCarrinho() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch {
      return [];
    }
  }

  function parsePreco(precoStr) {
    if (!precoStr) return 0;
    const apenas = precoStr.replace(/[^\d,.-]/g, '').replace('.', '');
    const conv = apenas.replace(',', '.');
    const n = parseFloat(conv);
    return isNaN(n) ? 0 : n;
  }

  function exibirResumo() {
    const carrinho = carregarCarrinho();
    resumoItens.innerHTML = '';
    if (!carrinho.length) {
      resumoItens.innerHTML = '<p>Seu carrinho está vazio.</p>';
      subtotalEl.textContent = '';
      return;
    }

    let total = 0;
    carrinho.forEach(item => {
      const qtd = item.quantidade || 1;
      const precoNum = (item.precoNumero !== undefined) ? item.precoNumero : parsePreco(item.preco);
      total += precoNum * qtd;

      const div = document.createElement('div');
      div.style.display = 'flex';
      div.style.alignItems = 'center';
      div.style.gap = '12px';
      div.style.marginBottom = '8px';
      div.innerHTML = `
        <img src="${item.imagem || ''}" alt="${item.nome}" width="60" style="object-fit:cover;border-radius:6px;">
        <div>
          <div style="font-weight:600;">${item.nome}</div>
          <div>${item.preco} x ${qtd}</div>
        </div>
      `;
      resumoItens.appendChild(div);
    });

    subtotalEl.textContent = `Subtotal: R$ ${total.toFixed(2).replace('.', ',')}`;
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    mensagem.textContent = '';

    const nome = form.nome.value.trim();
    const email = form.email.value.trim();
    const endereco = form.endereco.value.trim();

    if (!nome || !email || !endereco) {
      mensagem.style.color = '#b00020';
      mensagem.textContent = 'Por favor, preencha todos os campos.';
      return;
    }

    // validação simples de email
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!re.test(email.toLowerCase())) {
      mensagem.style.color = '#b00020';
      mensagem.textContent = 'Email inválido.';
      return;
    }

    // simula confirmação: limpar carrinho e mostrar mensagem
    localStorage.removeItem(STORAGE_KEY);
    mensagem.style.color = '#2e7d32';
    mensagem.textContent = `Pedido confirmado! Obrigada, ${nome}. Em breve entraremos em contato pelo email ${email}.`;

    // atualiza resumo (fica vazio)
    exibirResumo();

    // opcional: redirecionar para confirmacao.html se quiser (aqui não fazemos)
  });

  // inicializa
  exibirResumo();
});

const btnFinalizar = document.getElementById('finalizar-compra');
if (btnFinalizar) {
  btnFinalizar.addEventListener('click', () => {
    window.location.href = 'checkout.html';
  });
}