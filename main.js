import { v4 as uuidv4 } from "https://jspm.dev/uuid";

const INCOME = "INCOME";
const EXPENSE = "EXPENSE";
const incomeForm = document.querySelector("#incomeForm");
const incomeValue = document.querySelector("#incomeValue");
const expenseForm = document.querySelector("#expenseForm");
const incomeTitle = document.querySelector("#incomeTitle");
const expenseTitle = document.querySelector("#expenseTitle");
const expenseValue = document.querySelector("#expenseValue");
const incomesValue = document.querySelector("#incomesValue");

const incomeSum = [];
const expenseSum = [];

incomeForm.addEventListener("submit", event => {
	event.preventDefault();
	addButtonContainer(
		incomeTitle.value,
		incomeValue.value,
		"#incomesList",
		INCOME
	);
});

expenseForm.addEventListener("submit", event => {
	event.preventDefault();
	addButtonContainer(
		expenseTitle.value,
		expenseValue.value,
		"#expensesList",
		EXPENSE
	);
});

const addButtonContainer = (title, amount, containerId, mode) => {
	const container = document.querySelector(containerId);
	const li = document.createElement("li");
	li.id = uuidv4();
	li.textContent = `${title} ${amount}`;
	li.style.listStyle = "none";
	const editButton = document.createElement("button");
	editButton.textContent = "Edit";
	li.appendChild(editButton);
	const deleteButton = document.createElement("button");
	deleteButton.textContent = "Delete";
	li.appendChild(deleteButton);
	container.appendChild(li);
	if (mode === INCOME) {
		manageData(incomeSum, incomesValue);
	} else {
		manageData(expenseSum,expenseValue );
	}
};
const manageData = (sum, sumValue) => {
	sum.push({
		id: li.id,
		title: title,
		amount: Number(amount),
	});
	sumValue.textContent = calculateSum(sum);
};


const calculateSum = (sum) => {
	return sum.reduce((acc, prev) => {
		console.log({ acc, prev });
		return acc + prev.amount;
	}, 0);
};

// li.remove();