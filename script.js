
const investmentAmountInput = document.getElementById('investment-amount');
const monthlyRateInput = document.getElementById('monthly-rate');
const investmentPeriodInput = document.getElementById('investment-period');
const calculateButton = document.getElementById('calculate-btn'); 
const principalResult = document.getElementById('pricipal-result');
const monthlyEarningResult = document.getElementById('monthly-earnings-result');
const totalEarningsResult = document.getElementById('total-earning-result');
const maturityValueResult = document.getElementById('maturity-value-result');
const errorMessage = document.getElementById('error-message');


calculateButton.addEventListener("click",() => {
    const investmentAmount = Number(investmentAmountInput.value);
    const monthlyRate = Number(monthlyRateInput.value);
    const investmentPeriod = Number(investmentPeriodInput.value);

    if(investmentAmount <= 0){
        errorMessage.textContent = "Please enter a valid investment amount.";
        console.log('validation is working');
        
        return;
    }

    errorMessage.textContent =""

    const rate = monthlyRate / 100;
    const monthlyEarnings = investmentAmount * rate;
    const totalEarnings = monthlyEarnings * investmentPeriod;
    const maturityValue = investmentAmount + totalEarnings;

    principalResult.textContent = investmentAmount.toLocaleString(undefined,{
        minimumFractionDigits:2,
        maximumFractionDigits: 2
    });
    monthlyEarningResult.textContent = monthlyEarnings.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
    totalEarningsResult.textContent = totalEarnings.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
    maturityValueResult.textContent = maturityValue.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
})