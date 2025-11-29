// script.js - ملف JavaScript المحدث مع وظائف عربة التسوق

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
        // إضافة مستمع للأحداث لأزرار "إضافة إلى السلة"
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('add-to-cart')) {
                const productId = parseInt(e.target.dataset.productId);
                const productName = e.target.dataset.productName;
                const productPrice = parseInt(e.target.dataset.productPrice);
                const productImage = e.target.dataset.productImage;
                
                this.addToCart({
                    id: productId,
                    name: productName,
                    price: productPrice,
                    image: productImage
                });
            }
        });

        // إضافة مستمع لزر إتمام الشراء
        const checkoutBtn = document.getElementById('checkoutBtn');
        if (checkoutBtn) {
            checkoutBtn.addEventListener('click', () => {
                this.checkout();
            });
        }
    }

    addToCart(product) {
        const existingItem = this.cart.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.cart.push({
                ...product,
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

        const item = this.cart.find(item => item.id
