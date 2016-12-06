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
    discountedPrice();
}
// run productsToHTML function
    // run categoriesToParse function passing productData
        // run discountFunction passing productData and productCategories
        // write to HTML the discounted price and misc data :)

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
    // try taking this function out to see if it will work without
    // discountedPrice();
}

// 6.
function discountedPrice() {
    if (season === productCategories.categories[0].season_discount) {
        for (var i = 0; i < productData.products.length; i++) {
            productData.products[i].price *= (1 - productCategories.categories[0].discount);
            console.log("the season is Winter", productData.products[i].price.toFixed(2));
        }
    } else if (season === productCategories.categories[1].season_discount) {
        for (var i = 0; i < productData.products.length; i++) {
            productData.products[i].price *= (1 - productCategories.categories[1].discount);
            console.log("the season is Autumn", productData.products[i].price.toFixed(2));
        }
    } else if (season === productCategories.categories[2].season_discount) {
        for (var i = 0; i < productData.products.length; i++) {
            productData.products[i].price *= (1 - productCategories.categories[2].discount);
            console.log("the season is Spring", productData.products[i].price.toFixed(2));
        }
    }
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


// 1. This function will use the loadJSON function to load the json file and then run function productsToParse
loadJSON(productData, productsToParse, 'products.json');

// event listener on the season select option then run getSeason function
var selectSeason = document.getElementById("season");
selectSeason.addEventListener("change", getSeason);
