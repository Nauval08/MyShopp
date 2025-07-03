
fetch("https://rifkira.psl17.my.id/api/products")
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById("produk-container");
    data.forEach(prod => {
      const card = document.createElement("div");
      card.className = "produk-card";
      card.innerHTML = `
        <img src="${prod.image_url}" alt="${prod.name}" />
        <h3>${prod.name}</h3>
        <p>Rp ${prod.price.toLocaleString()}</p>
      `;
      container.appendChild(card);
    });
  })
  .catch(err => {
    document.getElementById("produk-container").innerHTML = "<p>Gagal memuat produk.</p>";
  });
