function getSeason () {
    var season = document.getElementById("season");
    season = season.options[season.selectedIndex].text;
    console.log(season)
}

var selectSeason = document.getElementById("season");
selectSeason.addEventListener("change", getSeason);
