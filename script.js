const API_BASE = 'https://rifkira.psl17.my.id/api';

const btnLogin = document.getElementById('btn-login');
const btnLogout = document.getElementById('btn-logout');
const userInfo = document.getElementById('user-info');

const loginSection = document.getElementById('login-section');
const registerSection = document.getElementById('register-section');
const productsSection = document.getElementById('products-section');

const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');

const productsList = document.getElementById('products-list');
const loadingSpinner = document.getElementById('loading');

let token = localStorage.getItem('token') || null;
let userName = localStorage.getItem('userName') || null;

function showLogin() {
  loginSection.style.display = 'flex';
  registerSection.style.display = 'none';
}

function showRegister() {
  registerSection.style.display = 'flex';
  loginSection.style.display = 'none';
}

function closeModals() {
  loginSection.style.display = 'none';
  registerSection.style.display = 'none';
}

function showProducts() {
  productsSection.style.display = 'block';
  btnLogin.style.display = 'none';
  btnLogout.style.display = 'inline-block';
  userInfo.textContent = `Halo, ${userName}`;
}

function showLoggedOut() {
  productsSection.style.display = 'block';
  btnLogin.style.display = 'inline-block';
  btnLogout.style.display = 'none';
  userInfo.textContent = '';
}

btnLogin.addEventListener('click', () => {
  showLogin();
});

btnLogout.addEventListener('click', () => {
  token = null;
  userName = null;
  localStorage.removeItem('token');
  localStorage.removeItem('userName');
  showLoggedOut();
});

document.getElementById('show-register').addEventListener('click', (e) => {
  e.preventDefault();
  showRegister();
});

document.getElementById('show-login').addEventListener('click', (e) => {
  e.preventDefault();
  showLogin();
});

document.getElementById('close-login').addEventListener('click', closeModals);
document.getElementById('close-register').addEventListener('click', closeModals);

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

  try {
    loadingSpinner.style.display = 'block';
    const res = await fetch(`${API_BASE}/login`, {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({email, password})
    });
    loadingSpinner.style.display = 'none';

    const data = await res.json();

    if(res.ok) {
      token = data.token;
      userName = data.name || email;
      localStorage.setItem('token', token);
      localStorage.setItem('userName', userName);
      alert('Login berhasil!');
      closeModals();
      showProducts();
      loadProducts();
    } else {
      alert(data.message || 'Login gagal');
    }
  } catch (err) {
    loadingSpinner.style.display = 'none';
    alert('Error: ' + err.message);
  }
});

registerForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('reg-email').value.trim();
  const password = document.getElementById('reg-password').value.trim();

  try {
    loadingSpinner.style.display = 'block';
    const res = await fetch(`${API_BASE}/register`, {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({name, email, password})
    });
    loadingSpinner.style.display = 'none';

    const data = await res.json();

    if(res.ok) {
      alert('Registrasi berhasil! Silakan login.');
      closeModals();
      showLogin();
    } else {
      alert(data.message || 'Registrasi gagal');
    }
  } catch (err) {
    loadingSpinner.style.display = 'none';
    alert('Error: ' + err.message);
  }
});

async function loadProducts() {
  productsList.innerHTML = '';
  loadingSpinner.style.display = 'block';
  try {
    const res = await fetch(`${API_BASE}/products`);
    loadingSpinner.style.display = 'none';
    const products = await res.json();

    if(res.ok) {
      if(products.length === 0) {
        productsList.innerHTML = '<p style="color:white;text-align:center;">Belum ada produk.</p>';
        return;
      }

      products.forEach(p => {
        const div = document.createElement('div');
        div.classList.add('product');
        div.innerHTML = `
          <img src="${p.image_url || 'https://via.placeholder.com/220x160?text=No+Image'}" alt="${p.name}" />
          <h3>${p.name}</h3>
          <p>Rp ${p.price.toLocaleString('id-ID')}</p>
        `;
        productsList.appendChild(div);
      });
    } else {
      productsList.innerHTML = '<p style="color:white;text-align:center;">Gagal memuat produk.</p>';
    }
  } catch (err) {
    loadingSpinner.style.display = 'none';
    productsList.innerHTML = '<p style="color:white;text-align:center;">Error: ' + err.message + '</p>';
  }
}

// Saat halaman load
window.addEventListener('load', () => {
  if(token && userName) {
    showProducts();
  } else {
    showLoggedOut();
  }
  loadProducts();
});
