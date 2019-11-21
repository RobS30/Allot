var Mortgage = require("./mortgage");

// var amount = 30000;
// var interest = 0.06;
// var years = 10;
var afterMonths = 6;

export function amort (amount, interest, years) {
  var mortgage = new Mortgage(amount, interest, years);
  var payment = mortgage.fixedMonthlyPayment();
  var remaining = mortgage.remainingLoanBalance(afterMonths);
  var amortTable = mortgage.amortizationTable();
  var amortList = amortTable.map(function(row, i) {
    return [i, row[4]];
  });
  console.log("Fixed monthly payments: " + payment);
  console.log(
    "Remaining balance after " + afterMonths + " months: " + remaining
  );
  let temp = [['Month', 'Balance']];
  amortList.forEach(Element => {
    temp.push(Element)
  })
  console.log("Amortization table:");
  
  return temp;
}


//amort(26000, 0.055, 6);
