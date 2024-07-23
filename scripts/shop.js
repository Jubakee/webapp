document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.buy-button').forEach(button => {
        button.addEventListener('click', (event) => {
            const itemElement = event.target.closest('.shop-item');
            const itemName = itemElement.querySelector('.item-name').textContent;
            const itemPrice = parseInt(itemElement.querySelector('.price').textContent, 10);

            // Implement your purchasing logic here
            console.log(`Purchasing ${itemName} for ${itemPrice} coins`);
        });
    });
});
