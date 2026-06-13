let score = 0;
let clickPower = 1;

let upgrade1Cost = 10;
const upgrade1Power = 2;

let upgrade2Cost = 50;
const upgrade2Power = 5;


let currentPrice = 1.00;
let priceHistory = [1.00, 1.02, 0.98, 1.05, 1.01]; 
let timeLabels = ["1m ago", "45s ago", "30s ago", "15s ago", "Now"];


const scoreDisplay = document.getElementById('score');
const priceDisplay = document.getElementById('clc-price');
const clickerBtn = document.getElementById('clicker-btn');
const upgrade1Btn = document.getElementById('upgrade-1-btn');
const upgrade1CostDisplay = document.getElementById('upgrade-1-cost');
const upgrade2Btn = document.getElementById('upgrade-2-btn');
const upgrade2CostDisplay = document.getElementById('upgrade-2-cost');


const ctx = document.getElementById('cryptoChart').getContext('2d');
const cryptoChart = new Chart(ctx, {
type: 'line',
data: {
labels: timeLabels,
datasets: [{
label: 'CLC to USD',
data: priceHistory,
borderColor: '#00ff88',
borderWidth: 2,
pointRadius: 0, 
fill: false,
tension: 0.3 
}]
},
options: {
responsive: true,
maintainAspectRatio: false,
scales: {
x: { display: false }, 
y: { grid: { color: '#2e394d' }, ticks: { color: '#8fa0bc' } }
},
plugins: { legend: { display: false } }
}
});


function addNewPricePoint(newPrice) {
currentPrice = Math.max(0.01, parseFloat(newPrice.toFixed(2))); 
priceDisplay.textContent = currentPrice.toFixed(2);


cryptoChart.data.datasets[0].data.push(currentPrice);
cryptoChart.data.labels.push("Now");

if (cryptoChart.data.datasets[0].data.length > 10) {
cryptoChart.data.datasets[0].data.shift();
cryptoChart.data.labels.shift();
}

let lastPrice = cryptoChart.data.datasets[0].data[cryptoChart.data.datasets[0].data.length - 2];
cryptoChart.data.datasets[0].borderColor = currentPrice >= lastPrice ? '#00ff88' : '#ff4a4a';

cryptoChart.update();
}


setInterval(() => {

let change = (Math.random() - 0.5) * 0.1;
addNewPricePoint(currentPrice + change);
}, 3000); 


function updateDisplay() {
scoreDisplay.textContent = score;
upgrade1CostDisplay.textContent = upgrade1Cost;
upgrade2CostDisplay.textContent = upgrade2Cost;
}


clickerBtn.addEventListener('click', function() {
score += clickPower;
updateDisplay();
});


upgrade1Btn.addEventListener('click', function() {
if (score >= upgrade1Cost) {
score -= upgrade1Cost;
clickPower += upgrade1Power;
upgrade1Cost = Math.round(upgrade1Cost * 1.5);
updateDisplay();

addNewPricePoint(currentPrice + 0.20);
} else {
alert("Not enough ClickerCoin!");
}
});


upgrade2Btn.addEventListener('click', function() {
if (score >= upgrade2Cost) {
score -= upgrade2Cost;
clickPower += upgrade2Power;
upgrade2Cost = Math.round(upgrade2Cost * 1.5);
updateDisplay();

addNewPricePoint(currentPrice + 0.60);
} else {
alert("Not enough ClickerCoin!");
}
});