document.getElementById("log-out").addEventListener("click",()=>{
    document.getElementById('form-section').style.display = "flex";
    document.getElementById('expense-tracker-container').style.display = "none";
})

let expenses = []; 

document.getElementById("expense-form").addEventListener("submit", function(e) {
    e.preventDefault();

    let expenseName = document.getElementById("expense-name").value;
    let categorySelected = document.getElementById("category").value;
    let amount = document.getElementById("amount").value;

    if(expenseName && categorySelected && amount) {
        if (editingExpenseId !== null) {
            // Update the existing expense
            const expenseIndex = expenses.findIndex(exp => exp.id === editingExpenseId);
            if (expenseIndex > -1) {
                expenses[expenseIndex].description = expenseName;
                expenses[expenseIndex].category = categorySelected;
                expenses[expenseIndex].amount = parseFloat(amount);
            }
            editingExpenseId = null;
        } else {
            // Add a new expense
            expenseList(expenseName, categorySelected, amount);
        }
        this.reset(); // Resetting the form fields
        displayExpenses();
        generateExpenseChart();

    } else {
        alert("Please enter all required fields.");
    }
});

document.getElementById("filter-category").addEventListener("change",(e)=>{
    const selectedCategory = e.target.value;
    filterExpenses(selectedCategory);
});

let budgets = {}; // This object will hold the budgets for each category

document.getElementById("budget-form").addEventListener("submit", function(e) {
    e.preventDefault();

    let category = document.getElementById("budget-category").value;
    let budgetAmount = parseFloat(document.getElementById("budget-amount").value);

    if (budgetAmount > 0) {
        budgets[category] = budgetAmount; // Set the budget for the selected category
        alert(`Budget of ₹${budgetAmount} set for ${category} category.`);
        this.reset();
    } else {
        alert("Please enter a valid budget amount.");
    }
});

function expenseList(description, category, amount) {
    const expense = {
        id: Date.now(),
        description,
        amount: parseFloat(amount),
        category,
        date: new Date().toLocaleDateString()
    };

    expenses.push(expense); // Add the new expense to the array
    checkBudget(category); // Check the budget for the category
    displayExpenses(); // Display all expenses
    generateExpenseChart();
}

function checkBudget(category) {
    const totalSpent = expenses
        .filter(expense => expense.category === category)
        .reduce((sum, expense) => sum + expense.amount, 0);

    if (budgets[category] && totalSpent > budgets[category]) {
        alert(`Warning: You have exceeded the budget for ${category} category!`);
    } else if (budgets[category] && totalSpent > 0.8 * budgets[category]) {
        alert(`Heads up! You have spent 80% of your budget for ${category} category.`);
    }
}

function displayExpenses(){
    filterExpenses(document.getElementById("filter-category").value);
}

function filterExpenses(category){
    const filteredExpenses = expenses.filter(expense => 
        category === "all" || expense.category === category
    );
    displayFilteredExpenses(filteredExpenses);
}

function displayFilteredExpenses(filteredExpenses){
    document.getElementById("expense-list").innerHTML = "";
    filteredExpenses.forEach(expense => {
        let expenseTable = document.createElement("div");

        expenseTable.innerHTML = `
            <div class="expense-card">
                <div><span class="expense-name">${expense.description}</span>:<span class="expense-amount">₹${expense.amount}</span>(<span class="category-selected">${expense.category}</span>)</div>
                <div>
                    <button onclick="editCard(this)">Edit</button>
                    <button onclick="deleteCard(this)">Delete</button>
                </div>
            </div>
        `;

        document.getElementById("expense-list").appendChild(expenseTable);
    });
}

// Edit and Delete functions for future implementation
let editingExpenseId = null;

function editCard(button) {
    const expenseCard = button.closest(".expense-card");

    const expenseName = expenseCard.querySelector(".expense-name").innerText;
    const category = expenseCard.querySelector(".category-selected").innerText;
    const amount = expenseCard.querySelector(".expense-amount").innerText;

    document.getElementById("expense-name").value = expenseName;
    document.getElementById("category").value = category;
    document.getElementById("amount").value = amount.replace(/[^0-9.]/g, '');

    const expense = expenses.find(expense => 
        expense.description === expenseName && expense.category === category && expense.amount === parseFloat(amount.replace(/[^0-9.]/g, ''))
    );

    if (expense) {
        editingExpenseId = expense.id;
    }
}

function deleteCard(button) {
    
        if (confirm("Are you sure you want to delete this expense?")) {
            const expenseCard = button.closest(".expense-card");

            const expenseName = expenseCard.querySelector(".expense-name").innerText;
            const category = expenseCard.querySelector(".category-selected").innerText;
            const amount = expenseCard.querySelector(".expense-amount").innerText;
        
            expenses = expenses.filter(expense => 
                !(expense.description === expenseName && expense.category === category && expense.amount === parseFloat(amount.replace(/[^0-9.]/g, '')))
            );
            
            expenseCard.remove();
            displayExpenses();
            generateExpenseChart();
        }
     
     
    
}

let expenseChart; // Declare globally at the top

function generateExpenseChart() {
    const ctx = document.getElementById("expense-chart").getContext('2d');

    if (expenseChart) {
        expenseChart.destroy(); // Destroy the old chart before creating a new one
    }

    const expenseData = expenses.reduce((acc, expense) => {
        acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
        return acc;
    }, {});

    const data = {
        labels: Object.keys(expenseData),
        datasets: [{
            label: 'Expenses by Category',
            data: Object.values(expenseData),
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'],
            borderWidth: 1
        }]
    };

    expenseChart = new Chart(ctx, {
        type: 'pie',
        data: data,
        options: {
            responsive: false,  // Disable responsive resizing
            maintainAspectRatio: false,  // Allow custom width and height
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Expenses by Category'
                }
            }
        }
    });
}
document.getElementById("delete-all").addEventListener("click",()=>{
    if (confirm("Are you sure you want to delete all expenses?")) {
        expenses = [];
        displayExpenses();
        generateExpenseChart();
    }
});

