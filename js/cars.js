document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("search-input");
  const searchButton = document.getElementById("search-button");
  const categoryFilter = document.getElementById("category-filter");
  const priceFilter = document.getElementById("price-filter");
  const carsContainer = document.getElementById("cars-container");
  const noResults = document.getElementById("no-results");

  let carsData = [];

  fetch("../data/cars.json")
    .then((response) => response.json())
    .then((data) => {
      carsData = data;
      displayCars(carsData);
    })
    .catch((error) => {
      console.error("Erro ao carregar os dados:", error);
      carsContainer.innerHTML =
        '<p class="error">Erro ao carregar os carros. Por favor, recarregue a página.</p>';
    });

  function displayCars(cars) {
    if (cars.length === 0) {
      noResults.style.display = "block";
      carsContainer.innerHTML = "";
      return;
    }

    noResults.style.display = "none";
    carsContainer.innerHTML = "";

    cars.forEach((car) => {
      const carCard = document.createElement("div");
      carCard.className = "car-card";

      carCard.innerHTML = `
                <div class="car-image">
                    <img src="${car.image}" alt="${car.model}">
                </div>
                <div class="car-info">
                    <h3>${car.model} <span>${car.year}</span></h3>
                    <p class="price">$${car.price.toLocaleString()}</p>
                    <p class="description">${car.description}</p>
                    <div class="specs">
                        <div class="spec-item">
                            <i class="fas fa-tachometer-alt"></i>
                            <span>${car.specs.power}</span>
                        </div>
                        <div class="spec-item">
                            <i class="fas fa-bolt"></i>
                            <span>${car.specs.acceleration}</span>
                        </div>
                        <div class="spec-item">
                            <i class="fas fa-tachometer-alt"></i>
                            <span>${car.specs.top_speed}</span>
                        </div>
                    </div>
                    <button class="cta-button small">Ver Detalhes</button>
                </div>
            `;

      carsContainer.appendChild(carCard);
    });
  }

  function filterCars() {
    const searchTerm = searchInput.value.toLowerCase();
    const category = categoryFilter.value;
    const priceRange = priceFilter.value;

    const filteredCars = carsData.filter((car) => {
      const matchesSearch =
        car.model.toLowerCase().includes(searchTerm) ||
        car.description.toLowerCase().includes(searchTerm);

      const matchesCategory = category === "all" || car.category === category;

      let matchesPrice = true;
      if (priceRange !== "all") {
        const [min, max] = priceRange.split("-").map(Number);
        if (priceRange.endsWith("+")) {
          matchesPrice = car.price >= 600000;
        } else {
          matchesPrice = car.price >= min * 1000 && car.price <= max * 1000;
        }
      }

      return matchesSearch && matchesCategory && matchesPrice;
    });

    displayCars(filteredCars);
  }

  searchInput.addEventListener("input", filterCars);
  searchButton.addEventListener("click", filterCars);
  categoryFilter.addEventListener("change", filterCars);
  priceFilter.addEventListener("change", filterCars);

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
});
