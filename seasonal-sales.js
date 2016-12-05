// product, department, price
function getSeason () {
    var season = document.getElementById("season");
    season = season.options[season.selectedIndex].text;
    console.log(season)
}

function logToConsole(e) {
    var productData = JSON.parse(e.target.responseText);
    for (var i = 0; i < productData.products.length; i++) {
        console.log(productData.products[i].name);
        console.log(productData.products[i].price);
    }
}

// event listener on the season select option then run getSeason function
var selectSeason = document.getElementById("season");
selectSeason.addEventListener("change", getSeason);

// get products from JSON file and run logToConsole function
var productData = new XMLHttpRequest();
productData.addEventListener('load', logToConsole);
productData.open("GET", "products.json");
productData.send();

// get reference to div to write products
