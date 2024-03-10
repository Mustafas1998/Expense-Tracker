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
        this.balance.innerHTML = +this.budget.innerHTML.toString() - +expense;
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
            expenseMoney += +item.amount;
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
    showexpenseItem(expenseList) {
        const expense_list = document.getElementById("expense-list");
        expense_list.innerHTML = "";
        const getcurrency = document.getElementById("currency");
        if (expenseList && expenseList.length > 0) {
          for (const expenseItem of expenseList) {
            const ItemRow = document.createElement("tr");
            ItemRow.innerHTML = `
          <td>${expenseItem.title}</td>
          <td><span id="">${getcurrency.value}</span> ${expenseItem.amount}</td>        
          <td><button class="del-btn">&times;</button></td>
          `;
            const delBtn = ItemRow.querySelector(".del-btn");
            delBtn.addEventListener(
              "click",
              this.deleteItem.bind(this, expenseItem.id)
            );
            expense_list.append(ItemRow);
          }
        }
      }
}   


class main{
    static init(){
        this.Addyourbudget();
        this.addyourItem();
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
            if(getBudgetAmount.value.trim() === "" || +getBudgetAmount.value <1 || !+getBudgetAmount.value )
            {
                getBudgetAmount.value=""
                return;
            }
            else if(getcurrency.value.trim() ==="")
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
        const expenseList = []
        const add_expense_btn = document.getElementById("add-expense-btn");
        const budgetAmount = document.getElementById("budget-amount");
        const balance = document.getElementById("balance-amount");
        let expenseTitle = document.getElementById("expense-title");
        let expenseAmount = document.getElementById("expense-amount");

        add_expense_btn.addEventListener("click", ()=>{
            if (expenseTitle.value.trim() === "" || !+expenseAmount.value || +expenseAmount.value.trim() === "" || +expenseAmount.value < 1)
            {
                expenseTitle.value = "";
                expenseAmount.value = "";
                return;
                
            }else if (+expenseAmount.value > +budgetAmount.innerHTML.toString()) {
                alert("Budget Exceeded!");
                return;
            }else if (+expenseAmount.value > +balance.innerHTML.toString()) {
                alert("Not enough money!");
                return;
            }
            const newexpenseItem = {
                id: Math.random().toString(),
                title: expenseTitle.value,
                amount: +expenseAmount.value,
              };
            expenseTitle.value = "";
            expenseAmount.value = "";
            expenseList.push(newexpenseItem);
            new item(expenseList);
    });
    }
}
main.init();









