const form = document.querySelector("form");
const expenseInput = document.getElementById("expense");
const category = document.getElementById("category");
const amount = document.getElementById("amount");
const aside = document.querySelector("aside");
const expensesList = document.createElement("ul");
aside.appendChild(expensesList);

const expenses = [];

amount.addEventListener("input", (event) => {
  let value = event.target.value;
  value = value.replace(/\D+/g, "");

  let number = value ? parseInt(value, 10) : 0;

  const valueFormatted = number / 100;
  event.target.value = formatCurrencyBRL(valueFormatted);
});

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
  handleCreateExpenseList(expense.name, expense.category, expense.price);
});

function formatCurrencyBRL(value) {
  return value.toLocaleString("pt-Br", {
    style: "currency",
    currency: "BRL",
  });
}

function handleCreateExpenseList(name, category, price) {
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
