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
