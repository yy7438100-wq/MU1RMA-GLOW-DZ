/* تنسيقات صفحة السلة */
.cart-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
}

.cart-container h2 {
    text-align: center;
    margin-bottom: 30px;
    color: #333;
}

.cart-item {
    display: flex;
    align-items: center;
    background: #fff;
    padding: 15px;
    margin-bottom: 15px;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

.cart-item-image {
    width: 80px;
    height: 80px;
    object-fit: cover;
    border-radius: 5px;
    margin-left: 15px;
}

.cart-item-details {
    flex-grow: 1;
}

.cart-item-title {
    font-weight: bold;
    margin-bottom: 5px;
}

.cart-item-price {
    color: #e44d26;
    font-weight: bold;
}

.quantity-controls {
    display: flex;
    align-items: center;
    margin: 10px 0;
}

.quantity-btn {
    background: #f0f0f0;
    border: none;
    padding: 5px 10px;
    cursor: pointer;
    border-radius: 3px;
}

.quantity-input {
    width: 50px;
    text-align: center;
    margin: 0 10px;
    padding: 5px;
    border: 1px solid #ddd;
    border-radius: 3px;
}

.remove-btn {
    background: #ff4444;
    color: white;
    border: none;
    padding: 8px 15px;
    border-radius: 5px;
    cursor: pointer;
}

.empty-cart {
    text-align: center;
    padding: 50px;
}

.empty-cart p {
    font-size: 18px;
    margin-bottom: 20px;
}

.cart-summary {
    background: #f9f9f9;
    padding: 20px;
    border-radius: 8px;
    margin-top: 30px;
}

.summary-details h3 {
    margin-bottom: 15px;
}

.total-price {
    display: flex;
    justify-content: space-between;
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 20px;
}

.checkout-btn {
    background: #28a745;
    color: white;
    border: none;
    padding: 12px 30px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    width: 100%;
}

.checkout-btn:hover {
    background: #218838;
}
