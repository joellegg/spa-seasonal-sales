// product (products name), department (products categories_id === categories id then category name), price (products price + categories discount)
var productData;
var productCategories;
var currentSeason;
// reference to HTML products and categories
var categoriesHTML = document.getElementById('categories');
var productsHTML = document.getElementById('products');
var productDepartment;

// event listener on the season select option then run getSeason function
var selectSeason = document.getElementById("season");
selectSeason.addEventListener("change", getSeason);

// 1. This function will use the loadJSON function to load the json file and then run function productsToParse
loadJSON(productsToParse, 'products.json');

// 2., 4.
function loadJSON (functionToRun, jsonFile) {
    var newRequest = new XMLHttpRequest();
    newRequest.addEventListener('load', functionToRun);
    newRequest.open("GET", jsonFile);
    newRequest.send();
}

// 3.
function productsToParse(e) {
    productData = JSON.parse(e.target.responseText);
    loadJSON(categoriesToParse, 'categories.json');
}

// 5.
function categoriesToParse(e) {
    productCategories = JSON.parse(e.target.responseText);
    getSeason();
}

// 6.
function getSeason() {
    var seasonElement = document.getElementById("season");
    currentSeason = seasonElement.options[seasonElement.selectedIndex].text;
    // console.log(currentSeason);
    getCategory();
}

// 7.
function getCategory() {
    // change category id to category name (ie category_id 1 = apparel)
    for (var i = 0; i < productData.products.length; i++) {
        for (var k = 0; k < productCategories.categories.length; k++)
            if (productData.products[i].category_id === productCategories.categories[k].id) {
                productData.products[i].category_name = productCategories.categories[k].name;
                productData.products[i].discounted_season = productCategories.categories[k].season_discount;
                //console.log("product dis, cat dis", productData.products[i].discounted_season, productCategories.categories[k].season_discount);
                //console.log("product-category", productData.products[i].category_name, productCategories.categories[k].name);
        }
    }
    discountedPrice();
}

// 8.
function discountedPrice() {
    for (var i = 0; i < productData.products.length; i++) {
        for (var k = 0; k < productCategories.categories.length; k++) {
            if (currentSeason === productCategories.categories[k].season_discount && productData.products[i].category_name === productCategories.categories[k].name) {
                productData.products[i].discounted_price = (productData.products[i].price * (1 - productCategories.categories[k].discount));
                //console.log('season discount', currentSeason, productCategories.categories[k].season_discount, productData.products[i].category_name, productCategories.categories[k].name);
            }
        }
    }
    //console.log(productData.products);
    writeToHTML();
}

// 9. if statement to determine prices to post
function writeToHTML() {
    productsHTML.innerHTML = "";
    for (var i = 0; i < productData.products.length; i++) {
        // if current season is the discount season then show discounted price
        if (currentSeason === productData.products[i].discounted_season) {
            productsHTML.innerHTML += `
                <h2>Item: ${productData.products[i].name}</h2>
                <h4>Price: ${productData.products[i].discounted_price.toFixed(2)}</h4>
                <h4>Department: ${productData.products[i].category_name}</h4>
            `;
        }
        // else show the full price
        else {
            productsHTML.innerHTML += `
                <h2>Item: ${productData.products[i].name}</h2>
                <h4>Price: ${productData.products[i].price.toFixed(2)}</h4>
                <h4>Department: ${productData.products[i].category_name}</h4>
            `;
        }
    }
}
