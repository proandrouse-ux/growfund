
const investmentAmountInput = document.getElementById('investment-amount');
const monthlyRateInput = document.getElementById('monthly-rate');
const investmentPeriodInput = document.getElementById('investment-period');
const calculateButton = document.getElementById('calculate-btn'); 
const principalResult = document.getElementById('pricipal-result');
const monthlyEarningResult = document.getElementById('monthly-earnings-result');
const totalEarningsResult = document.getElementById('total-earning-result');
const maturityValueResult = document.getElementById('maturity-value-result');


calculateButton.addEventListener("click",() => {
    const investmentAmount = Number(investmentAmountInput.value);
    const monthlyRate = Number(monthlyRateInput.value);
    const investmentPeriod = Number(investmentPeriodInput.value);

    const rate = monthlyRate / 100;
    const monthlyEarnings = investmentAmount * rate;
    const totalEarnings = monthlyEarnings * investmentPeriod;
    const maturityValue = investmentAmount + totalEarnings;

    principalResult.textContent = investmentAmount;
    monthlyEarningResult.textContent = monthlyEarnings;
    totalEarningsResult.textContent = totalEarnings;
    maturityValueResult.textContent = maturityValue;
})