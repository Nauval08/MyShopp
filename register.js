function register() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  fetch("https://rifkira.psl17.my.id/api/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password })
  })
  .then(res => res.json())
  .then(data => {
    if (data.token) {
      localStorage.setItem("token", data.token);
      alert("Registrasi berhasil!");
      window.location.href = "index.html";
    } else {
      alert("Registrasi gagal: " + (data.message || "Coba lagi"));
    }
  })
  .catch(err => alert("Terjadi kesalahan saat mendaftar"));
}