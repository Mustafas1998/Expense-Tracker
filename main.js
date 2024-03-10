class Processing{
    constructor(){
        this.budget = document.getElementById("budget-amount");
        this.expenses = document.getElementById("expenses-amount");
        this.balance = document.getElementById("balance-amount");
    }
    updateBudget(budget, expense){
        this.budget.innerHTML = budget;
        this.expenses.innerHTML = expense;
        this.balance.innerHTML = budget;
    }

    updateBalance(expense){
        this.expenses.innerHTML = expense;
        this.balance.innerHTML = this.budget.innerHTML.toString() -+expense;
    }

    deleteExpense(deleteExpense){
        const expense = (this.expenses.innerHTML = +this.expenses.innerHTML.toString() -+deleteExpense);
        this.updateBalance(expense);
    }
}















