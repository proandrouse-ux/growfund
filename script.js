
const investmentAmountInput = document.getElementById('investment-amount');
const monthlyRateInput = document.getElementById('monthly-rate');
const investmentPeriodInput = document.getElementById('investment-period');
const calculateButton = document.getElementById('calculate-btn'); 
const principalResult = document.getElementById('pricipal-result');
const monthlyEarningResult = document.getElementById('monthly-earnings-result');
const totalEarningsResult = document.getElementById('total-earning-result');
const maturityValueResult = document.getElementById('maturity-value-result');
const errorMessage = document.getElementById('error-message');
const historyList = document.getElementById('investment-history-list');
const emptyHistory =document.getElementById('empty-history');
const historyTotalInvested = document.getElementById('history-total-invested');
const historyTotalReturns = document.getElementById('history-total-returns');

let investments = [];


calculateButton.addEventListener("click",() => {
    const investmentAmount = Number(investmentAmountInput.value);
    const monthlyRate = Number(monthlyRateInput.value);
    const investmentPeriod = Number(investmentPeriodInput.value);

    if(!validateInput()){
        restResults();
        return;
    }

    if(investmentAmount <= 0){
        errorMessage.textContent = "Please enter a valid investment amount.";
         restResults();
        return;
    }

    if(monthlyRate < 0){
        errorMessage.textContent = "Please enter a valid monthly rate.";
         restResults();  
        return;
    }

    if(investmentPeriod <= 0){
        errorMessage.textContent = "Please enter a valid investment period" 
         restResults();
        return;
    }

    function restResults(){
        principalResult.textContent = "0.00"
        monthlyEarningResult.textContent = "0.00"
        totalEarningsResult.textContent = "0.00"
        maturityValueResult.textContent = "0.00"
    }

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

    saveInvestment(
        investmentAmount,
        monthlyRate,
        investmentPeriod,
        maturityValue
    )
})

function saveInvestment(amount, rate, period, maturityValue){
    const investment = {
        amount: amount,
        rate: rate,
        period: period,
        maturityValue: maturityValue
    };

    investments.push(investment);
    renderInvestmentHistory();
    console.log(investments);
    
}

function validateInput(){
        if(Number(investmentAmountInput.value) <= 1000 ) {
            
            errorMessage.textContent = "Please enter a valid investment amount." 
            return false;
        }

        if (Number(monthlyRateInput.value) < 0 ) {
            errorMessage.textContent = "Please enter a valid monthly rate."
            return false;
        }

        if (Number(investmentPeriodInput.value) <= 0 ) {
            errorMessage.textContent = "Please enter a valid investment period";
            return false;
        }
        errorMessage.textContent = "";
    return true;
}

investmentAmountInput.addEventListener("input", () => {
    
    if (errorMessage.textContent !== "") {
        validateInput();
    }
})

function renderInvestmentHistory(){
    // clear the previous history
    historyList.replaceChildren();

    // show empty message if there are no investment
    emptyHistory.hidden = investments.length > 0;

    // calculate the summary total
    let totalInvested = 0;
    let totalReturns = 0;

    investments.forEach((investment, index) => {
        totalInvested += investment.amount;

        const profit = investment.maturityValue - investment.amount;
        totalReturns += profit;

        // create a card for each investment
        const investmentCard = document.createElement('div');
        investmentCard.classList.add("investment-card");

        investmentCard.textContent = `Amount: ${investment.amount.toLocaleString()} RWF | `+ 
        `Rate: ${investment.rate}% | `+
        `Period: ${investment.period} months | `+
        `Maturity: ${investment.maturityValue.toLocaleString()} RWF`;

        // button to delete each investment history separately
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";

        deleteButton.addEventListener('click', () => {
            deleteInvestment(index);
        })

        investmentCard.appendChild(deleteButton);
        historyList.appendChild(investmentCard)
    });

    // Update summary
    historyTotalInvested.textContent = totalInvested.toLocaleString();
    historyTotalReturns.textContent = totalReturns.toLocaleString();
}

function deleteInvestment(index) {
    investments.splice(index, 1);

    renderInvestmentHistory();
    console.log(investments);
    
}