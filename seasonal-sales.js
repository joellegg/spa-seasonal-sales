// product (products name), department (products categories_id === categories id), price (products price + categories discount)
var productData;
var productCategories;
var season;
// reference to HTML products and categories
var categoriesHTML = document.getElementById('categories');
var productsHTML = document.getElementById('products');

function getSeason() {
    season = document.getElementById("season");
    season = season.options[season.selectedIndex].text;
    console.log(season)
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
    writeToHTML();
}

// 6.
function writeToHTML() {
    // change category id to category name
    for (var i = 0; i < productData.products.length; i++) {
        var department = productData.products[i].category_id
        if (department === 1) {
            department = 'Winter';
        } else if (department === 2) {
            department = 'Autumn';
        } else if (department === 3) {
            department === 'Spring';
        } else {
            alert('missing department for ' + productData.products[i].name)
        }
        var newDiv = document.createElement('div');
        newDiv.innerHTML = `
            <h2>Item: ${productData.products[i].name}</h2>
            <h4>Price: ${productData.products[i].price}</h4>
            <h4>Department: ${department}</h4>
        `;
        productsHTML.appendChild(newDiv);
    }
    for (var i = 0; i < productCategories.categories.length; i++) {
    var newDiv = document.createElement('div');
    newDiv.innerHTML = `
        <h2>The id is ${productCategories.categories[i].id}</h2>
        <h4>The name is ${productCategories.categories[i].name}</h4>
        <h4>The season is ${productCategories.categories[i].season_discount}</h4>
        <h4>The discount is ${productCategories.categories[i].discount}</h4>
    `;
    categoriesHTML.appendChild(newDiv);
    }
    var discountedPrice = productData.products[0].price * (1 - productCategories.categories[0].discount);
    console.log(discountedPrice.toFixed(2));
    console.log('4.99 * (1-0.1) = 4.49');
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
