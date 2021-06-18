$(function () {
    var url = decodeURI(location.search.slice(1));
    if (url.length<1) {
        window.location.href = "index.html";
    }
    var data = JSON.parse(localStorage.getItem("data"))
    function countryObj(params) {
        return params.name === url
    }
    var country = data.find(countryObj)
    document.getElementById("name").innerHTML = country.name;
    document.getElementById("flag").style.backgroundImage = "url('"+country.flag+"')"
    var otherNames = '';
    for (let index = 0; index < country.altSpellings.length; index++) {
        otherNames += `<li class="nav-item">${country.altSpellings[index]}</li>`;
    }
    document.getElementById("other-names").innerHTML = otherNames
    document.getElementById("region").innerHTML = country.region
    var borders = '';
    for (let index = 0; index < country.borders.length; index++) {
        borders += `<li class="nav-item">${country.borders[index]}</li>`;
    }
    document.getElementById("borders").innerHTML = borders
    var currencies = '';
    for (let index = 0; index < country.currencies.length; index++) {
        currencies += `<li class="nav-item">${country.currencies[index].name}</li>`;
    }
    document.getElementById("currencies").innerHTML = currencies
    var languages = '';
    for (let index = 0; index < country.languages.length; index++) {
        languages += `<li class="nav-item">${country.languages[index].name}</li>`;
    }
    document.getElementById("languages").innerHTML = languages
    
    var nav = document.querySelector("nav");
    var items = nav.getElementsByClassName("item");
    var icon = nav.getElementsByClassName("oi-bottom-icon");
    var status = [];
    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        status[i] = false;
        item.addEventListener("click",function () {
            if (!status[i]) {
                item.style.backgroundColor = "#3EA2BD";
                icon[i].setAttribute("data-glyph","chevron-top")
                status[i] = true;
            }else{
                item.style.backgroundColor = "";
                icon[i].setAttribute("data-glyph","chevron-bottom")
                status[i] = false;
            }
        })
    }
})