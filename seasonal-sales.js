// product (products name), department (products categories_id === categories id then category name), price (products price + categories discount)
var productData;
var productCategories;
var season;
// reference to HTML products and categories
var categoriesHTML = document.getElementById('categories');
var productsHTML = document.getElementById('products');
var productDepartment;

function getSeason() {
    season = document.getElementById("season");
    season = season.options[season.selectedIndex].text;
    console.log(season)
    discountedPrice();
}
// run productsToHTML function
    // run categoriesToParse function passing productData
        // run discountFunction passing productData and productCategories
        // write to HTML the discounted price and misc data :)

// 3.
function productsToParse(e) {
    productData = JSON.parse(e.target.responseText);
    loadJSON(productCategories, categoriesToParse, 'categories.json');
}

// 5.
function categoriesToParse(e) {
    productCategories = JSON.parse(e.target.responseText);
    getSeason();
    // try taking this function out to see if it will work without
    // discountedPrice();
}

// 6.
function discountedPrice() {
    console.log('Dicounted price ', season)
    if (season = productCategories.categories[0].season_discount) {
        for (var i = 0; i < productData.products.length; i++) {
            productData.products[i].price *= (1 - productCategories.categories[0].discount)
        }
    } else if (season = productCategories.categories[1].season_discount) {
        for (var i = 0; i < productData.products.length; i++) {
            productData.products[i].price *= (1 - productCategories.categories[1].discount)
        }
    } else if (season = productCategories.categories[2].season_discount) {
        for (var i = 0; i < productData.products.length; i++) {
            productData.products[i].price *= (1 - productCategories.categories[2].discount)
        }
    }
    writeToHTML();
}

// 7.
function writeToHTML() {
    // change category id to category name (ie category_id 1 = apparel)
    for (var i = 0; i < productData.products.length; i++) {
        if (productData.products[i].category_id === productCategories.categories[0].id) {
            productDepartment = productCategories.categories[0].name;
        } else if (productData.products[i].category_id === productCategories.categories[1].id) {
            productDepartment = productCategories.categories[1].name;
        } else if (productData.products[i].category_id === productCategories.categories[2].id) {
            productDepartment = productCategories.categories[2].name;
        } else {
            alert('missing department for ' + productData.products[i].name)
        }
        var newDiv = document.createElement('div');
        newDiv.innerHTML = `
            <h2>Item: ${productData.products[i].name}</h2>
            <h4>Price: ${productData.products[i].price}</h4>
            <h4>Department: ${productDepartment}</h4>
        `;
        productsHTML.appendChild(newDiv);
    }
}

// 2., 4.
function loadJSON (varData, functionToRun, jsonFile) {
    var varData = new XMLHttpRequest();
    varData.addEventListener('load', functionToRun);
    varData.open("GET", jsonFile);
    varData.send();
}

// 1. This function will use the loadJSON function to load the json file and then run function productsToParse
loadJSON(productData, productsToParse, 'products.json');

// event listener on the season select option then run getSeason function
var selectSeason = document.getElementById("season");
selectSeason.addEventListener("change", getSeason);
