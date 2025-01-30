let productId = 1163;
let productContainer = document.querySelector(".productContainer");
fetch(`https://kea-alt-del.dk/t7/api/products/${productId}`)
  .then((response) => response.json())
  .then((data) => {
    productContainer.innerHTML = `
      
            <div class="produkt_billede">
                <img src="https://kea-alt-del.dk/t7/images/webp/640/${data.id}.webp" alt="1163">
            </div>

            <div>
                <h1 class="h1påprodukt">Product information</h1>
                <p>Product name</p>
                <h4>${data.productdisplayname}</h4>
                <h4>${data.variantname}</h4>
                <p>Product ID</p>
                <h4>${data.id}</h4>

                <h2>${data.brandname}</h2>
                <p>Nike creating experiences or today's athlete</p>
            </div>
            <div class="productcard">
                <h2 class="h2_procuctcard">${data.productdisplayname}</h2>
                <p>Nike / Tshirts</p>
               
                <h4>Pris ${data.price} kr</h4>
                <label for="size">Choose a size</label>
                <select id="size" name="size">
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                </select>

                <button>Add to basket</button>
            </div>
    `;
  });
