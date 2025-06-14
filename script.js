document.addEventListener('DOMContentLoaded', function() {

    const products = [];

    // Ürünleri grid'e ekle
    const productGrid = document.querySelector('.product-grid');
    
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        
        productCard.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <span class="product-category">${product.category}</span>
                <h3 class="product-name">${product.name}</h3>
                <div class="product-rating">
                    ${'<i class="fas fa-star"></i>'.repeat(product.rating)}
                    ${'<i class="far fa-star"></i>'.repeat(5 - product.rating)}
                </div>
                <p class="product-price">${product.price}</p>
                <button class="add-to-cart">Sepete Ekle</button>
            </div>
        `;
        
        productGrid.appendChild(productCard);
    });

    // Sepet işlevselliği
    let cartCount = 0;
    const cartCountElement = document.querySelector('.cart-count');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            cartCount++;
            cartCountElement.textContent = cartCount;
            
            // Animasyon ekle
            this.textContent = 'Eklendi!';
            this.style.backgroundColor = '#2D6D66';
            
            setTimeout(() => {
                this.textContent = 'Sepete Ekle';
                this.style.backgroundColor = '#46A094';
            }, 1000);
        });
    });

    // Mobil menü için
    const menuToggle = document.createElement('div');
    menuToggle.className = 'menu-toggle';
    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    menuToggle.style.display = 'none';
    document.querySelector('.top-nav .container').appendChild(menuToggle);
    
    function checkScreenSize() {
        if (window.innerWidth <= 768) {
            menuToggle.style.display = 'block';
            document.querySelector('.menu').style.display = 'none';
            document.querySelector('.user-actions').style.display = 'none';
        } else {
            menuToggle.style.display = 'none';
            document.querySelector('.menu').style.display = 'flex';
            document.querySelector('.user-actions').style.display = 'flex';
        }
    }
    
    menuToggle.addEventListener('click', function() {
        const menu = document.querySelector('.menu');
        const userActions = document.querySelector('.user-actions');
        
        if (menu.style.display === 'none' || !menu.style.display) {
            menu.style.display = 'flex';
            userActions.style.display = 'flex';
            menuToggle.innerHTML = '<i class="fas fa-times"></i>';
        } else {
            menu.style.display = 'none';
            userActions.style.display = 'none';
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });
    
    window.addEventListener('resize', checkScreenSize);
    checkScreenSize();

// Sepet verilerini saklamak için
let cartItems = [];

// Ürünleri sepete ekleme
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('add-to-cart')) {
        const productCard = e.target.closest('.product-card');
        const productName = productCard.querySelector('.product-name').textContent;
        const productPrice = productCard.querySelector('.product-price').textContent;
        
        // Ürünü sepete ekle
        cartItems.push({
            name: productName,
            price: productPrice
        });
        
        // Sepet sayacını güncelle
        updateCartCount();
        
        // Animasyon
        e.target.textContent = 'Eklendi!';
        e.target.style.backgroundColor = '#2D6D66';
        
        setTimeout(() => {
            e.target.textContent = 'Sepete Ekle';
            e.target.style.backgroundColor = '#46A094';
        }, 1000);
        
        // Sepet verilerini localStorage'a kaydet
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }
});

// Sepet sayacını güncelle
function updateCartCount() {
    const cartCountElement = document.querySelector('.cart-count');
    cartCountElement.textContent = cartItems.length;
}

// Sayfa yüklendiğinde sepeti kontrol et
document.addEventListener('DOMContentLoaded', function() {
    const savedCart = localStorage.getItem('cartItems');
    if (savedCart) {
        cartItems = JSON.parse(savedCart);
        updateCartCount();
    }
    
    // Diğer mevcut kodlar...
});

document.addEventListener('DOMContentLoaded', function() {
    // Sepet verilerini yükle
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    updateCartCount();

    // Sepete ekle butonlarına event listener ekle
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('add-to-cart')) {
            const productCard = e.target.closest('.product-card');
            const productName = productCard.querySelector('.product-name').textContent;
            const productPrice = productCard.querySelector('.product-price').textContent;
            const productImage = productCard.querySelector('img').src;
            
            // Ürünü sepete ekle
            cartItems.push({
                name: productName,
                price: productPrice,
                image: productImage
            });
            
            // Sepeti güncelle
            updateCart();
            
            // Animasyon
            e.target.textContent = 'Eklendi!';
            e.target.style.backgroundColor = '#2D6D66';
            
            setTimeout(() => {
                e.target.textContent = 'Sepete Ekle';
                e.target.style.backgroundColor = '#46A094';
            }, 1000);
        }
    });

    // Sepet sayacını güncelle
    function updateCartCount() {
        const cartCountElement = document.querySelectorAll('.cart-count');
        cartCountElement.forEach(element => {
            element.textContent = cartItems.length;
        });
    }

    // Sepeti güncelle (localStorage ve sayac)
    function updateCart() {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        updateCartCount();
    }

    // Kullanıcı verilerini saklamak için
let users = JSON.parse(localStorage.getItem('cavegame_users')) || [];

// Giriş denemelerini takip etmek için
let loginAttempts = JSON.parse(localStorage.getItem('loginAttempts')) || {};

// Kullanıcı kayıt fonksiyonu
function registerUser(userData) {
    // Kullanıcı adı kontrolü
    if (users.some(user => user.username === userData.username)) {
        return { success: false, message: 'Bu kullanıcı adı zaten alınmış' };
    }
    
    // E-posta kontrolü
    if (users.some(user => user.email === userData.email)) {
        return { success: false, message: 'Bu e-posta zaten kayıtlı' };
    }
    
    users.push(userData);
    localStorage.setItem('cavegame_users', JSON.stringify(users));
    return { success: true };
}

// Kullanıcı giriş fonksiyonu
function loginUser(username, password) {
    const now = new Date().getTime();
    const userAttempts = loginAttempts[username] || { count: 0, lastAttempt: 0 };
    
    // 5 dakikalık blok kontrolü
    if (userAttempts.count >= 5 && (now - userAttempts.lastAttempt) < 300000) {
        const remainingTime = Math.ceil((300000 - (now - userAttempts.lastAttempt)) / 60000);
        return { 
            success: false, 
            message: `Çok fazla deneme yaptınız. Lütfen ${remainingTime} dakika sonra tekrar deneyin.`
        };
    }
    
    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
        // Başarılı girişte deneme sayacını sıfırla
        delete loginAttempts[username];
        localStorage.setItem('loginAttempts', JSON.stringify(loginAttempts));
        localStorage.setItem('currentUser', JSON.stringify(user));
        return { success: true, user };
    } else {
        // Başarısız girişte deneme sayacını güncelle
        userAttempts.count += 1;
        userAttempts.lastAttempt = now;
        loginAttempts[username] = userAttempts;
        localStorage.setItem('loginAttempts', JSON.stringify(loginAttempts));
        
        return { 
            success: false, 
            message: userAttempts.count >= 5 ? 
                'Çok fazla deneme yaptınız. Lütfen 5 dakika sonra tekrar deneyin.' : 
                'Kullanıcı adı veya şifre hatalı.'
        };
    }
}

// Şifre sıfırlama fonksiyonu
function resetPassword(email, securityAnswer, newPassword) {
    const user = users.find(u => u.email === email);
    
    if (!user) {
        return { success: false, message: 'Bu e-posta ile kayıtlı kullanıcı bulunamadı' };
    }
    
    if (user.securityAnswer !== securityAnswer) {
        return { success: false, message: 'Güvenlik sorusunun cevabı yanlış' };
    }
    
    user.password = newPassword;
    localStorage.setItem('cavegame_users', JSON.stringify(users));
    return { success: true };
}

// Mevcut kullanıcıyı kontrol et
function checkAuth() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
        // Kullanıcı giriş yapmışsa "Giriş Yap" bağlantısını "Hesabım" yap
        const loginLinks = document.querySelectorAll('.user-actions a[href="#"]');
        loginLinks.forEach(link => {
            link.innerHTML = '<i class="fas fa-user"></i> ' + currentUser.username;
            link.href = 'account.html'; // Hesap sayfasına yönlendir
        });
    }
}

// Sayfa yüklendiğinde çalışacak fonksiyon
document.addEventListener('DOMContentLoaded', function() {
    checkAuth();
    
    // Diğer mevcut kodlar...
});

// Çıkış yap fonksiyonu
function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'login.html';
}
});
});