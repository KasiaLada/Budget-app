const form = document.querySelector("#incomeForm");

form.addEventListener("submit", (event) => {
	event.preventDefault();
    const incomeTitle = document.querySelector("#incomeTitle");
	addButtonContainer(incomeTitle.value, "#incomesList");
});
const addButtonContainer = (value, containerId) => {
	const container = document.querySelector(containerId);
	const li = document.createElement("li");
	li.textContent = value;
	container.appendChild(li);
};
