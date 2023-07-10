import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

const INCOME = 'INCOME';
const EXPENSE = 'EXPENSE';
const incomeForm = document.querySelector('#incomeForm');
const incomeValue = document.querySelector('#incomeValue');
const expenseForm = document.querySelector('#expenseForm');
const incomeTitle = document.querySelector('#incomeTitle');
const expenseTitle = document.querySelector('#expenseTitle');
const expenseValue = document.querySelector('#expenseValue');
const incomesValue = document.querySelector('#incomesValue');
const expensesValue = document.querySelector('#expensesValue');
const sum = document.querySelector('#sum');

let incomeSum = [];
let expenseSum = [];

incomeForm.addEventListener('submit', (event) => {
	event.preventDefault();
	addButtonContainer(incomeTitle.value, incomeValue.value, '#incomesList', INCOME);
	incomeTitle.value = '';
	incomeValue.value = '';
});

expenseForm.addEventListener('submit', (event) => {
	event.preventDefault();
	addButtonContainer(expenseTitle.value, expenseValue.value, '#expensesList', EXPENSE);
	expenseTitle.value = '';
	expenseValue.value = '';
});

const addButtonContainer = (title, amount, containerId, mode) => {
	if (amount <= 0) {
		alert('akceptujemy tylko wartości dodatnie');
		return;
	}
	const container = document.querySelector(containerId);
	const li = document.createElement('li');
	li.id = uuidv4();
	li.classList.add('dynamic-item');

	const spanTitle = document.createElement('span');
	spanTitle.textContent = title;
	li.appendChild(spanTitle);
	const spanAmount = document.createElement('span');
	spanAmount.textContent = amount;
	li.appendChild(spanAmount);

	li.style.listStyle = 'none';
	const editButton = document.createElement('button');
	editButton.textContent = 'Edit';
	li.appendChild(editButton);
	const saveButton = document.createElement('button');
	saveButton.textContent = 'Save';
	saveButton.hidden = true;
	li.appendChild(saveButton);
	const deleteButton = document.createElement('button');
	deleteButton.textContent = 'Delete';
	deleteButton.addEventListener('click', () => {
		if (mode === INCOME) {
			incomeSum = removeData(incomeSum, li, incomesValue);
		} else {
			expenseSum = removeData(expenseSum, li, expensesValue);
		}
		calculateAllSum();
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

	editButton.addEventListener('click', () => {
		spanAmount.setAttribute('contenteditable', true);
		spanTitle.setAttribute('contenteditable', true);
		saveButton.hidden = false;
		editButton.hidden = true;
	});
	saveButton.addEventListener('click', () => {
		spanAmount.setAttribute('contenteditable', false);
		spanTitle.setAttribute('contenteditable', false);
		saveButton.hidden = true;
		editButton.hidden = false;
	});
	spanAmount.addEventListener('input', (e) => {
		if (Number(e.target.innerText) <= 0) {
			alert('akceptujemy tylko wartości dodatnie, podaj wartość dodatnią');
			return;
		}
		if (mode === INCOME) {
			incomeSum = editData(incomeSum, li, incomesValue, e);
		} else {
			expenseSum = editData(expenseSum, li, expensesValue, e);
		}
		calculateAllSum();
	});
	calculateAllSum();
};

const manageData = (sum, sumValue, item) => {
	sum.push(item);
	sumValue.textContent = calculateSum(sum);
};
const editData = (array, li, sumAllData, e) => {
	const newArray = array.map((item) => {
		if (item.id === li.id) {
			return { ...item, amount: Number(e.target.innerText) };
		} else {
			return item;
		}
	});

	sumAllData.textContent = calculateSum(newArray);
	return newArray;
};

const removeData = (array, li, sum) => {
	li.remove();
	const newArray = [
		...array.filter((item) => {
			if (item.id !== li.id) {
				return item;
			}
		}),
	];

	sum.textContent = calculateSum(newArray);
	return newArray;
};
const calculateSum = (sum) => {
	return sum.reduce((acc, prev) => {
		return acc + prev.amount;
	}, 0);
};

const calculateAllSum = () => {
	const incomesSum = calculateSum(incomeSum);
	const expensesSum = calculateSum(expenseSum);
	const allSum = incomesSum - expensesSum;
	if (allSum === 0) {
		sum.innerText = 'Balance is 0 PLN';
	}
	if (allSum > 0) {
		sum.innerText = `You can stil spend ${allSum}PLN`;
	} else sum.innerText = `You spent too much ${allSum} PLN`;
};
