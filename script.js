let produk = [];

fetch("https://rifkira.psl17.my.id/api/products")
  .then(res => res.json())
  .then(data => {
    produk = data;
    const container = document.getElementById("produk-container");
    produk.forEach(p => {
      container.innerHTML += `
        <div class="produk">
          <img src="${p.image_url}" alt="${p.name}">
          <h3>${p.name}</h3>
          <p>Rp ${p.price.toLocaleString()}</p>
          <button onclick="tambahKeranjang(${p.id})">Tambah ke Keranjang</button>
        </div>
      `;
    });
  });

function tambahKeranjang(id) {
  const produkTerpilih = produk.find(p => p.id === id);
  let keranjang = JSON.parse(localStorage.getItem("keranjang")) || [];
  keranjang.push(produkTerpilih);
  localStorage.setItem("keranjang", JSON.stringify(keranjang));
  alert(`${produkTerpilih.name} ditambahkan ke keranjang!`);
}