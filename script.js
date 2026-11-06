// Счётчик товаров в корзине
let cartCount = 0;

// Общая стоимость заказа
let cartTotal = 0;

// Находим счётчик корзины на странице
const cartCounter = document.getElementById("cart-count");

// Находим все кнопки «Добавить»
const addButtons = document.querySelectorAll(".add-button");

// Обрабатываем нажатия на кнопки
addButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        // Находим цену блюда
        const card = button.closest(".menu-card");
        const priceText = card.querySelector(".price").textContent;

        // Получаем число из цены
        const price = Number(priceText.replace(/\D/g, ""));

        // Увеличиваем количество и сумму
        cartCount++;
        cartTotal += price;

        // Обновляем отображение корзины
        cartCounter.textContent = cartCount;

        // Показываем сумму заказа
        cartCounter.title = "Сумма заказа: " + cartTotal + " сом";

        // Меняем текст кнопки
        button.textContent = "Добавлено ✓";

    });

});
