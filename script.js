// Seleciona os elementos do formulario.
const amount = document.getElementById("amount");

// Captura o evento de input para formatar o valor.
amount.oninput = () => {
  // Obtem o valor atual do input e remove os caracteres nao numericos.
  let value = amount.value.replace(/\D/g, "");

  // Transforma o valor em centavos. (exemplo : 150/100 = 1.5 que e equivalente a R$ 1,50)
  value = Number(value) / 100;

  // Atualiza o valor do input
  amount.value = formatCurrencyBRL(value);
};

function formatCurrencyBRL(value) {
  // Formata o valor no padrao BRL (real brasileiro)
  value = value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  // Retorna o valor formatado.
  return value;
}
