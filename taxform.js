document.getElementById("tax-form").addEventListener("submit", (e) => {
    e.preventDefault();
    console.log(expenses);
    
    
    const income = parseFloat(document.getElementById("income").value);
    if (isNaN(income) || income < 0) {
        alert("Please enter a valid positive income.");
        return;
    }

    if (expenses.length === 0) {
        alert("Please add at least one expense.");
        return;
    }
    const expense = expenses.reduce((sum,exp)=>{
        sum=sum+ exp.amount;
        return sum;
    },0)
    console.log(expense);
    

    const taxableAmount = totalTaxableAmount(income, expense);
    const estimatedTax = totalEstimatedTax(taxableAmount);

    document.getElementById("tax-result").innerHTML = `
        <p>Your total taxable income is: ₹${taxableAmount.toFixed(2)}</p>
        <p>Your estimated tax value is: ₹${estimatedTax.toFixed(2)}</p>
    `;

    displayCreditsAndDeductions(income, taxableAmount);
});

function totalTaxableAmount(income, expense) {
    const standardDeduction = 50000;  
    return Math.max(0, income - expense - standardDeduction);
}

function totalEstimatedTax(taxableAmount) {
    if (taxableAmount <= 250000) {
        return 0;
    } else if (taxableAmount <= 500000) {
        return taxableAmount * 0.05;
    } else if (taxableAmount <= 1000000) {
        return 25000 + (taxableAmount - 500000) * 0.2;
    } else {
        return 125000 + (taxableAmount - 1000000) * 0.3;
    }
}

function displayCreditsAndDeductions(income, taxableAmount) {
    const credits = [];
    const deductions = [];

    
    if (taxableAmount <= 500000) {
        credits.push("Rebate under section 87A for income up to ₹5,00,000.");
    }
    if (income > 300000) {
        deductions.push("Consider investing in 80C instruments for up to ₹1,50,000 deduction.");
    }

    let guideHtml = `<h3>Deductions and Credits</h3>`;
    guideHtml += `<p>${deductions.length > 0 ? 'Deductions:' : ''}</p>`;
    guideHtml += `<ul>`;
    deductions.forEach((deduction) => {
        guideHtml += `<li>${deduction}</li>`;
    });
    guideHtml += `</ul>`;
    
    guideHtml += `<p>${credits.length > 0 ? 'Credits:' : ''}</p>`;
    guideHtml += `<ul>`;
    credits.forEach((credit) => {
        guideHtml += `<li>${credit}</li>`;
    });
    guideHtml += `</ul>`;

    document.getElementById("tax-result").innerHTML += guideHtml;
}

