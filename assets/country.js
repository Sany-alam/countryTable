$(function () {
    var headingOne,headingTwo,headingThree,headingFour,headingFive = false;
    var url = decodeURI(location.search.slice(1));
    if (url.length<1) {
        window.location.href = "index.html";
    }
    var data = JSON.parse(localStorage.getItem("data"))
    function countryObj(params) {
        return params.name === url
    }
    var country = data.find(countryObj)
    $("#name").html(country.name)
    // $("img#flag").attr("src", country.flag);
    $("#flag").css("background-image", "url('"+ country.flag +"')");
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
    
    $("#headingOne").click(function() {
        if (headingOne) {
            headingOne = false
            $("#headingOne").css("background-color","")
            $("#headingOneIcon").attr("data-glyph","chevron-bottom")
        }else{
            headingOne = true
            $("#headingOne").css("background-color","#3EA2BD")
            $("#headingOneIcon").attr("data-glyph","chevron-top")
        }
    })
    $("#headingTwo").click(function() {
        if (headingTwo) {
            headingTwo = false
            $("#headingTwo").css("background-color","")
            $("#headingTwoIcon").attr("data-glyph","chevron-bottom")
        }else{
            headingTwo = true
            $("#headingTwo").css("background-color","#3EA2BD")
            $("#headingTwoIcon").attr("data-glyph","chevron-top")
        }
    })
    $("#headingThree").click(function() {
        if (headingThree) {
            headingThree = false
            $("#headingThree").css("background-color","")
            $("#headingThreeIcon").attr("data-glyph","chevron-bottom")
        }else{
            headingThree = true
            $("#headingThree").css("background-color","#3EA2BD")
            $("#headingThreeIcon").attr("data-glyph","chevron-top")
        }
    })
    $("#headingFour").click(function() {
        if (headingFour) {
            headingFour = false
            $("#headingFour").css("background-color","")
            $("#headingFourIcon").attr("data-glyph","chevron-bottom")
        }else{
            headingFour = true
            $("#headingFour").css("background-color","#3EA2BD")
            $("#headingFourIcon").attr("data-glyph","chevron-top")
        }
    })
    $("#headingFive").click(function() {
        if (headingFive) {
            headingFive = false
            $("#headingFive").css("background-color","")
            $("#headingFiveIcon").attr("data-glyph","chevron-bottom")
        }else{
            headingFive = true
            $("#headingFive").css("background-color","#3EA2BD")
            $("#headingFiveIcon").attr("data-glyph","chevron-top")
        }
    })
})