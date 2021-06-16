$(function () {
    var url = decodeURI(location.search.slice(1));
    var data = JSON.parse(localStorage.getItem("data"))
    function countryObj(params) {
        return params.name === url
    }
    var country = data.find(countryObj)
    $("#name").html(country.name)
    $("img#flag").attr("src", country.flag);
    var otherNames = '';
    for (let index = 0; index < country.altSpellings.length; index++) {
        otherNames += `<li class="nav-item">${country.altSpellings[index]}</li>`;
    }
    $("#other-names").html(otherNames)
    $("#region").html(country.region)
    var borders = '';
    for (let index = 0; index < country.borders.length; index++) {
        borders += `<li class="nav-item">${country.borders[index]}</li>`;
    }
    $("#borders").html(borders)
    var currencies = '';
    for (let index = 0; index < country.currencies.length; index++) {
        currencies += `<li class="nav-item">${country.currencies[index].name}</li>`;
    }
    $("#currencies").html(currencies)
    var languages = '';
    for (let index = 0; index < country.languages.length; index++) {
        languages += `<li class="nav-item">${country.languages[index].name}</li>`;
    }
    $("#languages").html(languages)
    // $("#").html()
    // $("#").html()


    console.log(country);
})