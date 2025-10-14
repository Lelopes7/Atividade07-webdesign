//Carregar produtos do carrinho
const lista = document.getElementById("lista-carrinho");
const totalEl = document.getElementById("total");
const btnLimpar = document.getElementById("limpar-carrinho");

let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

//Exibe o carrinho de compras
function exibirCarrinho() {
  lista.innerHTML = "";

//Verifica se o carrinho tem algum item, caso não, mostra a mensagem
if (carrinho.length === 0) {
    lista.innerHTML = "<p>Seu carrinho está vazio 🛍️</p>";
    totalEl.textContent = "";
    return;
  }

  let total = 0;

  //Mostra os produtos com valor em reais
  carrinho.forEach((item, index) => {
    const precoNumero = parseFloat(item.preco.replace("R$", "").replace(",", "."));
    total += precoNumero;

    const div = document.createElement("div");
    div.classList.add("item-carrinho");
    div.innerHTML = `
      <img src="${item.imagem}" alt="${item.nome}" width="80">
      <div>
        <h4>${item.nome}</h4>
        <p>${item.preco}</p>
        <button onclick="removerItem(${index})" id="remover-item">Remover</button>
      </div>
    `;
    lista.appendChild(div);
  });

  //Mostra valor total do carrinho
  totalEl.textContent = `Total: R$ ${total.toFixed(2).replace(".", ",")}`;
}

//Função para limpar o carrinho
function removerItem(index) {
  carrinho.splice(index, 1);
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
  exibirCarrinho();
}

//Pede confirmação para a ação
btnLimpar.addEventListener("click", () => {
  if (confirm("Tem certeza que deseja esvaziar o carrinho?")) {
    localStorage.removeItem("carrinho");
    carrinho = [];
    exibirCarrinho();
  }
});
exibirCarrinho();