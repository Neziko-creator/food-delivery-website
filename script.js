// Корзина — список выбранных блюд
const cart = {};

// Находим элементы страницы
const cartCounter = document.getElementById("cart-count");
const panelCounter = document.getElementById("cart-panel-count");
const cartTotal = document.getElementById("cart-total");
const cartItems = document.getElementById("cart-items");
const cartPanel = document.getElementById("cart-panel");

// Обновление отображения корзины
function updateCart() {

    let count = 0;
    let total = 0;

    cartItems.innerHTML = "";

    for (const name in cart) {

        const item = cart[name];

        count += item.quantity;
        total += item.price * item.quantity;

        cartItems.innerHTML += `
            <div class="cart-item">
                <div>
                    <strong>${name}</strong>
                    <p>${item.price} сом × ${item.quantity}</p>
                </div>

                <div class="quantity-controls">
                    <button data-action="minus" data-name="${name}">−</button>
                    <span>${item.quantity}</span>
                    <button data-action="plus" data-name="${name}">+</button>
                </div>
            </div>
        `;
    }

    cartCounter.textContent = count;
    panelCounter.textContent = count;
    document.getElementById("cart-badge").textContent = count;
    cartTotal.textContent = total + " сом";

    if (count === 0) {
        cartItems.innerHTML =
            '<p class="empty-cart">Пока здесь пусто. Выбери что-нибудь вкусное!</p>';
        cartPanel.classList.remove("is-open");
    } else {
        cartPanel.classList.add("is-open");
    }
}

// Добавление блюд
document.querySelectorAll(".add-button").forEach(button => {

    button.addEventListener("click", () => {

        const card = button.closest(".menu-card");
        const name = card.querySelector("h3").textContent;
        const priceText = card.querySelector(".price").textContent;
        const price = Number(priceText.replace(/\D/g, ""));

        if (cart[name]) {
            cart[name].quantity++;
        } else {
            cart[name] = {
                price: price,
                quantity: 1
            };
        }

        updateCart();
    });

});

// Кнопки плюс и минус внутри корзины
cartItems.addEventListener("click", event => {

    const button = event.target.closest("button[data-action]");

    if (!button) return;

    const name = button.dataset.name;

    if (button.dataset.action === "plus") {
        cart[name].quantity++;
    }

    if (button.dataset.action === "minus") {
        cart[name].quantity--;

        if (cart[name].quantity <= 0) {
            delete cart[name];
        }
    }

    updateCart();
});
// Закрыть корзину крестиком
document.getElementById("close-cart").addEventListener("click", () => {
    cartPanel.classList.remove("is-open");
});

// Очистить всю корзину
document.getElementById("clear-cart").addEventListener("click", () => {
    for (const name in cart) {
        delete cart[name];
    }

    updateCart();
});
// Открыть корзину круглой кнопкой
document.getElementById("cart-toggle").addEventListener("click", () => {
    cartPanel.classList.add("is-open");
});
