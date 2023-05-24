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
const expensesValue = document.querySelector("#expensesValue");
// const remove = document.querySelector("li" / "containerId");

let incomeSum = [];
let expenseSum = [];

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
	deleteButton.addEventListener("click", () => {
		if (mode === INCOME) {
			removeData(incomeSum, li, incomesValue);
		} else {
			removeData(expenseSum, li, expensesValue);
		}
	});
	li.appendChild(deleteButton);
	container.appendChild(li);
	const item = {
		id: li.id,
		title: title,
		amount: Number(amount),
	};
	if (mode === INCOME) {
		manageData(incomeSum, incomesValue, item);
	} else {
		manageData(expenseSum, expensesValue, item);
	}
};
const manageData = (sum, sumValue, item) => {
	sum.push(item);
	sumValue.textContent = calculateSum(sum);
};

const removeData = (array, li, sum) => {
	li.remove();
	const newArray = [...array.filter(item => {
		if (item.id !== li.id) {
			return item;
		}
	})];
	console.log(newArray);
	array = [...newArray];
	sum.textContent = calculateSum(newArray);
};
const calculateSum = sum => {
	return sum.reduce((acc, prev) => {
		return acc + prev.amount;
	}, 0);
};
// const removeButton = incomeSum.filter((el) => {

// })
// // li.remove();
