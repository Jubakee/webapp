let coins = 0;
let coinsPerClick = 1; // Coins earned per click
let energy = 1000; // Starting energy value
const maxEnergy = 1000; // Maximum energy value
const energyRechargeRate = 1; // Energy recharge rate
const rechargeInterval = 1000; // Recharge every 3 seconds
let lastUpdateTime = Date.now(); // Track last update time

const feedbackQueue = [];

// let level = 1; // Starting level
// const levelUpThreshold = 1000000000000000000; // Coins needed to level up

function formatNumber(number) {
    if (number >= 1e12) {
        return (number / 1e12).toFixed(2) + 'T';
    } else if (number >= 1e9) {
        return (number / 1e9).toFixed(2) + 'B';
    } else if (number >= 1e6) {
        return (number / 1e6).toFixed(2) + 'M';
    } else if (number >= 1e5) {
        return (number / 1e3).toFixed(0) + 'K';
    } else {
        return number.toLocaleString();
    }
}

function saveData() {
    localStorage.setItem('avatar_coins', coins);
    localStorage.setItem('avatar_energy', energy);
    localStorage.setItem('avatar_lastupdate', Date.now());
}

function loadData() {
    const savedCoins = localStorage.getItem('avatar_coins');
    if (savedCoins !== null) {
        coins = parseInt(savedCoins, 10);
        
        document.getElementById('coins').innerText = formatNumber(coins);
    }

    const savedEnergy = localStorage.getItem('avatar_energy');
    const savedLastUpdate = localStorage.getItem('avatar_lastupdate');

    if (savedEnergy) {
        energy = Math.min(parseInt(savedEnergy, 10), maxEnergy); // Cap energy at max
    }

    if (savedLastUpdate) {
        lastUpdateTime = parseInt(savedLastUpdate, 10);
        const elapsedTime = Date.now() - lastUpdateTime;

        const elapsedTimeInMilliseconds = Date.now() - lastUpdateTime;
        const elapsedTimeInSeconds = elapsedTimeInMilliseconds / 1000;
        const roundedElapsedTimeInSeconds = Math.round(elapsedTimeInSeconds);
        
        // console.log(`Elapsed time: ${roundedElapsedTimeInSeconds} seconds.`);
        
        coins = coins + roundedElapsedTimeInSeconds;
        showAccumulatedCoinsPopup(roundedElapsedTimeInSeconds)
        energy += Math.floor(elapsedTime / rechargeInterval) * energyRechargeRate;
        energy = Math.min(energy, maxEnergy); // Cap energy at max
        lastUpdateTime = Date.now() - (elapsedTime % rechargeInterval); // Adjust lastUpdateTime correctly
    }

    updateEnergyBar();
}

function showAccumulatedCoinsPopup(accumulatedCoins) {
    const popup = document.createElement('div');
    popup.className = 'popup';
    popup.innerText = `You earned ${formatNumber(accumulatedCoins)} coins while you were away!`;
    document.body.appendChild(popup);

    // Style the popup
    popup.style.position = 'fixed';
    popup.style.top = '50%';
    popup.style.left = '50%';
    popup.style.transform = 'translate(-50%, -50%)';
    popup.style.backgroundColor = '#fff';
    popup.style.padding = '20px';
    popup.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.5)';
    popup.style.zIndex = '1000';

    // Remove the popup after a few seconds
    setTimeout(() => {
        popup.remove();
    }, 2000);
}
