function calculateEmi(price, months, interestRate) {

  const interest = interestRate / 100;

  const total = price + price * interest;

  return Math.round(total / months);

}

module.exports = calculateEmi;