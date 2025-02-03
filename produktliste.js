const listContainer = document.querySelector(".product_list_container");
fetch(`https://kea-alt-del.dk/t7/api/products/`)
  .then((response) => response.json())
  .then((data) => showList(data));

function showList(products) {
  const markup = products
    .map(
      (product) => `
      <div class="boks">
                <div class="product-image">
                    <img src="https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp" alt="1163">
                </div>

                <h3>${product.productdisplayname}</h3>
                <p class="articletype">Tshirts / Nike</p>
                <p>${product.price}DKK,-</p>
                <a class="readmore_knap" href="produkt.html">Read more</a>
            </div>
            `
    )
    .join("");
  listContainer.innerHTML = markup;
}

// console.log(markup);
