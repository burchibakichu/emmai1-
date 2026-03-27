document.addEventListener("DOMContentLoaded", function (){
  let cart = [];

  function addToCart(name, price) {
    const ex = cart.find(i => i.name === name);
    if (ex) ex.qty++; else cart.push({ name, price, qty: 1 });
    updateCartUI();
    openCart();
  }

  function updateCartUI() {
    const body = document.getElementById('cart-body');
    const footer = document.getElementById('cart-footer');
    const form = document.getElementById('cart-form');
    const totalEl = document.getElementById('cart-total');
    const totalItems = cart.reduce((s,i) => s+i.qty, 0);
    const totalPrice = cart.reduce((s,i) => s+i.price*i.qty, 0);
    const badge = document.getElementById('cart-count');
 if (badge) badge.textContent = totalItems;
    if (cart.length === 0) {
      body.innerHTML = '<div class="cart-empty"><div class="cart-empty-icon">🛒</div><p>Your cart is empty.<br>Add items from the menu!</p></div>';
      footer.style.display = 'none'; form.style.display = 'none'; return;
    }
    footer.style.display = 'block'; form.style.display = 'block';
    totalEl.textContent = '₹' + totalPrice.toLocaleString();
    body.innerHTML = cart.map((item, idx) => `
      <div class="cart-item">
        <div class="cart-item-info">
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-price">₹${item.price} × ${item.qty} = ₹${item.price * item.qty}</div>
        </div>
        <div class="cart-item-qty">
          <button class="qty-btn" onclick="changeQty(${idx},-1)">−</button>
          <span class="qty-num">${item.qty}</span>
          <button class="qty-btn" onclick="changeQty(${idx},1)">+</button>
        </div>
           <button class="remove-btn" onclick="removeItem(${idx})">✕</button>
       </div>
      </div>`).join('');
  }

  function changeQty(idx, delta) {
    cart[idx].qty += delta;
    if (cart[idx].qty <= 0) cart.splice(idx, 1);
    updateCartUI();
  }

function removeItem(idx) {
  cart.splice(idx, 1);
  updateCartUI();
}

  function openCart() {
    document.getElementById('cart-overlay').classList.add('open');
    document.getElementById('cart-sidebar').classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeCart() {
    document.getElementById('cart-overlay').classList.remove('open');
    document.getElementById('cart-sidebar').classList.remove('open');
    document.body.style.overflow = '';
  }

  function sendWhatsApp() {
    const name = document.getElementById('customer-name').value.trim();
    const location = document.getElementById('customer-location').value.trim();
    const notes = document.getElementById('customer-notes').value.trim();
    if (!name) { alert('Please enter your name.'); return; }
    if (!location) { alert('Please enter your delivery/pickup location.'); return; }
    if (!cart.length) { alert('Your cart is empty!'); return; }
    const total = cart.reduce((s,i) => s+i.price*i.qty, 0);
    let msg = `🍽️ *New Order – Deccan Kitchen*\n\n👤 *Name:* ${name}\n📍 *Location:* ${location}\n\n*Order:*\n`;    
    cart.forEach(i => msg += `• ${i.name} × ${i.qty} = ₹${i.price*i.qty}\n`);
    msg += `\n💰 *Total: ₹${total}*`;
    if (notes) msg += `\n\n📝 *Notes:* ${notes}`;
    window.open('https://wa.me/919774884078?text=' + encodeURIComponent(msg), '_blank');
closeCart();
cart = [];
updateCartUI();

document.getElementById('customer-name').value = '';
document.getElementById('customer-location').value = '';
document.getElementById('customer-notes').value = '';
  }

  function switchTab(btn, tabId) {
    document.querySelectorAll('.menu-panel').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.menu-tab').forEach(t => t.classList.remove('active'));
    document.getElementById('tab-' + tabId).classList.add('active');
    btn.classList.add('active');
  }

  window.addEventListener('scroll', () => {
    document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 40);
  });

  function toggleMobileMenu() { document.getElementById('mobile-nav').classList.toggle('open'); }
  function closeMobileMenu() { document.getElementById('mobile-nav').classList.remove('open'); }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
window.addToCart = addToCart;
window.changeQty = changeQty;
window.removeItem = removeItem;
window.openCart = openCart;
window.closeCart = closeCart;
window.sendWhatsApp = sendWhatsApp;
window.switchTab = switchTab;
});
