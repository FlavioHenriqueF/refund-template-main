// Chamando todos os elementos a serem modificados.
const form = document.querySelector("form");
const expenseInput = document.getElementById("expense");
const category = document.getElementById("category");
const amount = document.getElementById("amount");
const aside = document.querySelector("aside");
const expensesList = document.createElement("ul");
aside.appendChild(expensesList);
const countExpenses = document.querySelector("span");
const cipherExpenseTotalCount = document.querySelector("small");
const expenseTotalCount = document.querySelector("h2");

// Criando array de despesas.
const expenses = [];

// Validacao para permitir que apenas numeros sejam digitados nos valores de despesas
amount.addEventListener("input", (event) => {
  let value = event.target.value;
  value = value.replace(/\D+/g, "");

  let number = value ? parseInt(value, 10) : 0;

  const valueFormatted = number / 100;
  event.target.value = formatCurrencyBRL(valueFormatted);
});

// Submit do formulario para criar todos os valores do formulario a serem trabalhados
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const amountValueNotRs = amount.value.replace("R$", "");
  const amountValueFormatted = amountValueNotRs.replace(",", ".");

  const expense = {
    name: expenseInput.value,
    category: category.value,
    price: Number(amountValueFormatted),
  };

  expenses.push(expense);

  handleCreateExpenseList(
    expense.name,
    expense.category,
    expense.price,
    expenses.length
  );

  countExpenses.textContent = ` ${expenses.length} despesas`;

  form.reset();
});

function formatCurrencyBRL(value) {
  return value.toLocaleString("pt-Br", {
    style: "currency",
    currency: "BRL",
  });
}

function handleCreateExpenseList(name, category, price, expensesLength) {
  const li = document.createElement("li");
  li.classList.add("expense");
  expensesList.append(li);

  const expenseImg = document.createElement("img");
  expenseImg.src = expenseImage(category);
  li.append(expenseImg);

  const div = document.createElement("div");
  div.classList.add("expense-info");
  li.appendChild(div);

  const expenseName = document.createElement("strong");
  expenseName.textContent = name;

  const expenseCategory = document.createElement("span");
  div.append(expenseName);
  div.appendChild(expenseCategory);
  expenseCategory.textContent = categoryFormated(category);

  const expenseAmount = document.createElement("span");
  const value = formatCurrencyBRL(price).replace("R$", "");
  expenseAmount.classList.add("expense-amount");

  const expenseCipher = document.createElement("small");
  expenseCipher.textContent = "R$";

  expenseAmount.append(expenseCipher, value);

  li.appendChild(expenseAmount);

  const deleteExpense = document.createElement("img");
  deleteExpense.classList.add("remove-icon");
  deleteExpense.src = "/img/remove.svg";
  li.appendChild(deleteExpense);

  const expensePriceTotal = handleExpensesIncrease(price);
  expenseTotalCount.childNodes[1].textContent = formatCurrencyBRL(
    expensePriceTotal
  ).replace("R$", "");

  deleteExpense.addEventListener("click", () => {
    handleDeleteExpense(expensesLength, li, expensePriceTotal, price);
  });
}

function categoryFormated(category) {
  switch (category) {
    case "food":
      return "Alimentação";
    case "accommodation":
      return "Hospedagem";
    case "services":
      return "Serviços";
    case "transport":
      return "Transporte";
    case "others":
      return "Outros";
    default:
  }
}

function expenseImage(category) {
  switch (category) {
    case "food":
      return "./img/food.svg";
    case "accommodation":
      return "./img/accommodation.svg";
    case "services":
      return "./img/services.svg";
    case "transport":
      return "./img/transport.svg";
    case "others":
      return "./img/others.svg";
    default:
  }
}

function handleDeleteExpense(
  expenseDeletePosition,
  expenseContent,
  expensePriceTotal,
  price
) {
  expenses.splice(expenseDeletePosition - 1, 1);
  expenseContent.remove();

  countExpenses.textContent = ` ${expenses.length} despesas`;

  expenseTotalCount.childNodes[1].textContent = handleExpensesDecrease(
    expensePriceTotal,
    price
  );
}

let expensesTotal = 0;

function handleExpensesIncrease(value) {
  return (expensesTotal = expensesTotal + value);
}

function handleExpensesDecrease(total, priceToDecrease) {
  const expensesDecreaseTotal = total - priceToDecrease;

  const expensesDecreaseTotalFormatted = formatCurrencyBRL(
    expensesDecreaseTotal
  ).replace("R$", "");

  return expensesDecreaseTotalFormatted;
}
