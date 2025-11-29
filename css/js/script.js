// إدارة سلة التسوق
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(productId, productName, productPrice) {
    const product = {
        id: productId,
        name: productName,
        price: productPrice,
        quantity: 1
    };
    
    // التحقق إذا كان المنتج موجود مسبقاً
    const existingProduct = cart.find(item => item.id === productId);
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push(product);
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    alert('تم إضافة المنتج إلى سلة التسوق!');
}

function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    
    if (cartCount) {
        cartCount.textContent = totalItems;
    }
}

function displayProducts() {
    const productsGrid = document.querySelector('.products-grid');
    if (productsGrid) {
        const sampleProducts = [
            { 
                id: 1, 
                name: 'منتج مميز 1', 
                price: 50, 
                image: 'https://via.placeholder.com/300x200/667eea/white?text=منتج+1' 
            },
            { 
                id: 2, 
                name: 'منتج رائع 2', 
                price: 75, 
                image: 'https://via.placeholder.com/300x200/764ba2/white?text=منتج+2' 
            },
            { 
                id: 3, 
                name: 'منتج جديد 3', 
                price: 100, 
                image: 'https://via.placeholder.com/300x200/e74c3c/white?text=منتج+3' 
            }
        ];
        
        productsGrid.innerHTML = '';
        
        sampleProducts.forEach(product => {
            const productCard = `
                <div class="product-card">
                    <img src="${product.image}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <div class="price">${product.price} د.ج</div>
                    <button class="add-to-cart" onclick="addToCart(${product.id}, '${product.name}', ${product.price})">
                        🛒 أضف إلى السلة
                    </button>
                </div>
            `;
            productsGrid.innerHTML += productCard;
        });
    }
}

// تهيئة عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    updateCartCount();
    displayProducts();
});
