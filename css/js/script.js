// script.js - ملف JavaScript المحدث مع وظائف عربة التسوق

// بيانات المنتجات الافتراضية (يمكن استبدالها ببيانات حقيقية من قاعدة بيانات)
const products = [
    {
        id: 1,
        name: "منتج 1",
        price: 15000,
        image: "images/product1.jpg",
        description: "وصف المنتج 1"
    },
    {
        id: 2,
        name: "منتج 2",
        price: 20000,
        image: "images/product2.jpg",
        description: "وصف المنتج 2"
    },
    {
        id: 3,
        name: "منتج 3",
        price: 12000,
        image: "images/product3.jpg",
        description: "وصف المنتج 3"
    },
    {
        id: 4,
        name: "منتج 4",
        price: 18000,
        image: "images/product4.jpg",
        description: "وصف المنتج 4"
    },
    {
        id: 5,
        name: "منتج 5",
        price: 25000,
        image: "images/product5.jpg",
        description: "وصف المنتج 5"
    },
    {
        id: 6,
        name: "منتج 6",
        price: 22000,
        image: "images/product6.jpg",
        description: "وصف المنتج 6"
    }
];

// مدير عربة التسوق
class CartManager {
    constructor() {
        this.cart = JSON.parse(localStorage.getItem('cart')) || [];
        this.init();
    }

    init() {
        this.updateCartUI();
        this.setupEventListeners();
    }

    setupEventListeners() {
        // إضافة مستمع للأحداث لأزرار "إضافة إلى السلة" في صفحة المنتجات
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('add-to-cart')) {
                const productId = parseInt(e.target.dataset.productId);
                const product = products.find(p => p.id === productId);
                if (product) {
                    this.addToCart(product);
                }
            }
        });
    }

    addToCart(product) {
        const existingItem = this.cart.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: 1
            });
        }
        
        this.saveCart();
        this.updateCartUI();
        this.showNotification('تمت إضافة المنتج إلى السلة');
    }

    removeFromCart(productId) {
        this.cart = this.cart.filter(item => item.id !== productId);
        this.saveCart();
        this.updateCartUI();
        this.showNotification('تم حذف المنتج من السلة');
    }

    updateQuantity(productId, newQuantity) {
        if (newQuantity <= 0) {
            this.removeFromCart(productId);
            return;
        }

        const item = this.cart.find(item => item.id === productId);
        if (item) {
            item.quantity = newQuantity;
            this.saveCart();
            this.updateCartUI();
        }
    }

    clearCart() {
        this.cart = [];
        this.saveCart();
        this.updateCartUI();
        this.showNotification('تم تفريغ عربة التسوق');
    }

    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.cart));
    }

    updateCartUI() {
        this.updateCartPage();
        this.updateCartIcon();
    }

    updateCartPage() {
        // تحديث صفحة السلة إذا كنا فيها
        const cartItemsContainer = document.getElementById('cartItems');
        const emptyCart = document.getElementById('emptyCart');
        const cartSummary = document.getElementById('cartSummary');
        
        if (cartItemsContainer) {
            if (this.cart.length === 0) {
                if (emptyCart) emptyCart.style.display = 'block';
                if (cartSummary) cartSummary.style.display = 'none';
                return;
            }

            if (emptyCart) emptyCart.style.display = 'none';
            if (cartSummary) cartSummary.style.display = 'block';

            // عرض عناصر السلة
            cartItemsContainer.innerHTML = this.cart.map(item => `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                    <div class="cart-item-details">
                        <div class="cart-item-title">${item.name}</div>
                        <div class="cart-item-price">${item.price} د.ج</div>
                        <div class="quantity-controls">
                            <button class="quantity-btn" onclick="cartManager.updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                            <input type="number" class="quantity-input" value="${item.quantity}" 
                                   onchange="cartManager.updateQuantity(${item.id}, parseInt(this.value))">
                            <button class="quantity-btn" onclick="cartManager.updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                        </div>
                    </div>
                    <button class="remove-btn" onclick="cartManager.removeFromCart(${item.id})">حذف</button>
                </div>
            `).join('');

            this.updateTotal();
        }
    }

    updateTotal() {
        const totalAmount = document.getElementById('totalAmount');
        if (totalAmount) {
            const total = this.cart.reduce((sum, item) => sum + (item.price * item.
