window.Telegram.WebApp.ready();
window.Telegram.WebApp.expand();
window.Telegram.WebApp.disableVerticalSwipes();

window.addEventListener('load', () => {
    //resetGame();
    loadData();
    setInterval(rechargeEnergy, rechargeInterval);

});


// Save data before the app closes
window.addEventListener('beforeunload', () => {
    saveData();
});

// Save data when the app becomes hidden (minimized or switched tab)
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        saveData();
    }
});

function ensureDocumentIsScrollable() {
    const isScrollable =
      document.documentElement.scrollHeight > window.innerHeight;
   
    if (!isScrollable) {
      document.documentElement.style.setProperty(
        "height",
        "calc(100vh + 1px)",
        "important"
      );
    }
  }
  function preventCollapse() {
    if (window.scrollY === 0) {
      window.scrollTo(0, 1);
    }
  }

  const scrollableElement = document.querySelector(".shop-container");
  scrollableElement.addEventListener("touchstart", preventCollapse);

  window.addEventListener("load", ensureDocumentIsScrollable);

//#region Reset Game
function resetGame() {
    coins = 0;
    energy = 1000; // Reset energy to starting value
    level = 1; // Reset level to starting value
    coinsPerClick = 1; // Reset coins per click

    // Clear saved data from local storage
    localStorage.removeItem('avatar_coins');
    localStorage.removeItem('avatar_energy');
    localStorage.removeItem('avatar_lastupdate');
    localStorage.removeItem('avatar_base_income');
    localStorage.removeItem('avatar_inventory');
    localStorage.removeItem('last_item_id');
 
    // Update the UI
    document.getElementById('coins').innerText = coins;
    updateEnergyBar();
}
//#endregion
