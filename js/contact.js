document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.getElementById("contactForm");

  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      navLinks.style.display =
        navLinks.style.display === "flex" ? "none" : "flex";
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 768) {
        navLinks.style.display = "flex";
      } else {
        navLinks.style.display = "none";
      }
    });
  }

  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const subject = document.getElementById("subject").value;
    const message = document.getElementById("message").value;

    if (!name || !email || !subject || !message) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    if (!validateEmail(email)) {
      alert("Por favor, insira um e-mail válido.");
      return;
    }

    if (message.length < 20) {
      alert("A mensagem deve conter pelo menos 20 caracteres")
    }

    alert("Mensagem enviada com sucesso! Entraremos em contato em breve.");
    contactForm.reset();
  });

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }
});
