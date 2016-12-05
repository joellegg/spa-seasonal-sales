function getSeason () {
    var season = document.getElementById("season");
    season = season.options[season.selectedIndex].text;
    console.log(season)
}

var selectSeason = document.getElementById("season");
selectSeason.addEventListener("change", getSeason);

var productData = new XMLHttpRequest();
productData.addEventListener('load', executeSomeCodeAfterLoad);
productData.open("GET", "product.json");
myRequest.send();
