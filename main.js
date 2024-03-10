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


class item{
    itemlist = []
    constructor(list){
        this.itemlist = list;
        this.updateBalances();
        this.showexpenseItem(this.itemlist) 
    }

    updateBalances(){
        let expenseMoney = 0;
        for(const item of this.itemlist){
            expenseMoney += item.amount;
        }
        const balanceObject = new Processing();
        balanceObject.updateBalance(expenseMoney);
    }
    deleteItem(expenseID){
        let index = 0;
        const balanceObject = new Processing();
        for(const item of this.itemlist){
            if(item.id == expenseID){
                balanceObject.deleteExpense(item.amount);
                break;
            }
            index++;
        }
        this.itemlist.splice(index, 1);
        this.showexpenseItem(this.itemlist);
    }
    showexpenseItem(){
        
    }
}   












