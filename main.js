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
    showexpenseItem(expenseList){
        const expense_list = document.getElementById("expense-list");
        expense_list.innerHTML = "";
        const currency = document.getElementById("currency");
        if (expenseList && expenseList.lenght > 0){
            for(const item of expenseList){
                const ItemRow = document.createElement("tr");
                ItemRow.innerHTML=`<td>${item.title}</td>
                <td><span id="">${currency.value}</span> ${item.amount}</td>        
                <td><button class="del-btn">&times;</button></td>
                `;
                const deletbtn = ItemRow.querySelector("del-btn");
                deletbtn.addEventListener("click", this.deleteItem.bind(this, item.id)
                );
                expense_list.append(item)
            }
        }
    }
}   


class main{
    static init(){
        this.enterBudget();
        this.addItem();
        document.getElementById("reset-app-btn").addEventListener("click", ()=>{
            location.reload();
        });
    }
    static Addyourbudget(){
        const add_budget_btn = document.getElementById("add-budget-btn");
        const getBudgetAmount = document.getElementById("budget");
        const getcurrency = document.getElementById("currency");
        const currency = document.querySelectorAll("#currency-symbol");
        add_budget_btn.addEventListener("click", ()=>{
            if(getBudgetAmount.value.trim()=== "" || +getBudgetAmount.value<1 || !+getBudgetAmount.value )
            {
                getBudgetAmount.value=""
                return;
            }
            else if(getcurrency.value.trim ==="")
            {
                return;
            }
            const balanceUpdate = new Processing();
            balanceUpdate.updateBudget(getBudgetAmount.value, 0);
            for (const curr of currency){
                curr.innerHTML = getcurrency.value;
            }
            getBudgetAmount.value = "";
            add_budget_btn.disabled = true;
            document.querySelector(".add-expense-box").classList.add("visible");
        });
    }
    static addyourItem(){
        
    }
}











