const categories = new URLSearchParams(window.location.search).get("category");
const listContainer = document.querySelector(".product_list_container");

fetch(`https://kea-alt-del.dk/t7/api/products?category=` + categories)
  .then((response) => response.json())
  .then((data) => showList(data));

function showList(products) {
  const markup = products
    .map(
      (product) => `
     <div class="boks">
                <div class="product-image">
                    <img src="https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp" alt="1164">
                </div>
                <div class="soldout_label ${product.soldout === 0 ? "hidden" : ""}">Sold Out</div>

                <h3>${product.productdisplayname}</h3>
                <p class="articletype">${product.articletype}	</p>

                <p>${product.price}DKK,-</p>
                <p class="discount_pris ${!product.discount && "hidden"}">Før: ${Math.round((product.price / (100 - product.discount)) * 100)}DKK,-</p>
                <div class="discount_label ${product.discount === null ? "hidden" : ""}">${product.discount}%</div>

                <a class="readmore_knap" href="produkt.html?id=${product.id}">Read more</a>
            </div>
            `
    )
    .join("");
  listContainer.innerHTML = markup;
}

let allData = [];

// Hent produkter fra API
fetch("https://kea-alt-del.dk/t7/api/products")
  .then((response) => response.json())
  .then((json) => {
    allData = json;
    showProducts(allData);
  })
  .catch((error) => console.error("Fejl ved hentning af data:", error));

// Event listeners til filtreringsknapper
document.querySelectorAll(".filtermenu button").forEach((knap) => {
  knap.addEventListener("click", showFiltered);
});

// Funktion til at vise produkter
function showProducts(products) {
  const productContainer = document.querySelector(".product_list_container");
  productContainer.innerHTML = "";

  if (!products || products.length === 0) {
    productContainer.innerHTML = "<p>Ingen produkter fundet.</p>";
    return;
  }

  products.forEach((product) => {
    const productElement = document.createElement("div");
    productElement.classList.add("boks");

    productElement.innerHTML = `
      <div class="boks">
                <div class="product-image">
                    <img src="https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp" alt="1164">
                </div>
                <div class="soldout_label ${product.soldout === 0 ? "hidden" : ""}">Sold Out</div>

                <h3>${product.productdisplayname}</h3>
                <p class="articletype">${product.articletype}	</p>

                <p>${product.price}DKK,-</p>
                <p class="discount_pris ${!product.discount && "hidden"}">Før: ${Math.round((product.price / (100 - product.discount)) * 100)}DKK,-</p>
                <div class="discount_label ${product.discount === null ? "hidden" : ""}">${product.discount}%</div>

                <a class="readmore_knap" href="produkt.html?id=${product.id}">Read more</a>
            </div>
    `;

    productContainer.appendChild(productElement);
  });
}

// Funktion til filtrering
function showFiltered() {
  if (!allData) return; // Undgå fejl, hvis data ikke er loadet

  const filter = this.dataset.gender.toLowerCase();

  if (filter === "all") {
    showProducts(allData);
  } else {
    const filteredProducts = allData.filter((product) => product.gender.toLowerCase() === filter);
    showProducts(filteredProducts);
  }
}
