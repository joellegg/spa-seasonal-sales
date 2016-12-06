// product (products name), department (products categories_id === categories id then category name), price (products price + categories discount)
var productData;
var productCategories;
var currentSeason;
// reference to HTML products and categories
var categoriesHTML = document.getElementById('categories');
var productsHTML = document.getElementById('products');
var productDepartment;

// 1. This function will use the loadJSON function to load the json file and then run function productsToParse
loadJSON(productData, productsToParse, 'products.json');

// 2., 4.
function loadJSON (varData, functionToRun, jsonFile) {
    var varData = new XMLHttpRequest();
    varData.addEventListener('load', functionToRun);
    varData.open("GET", jsonFile);
    varData.send();
}

// 3.
function productsToParse(e) {
    productData = JSON.parse(e.target.responseText);
    loadJSON(productCategories, categoriesToParse, 'categories.json');
}

// 5.
function categoriesToParse(e) {
    productCategories = JSON.parse(e.target.responseText);
    getSeason();
}

// 6.
function getSeason() {
    currentSeason = document.getElementById("season");
    currentSeason = currentSeason.options[currentSeason.selectedIndex].text;
    getCategory();
}

// 7.
function getCategory() {
    // change category id to category name (ie category_id 1 = apparel)
    for (var i = 0; i < productData.products.length; i++) {
        if (productData.products[i].category_id === productCategories.categories[0].id) {
            productData.products[i].category_id = productCategories.categories[0].name;
        } else if (productData.products[i].category_id === productCategories.categories[1].id) {
            productData.products[i].category_id = productCategories.categories[1].name;
        } else if (productData.products[i].category_id === productCategories.categories[2].id) {
            productData.products[i].category_id = productCategories.categories[2].name;
        }
    }
    discountedPrice();
}

// 8.
function discountedPrice() {
    for (var i = 0; i < productData.products.length; i++) {
        if (currentSeason === productCategories.categories[0].season_discount && productData.products[i].category_id === productCategories.categories[0].name) {
            productData.products[i].price *= (1 - productCategories.categories[0].discount);
        } else if (currentSeason === productCategories.categories[1].season_discount && productData.products[i].category_id === productCategories.categories[1].name) {
            productData.products[i].price *= (1 - productCategories.categories[1].discount);
        } else if (currentSeason === productCategories.categories[2].season_discount && productData.products[i].category_id === productCategories.categories[2].name) {
            productData.products[i].price *= (1 - productCategories.categories[2].discount);
        }
    }
    writeToHTML();
}

// 9.
function writeToHTML() {
    productsHTML.innerHTML = "";
    for (var i = 0; i < productData.products.length; i++) {
        productsHTML.innerHTML += `
            <h2>Item: ${productData.products[i].name}</h2>
            <h4>Price: ${productData.products[i].price.toFixed(2)}</h4>
            <h4>Department: ${productData.products[i].category_id}</h4>
        `;
    }
}

// event listener on the season select option then run getSeason function
var selectSeason = document.getElementById("season");
selectSeason.addEventListener("change", getSeason);
