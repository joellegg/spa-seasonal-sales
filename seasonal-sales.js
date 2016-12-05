// product (products name), department (products categories_id === categories id), price (products price + categories discount)
function getSeason () {
    var season = document.getElementById("season");
    season = season.options[season.selectedIndex].text;
    console.log(season)
}

function productsToConsole(e) {
    var productData = JSON.parse(e.target.responseText);
    var productsHTML = document.getElementById('products');
    for (var i = 0; i < productData.products.length; i++) {
        var newDiv = document.createElement('div');
        newDiv.innerHTML = `
            <h2>The id is ${productData.products[i].id}</h2>
            <h4>The name is ${productData.products[i].name}</h4>
            <h4>The price is ${productData.products[i].price}</h4>
            <h4>The category id is ${productData.products[i].category_id}</h4>
        `;
        productsHTML.appendChild(newDiv);
    }
}

function categoriesToConsole(e) {
    var productCategories = JSON.parse(e.target.responseText);
    for (var i = 0; i < productCategories.categories.length; i++) {
        console.log('id is ' + productCategories.categories[i].id);
        console.log('name is ' + productCategories.categories[i].name);
        console.log('season is ' + productCategories.categories[i].season);
        console.log('discount is ' + productCategories.categories[i].discount);
    }
}

// get products from JSON file and run logToConsole function
var productData = new XMLHttpRequest();
productData.addEventListener('load', productsToConsole);
productData.open("GET", "products.json");
productData.send();

// get categories from JSON file and run logToConsole function
var productCategories = new XMLHttpRequest();
productCategories.addEventListener('load', categoriesToConsole);
productCategories.open("GET", "categories.json");
productCategories.send();

// event listener on the season select option then run getSeason function
var selectSeason = document.getElementById("season");
selectSeason.addEventListener("change", getSeason);
