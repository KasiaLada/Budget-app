const incomeForm = document.querySelector("#incomeForm");
const incomeValue = document.querySelector("#incomeValue");
const expenseForm = document.querySelector("#expenseForm");



incomeForm.addEventListener("submit", (event) => {
	event.preventDefault();
    const incomeTitle = document.querySelector("#incomeTitle");
	addButtonContainer(incomeTitle.value, "#incomesList");
});
incomeForm.addEventListener("submit", event => {
	event.preventDefault();
	const incomeValue = document.querySelector("#incomeValue");
	addButtonContainer(incomeValue.value, "#incomesList");
});

expenseForm.addEventListener("submit", event => {
	event.preventDefault();
	const expenseTitle = document.querySelector("#expenseTitle");
	addButtonContainer(expenseTitle.value, "#expensesList");
});
expenseForm.addEventListener("submit", event => {
	event.preventDefault();
	const expenseValue = document.querySelector("#expenseValue");
	addButtonContainer(expenseValue.value, "#expensesList");
});

const addButtonContainer = (value, containerId) => {
	const container = document.querySelector(containerId);
	const li = document.createElement("li");
	li.textContent = value;
	container.appendChild(li);
};
