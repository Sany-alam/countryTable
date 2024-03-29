var reversedRegion = false;
var reversedName = false;
var reversedpopulation = false;

theme();
gettingData();
countingCart();
cartList();

document.getElementById("theme").addEventListener("change",function () {
  const theme = this.value;
  changing = theme === "light" ? "dark" : "light";
  localStorage.setItem("Theme", theme);
  document.querySelector("table").classList.add("table-" + theme);
  document.querySelector("table").classList.remove("table-" + changing);
});

function theme() {
  var theme = localStorage.getItem("Theme") !== null?localStorage.getItem("Theme"):localStorage.setItem("Theme", "dark");
  document.querySelector("table").classList.add("table-" + theme);
  document.getElementById("theme").value = theme;
}

document.getElementById("name").addEventListener("click",function () {
  if (!reversedName) {
    data = JSON.parse(localStorage.getItem("data")).reverse();
  }else{
    data = JSON.parse(localStorage.getItem("data")).reverse().reverse();
  }
  getData(data)
  if (reversedName) {
    reversedName = false;
  }else{
    reversedName = true;
  }
})


document.getElementById("population").addEventListener("click",function () {
  var data = JSON.parse(localStorage.getItem("data"))
  if (!reversedpopulation) {
    data.sort((a,b) => a.population - b.population)
    reversedpopulation = true;
  }else{
    data.sort((a,b) => b.population - a.population)
    reversedpopulation = false;
  }
  getData(data)
})

document.getElementById("region").addEventListener("click",function () {
  var data = JSON.parse(localStorage.getItem("data"))
  if (!reversedRegion) {
    reversedRegion = true
    data.sort(function(a,b){
      regionA = a.region.toUpperCase()
      regionB = b.region.toUpperCase()
      if (regionA<regionB) {
        return -1
      }
      if(regionA>regionB){
        return 1
      }
      return 0
    })
  }else{
    reversedRegion = false
    data.sort(function(a,b){
      regionA = a.region.toUpperCase()
      regionB = b.region.toUpperCase()
      if (regionA<regionB) {
        return 1
      }
      if(regionA>regionB){
        return -1
      }
      return 0
    })
  }
  getData(data)
})

document.getElementById("search").addEventListener("keyup",function() {
  const search = this.value;
  console.log(search);
  data = search.length > 0 ? JSON.parse(localStorage.getItem("data")).filter(function(country){
    return country.name.toLowerCase().includes(search) || country.name.toUpperCase().includes(search);
  }):JSON.parse(localStorage.getItem("data"));
  getData(data);
})

async function gettingData() {
  var data = [];
  if (localStorage.getItem("data") != null) {
    data = JSON.parse(localStorage.getItem("data"));
  } else {
    await fetch("https://restcountries.eu/rest/v2/all")
    .then((res) => {
      return res.json();
    })
    .then((resData) => {
      localStorage.setItem("data", JSON.stringify(resData));
      data = resData;
    });
  }
  getData(data);
}

function getData(data) {
  var language = "";
  var rows = '';
  var btn = '';
  for (let index = 0; index < data.length; index++) {
    for (let l = 0; l < data[index].languages.length; l++) {
      language += data[index].languages[l].name + "<br>";
    }
    if (localStorage.getItem("cart")!=null) {
        function filterItems(arr, query) {
          return arr.filter(function(el) {
              return el.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
          })
        }
        if (filterItems(JSON.parse(localStorage.getItem("cart")),data[index].name).length>0) {
          btn = `<button class="btn btn-outline-primary" disabled>Buy</button>`;
        }else{
          btn = `<button class="btn btn-primary" onclick="buy('${data[index].name}')">Buy</button>`;
        }
    }else{
      btn = `<button class="btn btn-primary" onclick="buy('${data[index].name}')">Buy</button>`;
    }
    tableData = `<tr>
    <td><img alt="flag" class="img-fluid" src="${data[index].flag}"></td>
    <td><a href="country.html?${data[index].name}">${data[index].name}</a></td>
    <td>${data[index].population}</td>
    <td>${data[index].region}</td>
    <td>${language}</td>
    <td>`+btn+`</td>
    </tr>`;
    language = "";
    rows += tableData
  }
  document.getElementById("table-data").innerHTML = rows;
}

function buy(countryName) {
  var cart = [];
  var data = JSON.parse(localStorage.getItem("data"));
  function isCountry(country) {
    return country.name === countryName;
  }
  var newCountry = data.find(isCountry)
  if (localStorage.getItem("cart")!==null) {
    cart = JSON.parse(localStorage.getItem("cart"))
    cart[JSON.parse(localStorage.getItem("cart")).length] = newCountry;
    localStorage.setItem("cart", JSON.stringify(cart))
  }else{
    localStorage.setItem("cart", JSON.stringify([newCountry]))
  }
  countingCart();
  cartList();
  getData(data);
}

function countingCart() {
  if (localStorage.getItem("cart")!==null) {
    document.getElementById("count-cart").innerHTML = JSON.parse(localStorage.getItem("cart")).length
  }else{
    document.getElementById("count-cart").innerHTML = 0;
  }
}

function cartList() {
  if (localStorage.getItem("cart")!=null) {
    if (JSON.parse(localStorage.getItem("cart")).length>=1) {
      var cart = JSON.parse(localStorage.getItem("cart"));
      var cartList = '';
      for (let index = 0; index < cart.length; index++) {
        cartList += `<li class="nav-item p-3">
        <img height="40px" width="80px" alt="flag" class="img-fluid" src="${cart[index].flag}">
        <a href="country.html?${cart[index].name}">${cart[index].name}</a>
        <button class="btn btn-sm btn-outline-danger" onclick="deleteCartItem(${index})">Delete</button>
    </li>`;
      }
      document.getElementById("cart-list").innerHTML = cartList;
    }else{
      document.getElementById("cart-list").innerHTML = `<li><h3 class="p-4">Your Cart is empty</h3></li>`;
    }
  }else{
    document.getElementById("cart-list").innerHTML = `<li><h3 class="p-4">Your Cart is empty</h3></li>`;
  }
}

function deleteCartItem(index) {
  cart = JSON.parse(localStorage.getItem("cart"));
  specificItem = JSON.parse(localStorage.getItem("cart"))[index];
  updatedCart = cart.filter(el => el.name !== specificItem.name)
  localStorage.setItem("cart", JSON.stringify(updatedCart))
  cartList()
  countingCart()
  getData(JSON.parse(localStorage.getItem("data")));
}

/* Set the width of the side navigation to 250px and the left margin of the page content to 250px */
function openNav() {
  document.getElementById("mySidenav").style.width = "320px";
  document.querySelector("body").style.backgroundColor = "#000";
  document.getElementById("main").style.opacity = "0.5";
}

/* Set the width of the side navigation to 0 and the left margin of the page content to 0 */
function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  document.getElementById("main").style.opacity = "1";
  document.querySelector("body").style.backgroundColor = "";
}
