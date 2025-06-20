document.addEventListener("DOMContentLoaded", function () {
  const featuredModels = [
    {
      nome: "Ferrari SF90 Stradale",
      descricao:
        "O primeiro híbrido plug-in da Ferrari, com 1.000 cv de potência combinada, acelera de 0 a 100 km/h em apenas 2,5 segundos.",
      imagem: "images/sf90.jpg",
    },

    {
      nome: "Ferrari 812 Superfast",
      descricao: "O V12 mais potente da Ferrari, com 800 cv, oferece uma experiência de condução emocionante e inigualável.",
      imagem: "images/812.jpg",
    },

    {
      nome: "Ferrari Roma",
      descricao:
        "O coupé elegante da Ferrari, com motor V8 de 620 cv, combina desempenho e estilo atemporal.",
      imagem: "images/roma.jpg",
    },
  ];

  const modelsGrid = document.querySelector(".models-grid");

  featuredModels.forEach((model) => {
    const modelCard = document.createElement("div");
    modelCard.className = "model-card";

    modelCard.innerHTML = `
          <img src="${model.imagem}" alt="${model.nome}">
          <div class="model-info">
              <h3>${model.nome}</h3>
              <p>${model.descricao}</p>
              <button class="cta-button small">Saiba Mais</button>
          </div>
      `;

    modelsGrid.appendChild(modelCard);
  });

  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");

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
});
