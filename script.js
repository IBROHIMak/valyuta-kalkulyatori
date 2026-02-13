let currentRate = 12700;
let previousRate = 12700;

const amountInput = document.getElementById('amount');
const calculateBtn = document.getElementById('calculateBtn');
const resultDiv = document.getElementById('result');
const currentRateSpan = document.getElementById('currentRate');
const rateChangeSpan = document.getElementById('rateChange');
const coinsContainer = document.getElementById('coinsContainer');

// Banklar kurslari (o'rtacha)
const bankRates = [12650, 12680, 12700, 12720, 12750];

// Hisoblash funksiyasi
function calculate() {
    const amount = parseFloat(amountInput.value);
    const direction = document.querySelector('input[name="direction"]:checked').value;
    
    if (!amount || amount <= 0) {
        showResult('Iltimos, to\'g\'ri miqdor kiriting!');
        return;
    }
    
    let result;
    let resultText;
    
    if (direction === 'usd-to-uzs') {
        result = amount * currentRate;
        resultText = `${amount.toFixed(2)} $ = ${result.toLocaleString('uz-UZ', {maximumFractionDigits: 0})} so'm`;
    } else {
        result = amount / currentRate;
        resultText = `${amount.toLocaleString('uz-UZ', {maximumFractionDigits: 0})} so'm = ${result.toFixed(2)} $`;
    }
    
    showResult(resultText);
    createCoinAnimation();
}

// Natijani ko'rsatish
function showResult(text) {
    resultDiv.innerHTML = `<div class="result-text">${text}</div>`;
}

// Kurs o'zgarishini ko'rsatish
function updateRateChange() {
    const change = ((currentRate - previousRate) / previousRate) * 100;
    const changeText = change >= 0 ? `+${change.toFixed(2)}%` : `${change.toFixed(2)}%`;
    
    rateChangeSpan.textContent = changeText;
    rateChangeSpan.className = 'rate-change ' + (change >= 0 ? 'positive' : 'negative');
}

// Tanga animatsiyasi
function createCoinAnimation() {
    const coins = ['💰', '💵', '💴', '💶', '💷', '🪙'];
    const numberOfCoins = 12;
    
    for (let i = 0; i < numberOfCoins; i++) {
        setTimeout(() => {
            const coin = document.createElement('div');
            coin.className = 'coin';
            coin.textContent = coins[Math.floor(Math.random() * coins.length)];
            coin.style.left = Math.random() * 100 + '%';
            coin.style.animationDuration = (Math.random() * 2 + 3) + 's';
            
            coinsContainer.appendChild(coin);
            
            setTimeout(() => {
                coin.remove();
            }, 5000);
        }, i * 80);
    }
}

// Avtomatik kurs o'zgarishi
function updateRate() {
    previousRate = currentRate;
    currentRate = bankRates[Math.floor(Math.random() * bankRates.length)];
    
    currentRateSpan.textContent = currentRate.toLocaleString('uz-UZ');
    updateRateChange();
}

// Event listeners
calculateBtn.addEventListener('click', calculate);

amountInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        calculate();
    }
});

// Har 6 sekundda kurs o'zgaradi
setInterval(updateRate, 6000);

// Dastlabki animatsiya
setTimeout(() => {
    createCoinAnimation();
}, 500);
