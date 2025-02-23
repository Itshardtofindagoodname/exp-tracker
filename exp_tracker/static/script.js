document.addEventListener('DOMContentLoaded', function() {
    // expenses gulo ke fetch korbo page tah refresh hotei prothomei
    fetchExpenses();
    // oi html er expense er table e show korbo
    const form = document.getElementById('expense-form');
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      const description = document.getElementById('description').value; //description field tah call korchi (kiser jonye taka add bah deduct hoyeche)
      const amount = parseFloat(document.getElementById('amount').value); //amount field tah call korchi (koto taka add bah deduct hoyeche)
      const type = document.getElementById('type').value; //type field tah call korchi(taka deduct hoyeche na add hoyeche)
      addExpense({ description, amount, type }); //add korte debo notun data jodi add kore
    });
  });
  
  //expenses fetch korar jonye
  function fetchExpenses() {
    fetch('/expenses') //expenses er endpoint ke call korchi (GET request er jonye)
      .then(response => response.json()) //expense gulo ke akta json e store korbo
      .then(data => { //data tah ke DOM manipulation kore html e show korbo
        const tbody = document.querySelector('#expenses-table tbody'); //expenses table tah ke refer korbo
        tbody.innerHTML = ''; //innerbody tah clear thakbe jodi kono data na thake
        document.getElementById('total-amount').textContent = data.total.toFixed(2); //total amount tah show korbo till 00.00 obdi
        
        data.expenses.forEach(expense => {
          const tr = document.createElement('tr'); // data hisebe row gulo banabo
          const amountClass = expense.type === 'earned' ? 'earned' : 'deducted'; //jodi earned thake then earned dekhabe, nahole deducted html screen e, se hisebe style o render korbo
          const amountText = expense.type === 'earned' ? `+${expense.amount}` : `-${expense.amount}`; // jodi earned hoye then total amount + earned korbo, jodi deducted hoye then total amount - deducted korbo
          tr.innerHTML = `
            <td>${expense.description}</td>
            <td class="${amountClass}">${amountText}</td>
            <td>${expense.type}</td>
          `; //sei amount tai akhane show korbo table e abar, prothome description, tarpore amount tah, then ki type er setah dekhabo
          tbody.appendChild(tr); //diye table e add korbo data tah finally
        });
      })
      .catch(err => console.error(err)); //jodi kono error hoye, seta console e print korbo
  }
  
  //expenser add korar function
  function addExpense(expense) {
    fetch('/expenses', { //expense er endpoint tah call korbo ( POST ) request tah
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(expense) //jetai html theke pacchi seta ke akhane add kore debo json format e
    })
      .then(response => response.json()) //fetch kore dekhbo data pacchi ki na
      .then(data => { //jodi thik thake then fetchExpense er function tah call korbo and add korbo html e amader notun data tah
        fetchExpenses();
        document.getElementById('expense-form').reset();
      })
      .catch(err => console.error(err)); //nahole error log korbo
  }
