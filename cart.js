function loadKeranjang() {
  const container = document.getElementById("keranjang-container");
  const keranjang = JSON.parse(localStorage.getItem("keranjang")) || [];

  if (keranjang.length === 0) {
    container.innerHTML = "<p>Keranjang kosong</p>";
    return;
  }

  keranjang.forEach(p => {
    container.innerHTML += `
      <div class="produk">
        <img src="${p.image_url}" alt="${p.name}">
        <h3>${p.name}</h3>
        <p>Rp ${p.price.toLocaleString()}</p>
      </div>
    `;
  });
}

function hapusSemua() {
  localStorage.removeItem("keranjang");
  alert("Keranjang dibersihkan!");
  location.reload();
}

loadKeranjang();