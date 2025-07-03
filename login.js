function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  fetch("https://rifkira.psl17.my.id/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  })
  .then(res => res.json())
  .then(data => {
    if (data.token) {
      localStorage.setItem("token", data.token);
      alert("Login berhasil!");
      window.location.href = "index.html";
    } else {
      alert("Login gagal: " + (data.message || "Email/password salah"));
    }
  })
  .catch(err => alert("Terjadi kesalahan saat login"));
}