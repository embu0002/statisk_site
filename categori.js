const listContainer = document.querySelector(".category_list_container");
fetch(`https://kea-alt-del.dk/t7/api/categories/`)
  .then((response) => response.json())
  .then((data) => showCategori(data));

function showCategori(categories) {
  const markup = categories
    .map(
      (categories) => `
       
            <a class="forsidetag" href="produktliste.html?category=${categories.category}">${categories.category}</a>
     
            `
    )
    .join("");
  listContainer.innerHTML = markup;
}
