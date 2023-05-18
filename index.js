function addExpense() {
    let amountInput = document.getElementById("amount");
    let typeSelect = document.getElementById("spendDetail");
    let categorySelect = document.getElementById("category");

    let amount = amountInput.value;
    let type = typeSelect.value;
    let category = categorySelect.value;

    // if no feild is fill then return this alert
    if (!amount || !type || !category) {
        alert("Please enter all the details!");
        return;
    }
    //creating basic object format to store data
    let expense = {
        amount,
        type,
        category,
        date: new Date()
    };
    amountInput.value = "";
    type.value = "";
    categorySelect.selectedIndex = 0;

    //either empty array or storing data in array (object in array)
    let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
    expenses.push(expense);
    localStorage.setItem("expenses", JSON.stringify(expenses));

   
    displayExpenses();
}

//display list of expenses
function displayExpenses() {

    let expenseList = document.getElementById("expense-list");
    let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

    expenseList.innerHTML = "";

    expenses.forEach((expense, index) => {

        let li = document.createElement("li");

        let deleteBtn = document.createElement("button");
        deleteBtn.innerHTML = "Delete";
        deleteBtn.classList.add("delete-btn");
        deleteBtn.addEventListener("click", () => deleteExpense(index));

        let editBtn = document.createElement("button");
        editBtn.innerHTML = "Edit";
        editBtn.classList.add("edit-btn");
        editBtn.addEventListener("click", () => editExpense(index));

        //making bundle of items required to show
        li.innerHTML = expense.amount +"      " + expense.category + "      " + expense.type;
        li.appendChild(editBtn);
        li.appendChild(deleteBtn);

        //budle hit the UI
        expenseList.appendChild(li);
    });
}
function deleteExpense(index) {
    let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

    expenses.splice(index, 1);

    localStorage.setItem("expenses", JSON.stringify(expenses));

    displayExpenses();
}

function editExpense(index) {
    let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
    const expense = expenses[index];

    const amountInput = document.getElementById("amount");
    const typeSelect = document.getElementById("type");
    const categorySelect = document.getElementById("category");

    amountInput.value = expense.amount;
    spendDetail.value = expense.type;
    categorySelect.value = expense.category;

    expenses.splice(index, 1);

    localStorage.setItem("expenses", JSON.stringify(expenses));

    displayExpenses();
}

displayExpenses();