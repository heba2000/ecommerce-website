
if(document.cookie){
    var navabarName = document.cookie.split(";")[0].split("=")[1];
    console.log(navabarName);
    document.getElementsByClassName("name")[0].innerText = navabarName ;
}
else
location.replace("./sign-up.html")

function logout(){
    var d = new Date();
    d.setDate(d.getDate()-1);
    document.cookie = "username=;expires="+d.toUTCString();
    document.cookie = "password=;expires="+d.toUTCString();
    location.replace("./sign-up.html")
}


//Insert products
var xhr = new XMLHttpRequest();
var productsAll;
xhr.open("get", "js/products.json",true)
xhr.send();
xhr.onreadystatechange = function(){
    if(xhr.status == 200 && xhr.readyState == 4)
     {
        productsAll = JSON.parse(xhr.responseText);
        displayProducts (productsAll.All);  
     }
    }
  
var counter = 0;   
var parentRow = document.getElementById("row-append");
function displayProducts(productsApi){
    var empty = "";
    for(p of productsApi){
        if(counter < 12)
        {
            empty += `<div class="col-lg-3 col-md-6 py-5"><div class="product-item"> <div class="item-img"> <img src="${p.pImg}" class="img-fluid"> </div>
                    </div> <div class="product-details">  <div class="d-flex justify-content-between py-3">
                        <h6> ${p.pName}</h6> <h6> ${p.pPrice} $</h6></div><div class="d-flex justify-content-between">
                    <button class="btn btn-favorite btn-sm"  onclick="addToFavorites('${p.pName}','${p.pImg}','${p.pPrice}')" > <i class="fas fa-heart" ></i> </button>
                    <button class="btn btn-cart btn-sm" onclick="addProduct('${p.pName}','${p.pImg}','${p.pPrice}')">Add to Cart </button>
                    </div></div></div>`
                    parentRow.innerHTML = empty;    
                    counter++;                    
        } 
       
    }
  
}


//load More 
var r = document.getElementById("row-append");
var showMoreBtn = document.getElementById("show-more");

if(r.hasChildNodes)
    {
    showMoreBtn.style.display = "block";
    }
showMoreBtn.addEventListener("click", function displayMore(){
    var empty =   parentRow.innerHTML;
    newCount = counter+4
    var addedProducts = productsAll.All.slice(counter,newCount);
  
    for(p of addedProducts){
        if(counter<newCount)
        {
            empty += `<div class="col-lg-3 col-md-6 py-5"><div class="product-item"> <div class="item-img"> <img src="${p.pImg}" class="img-fluid"> </div>
                </div> <div class="product-details">  <div class="d-flex justify-content-between py-3">
                    <h6> ${p.pName}</h6> <h6> ${p.pPrice} $</h6></div><div class="d-flex justify-content-between">
                <button class="btn btn-favorite btn-sm" onclick="addToFavorites('${p.pName}','${p.pImg}','${p.pPrice}')"  > <i class="fas fa-heart"></i> </button>
                <button class="btn btn-cart btn-sm" onclick="addProduct('${p.pName}','${p.pImg}','${p.pPrice}')">Add to Cart </button>
                </div></div></div>`
                parentRow.innerHTML = empty;              
                counter++;                    
        } 
    }
})


// Button Scroll ///////////////////////////////////////////////
window.onscroll = function() {scrollFunction()};
function scrollFunction() {
    if (document.body.scrollTop > 20) {
        document.getElementById("scroll-btn").style.display = "block";
        document.getElementById("my-nav").style.backgroundColor = "rgba(214, 219, 222, 0.8)"
    } else {
        document.getElementById("scroll-btn").style.display = "none";
        document.getElementById("my-nav").style.backgroundColor = "transparent"
    }
}

document.getElementById("scroll-btn").addEventListener("click" , function scrollFunction() {
    window.scrollTo(0,0); 
}) 

//Add to Cart ///////////////////////////////////////////
var cartProducts;
var cartItem ;

function addProduct(name,image,price){
    alert( name + " Added to cart");  
    if(localStorage.cartProducts)  //if(localStorage.getItem("cartProducts")
    { 
        cartItem = JSON.parse(localStorage.cartProducts);
        // console.log(cartItem);
        if(cartItem[name])
                {
                    cartItem[name].count++
                }
            else
                {
                    cartItem[name] = { name:name , image:image , price:price , count:1};  
                }
        localStorage.cartProducts = JSON.stringify(cartItem);
    }
        else
        {
            cartItem = {};
            cartItem[name] = { name:name , image:image , price:price , count:1};  
            localStorage.cartProducts = JSON.stringify(cartItem);
        }    
        DisplayCartProductsNumber();    
}
    
//Change products count on the cart icon //////////////////////////

var cartCount = 0;
function DisplayCartProductsNumber(){
if(localStorage.cartProducts)
    {   
        if(localStorage.cartNumber)
        {
            // console.log("cart number found")
            localStorage.cartNumber++;
            document.getElementsByClassName("cart-icon")[0].setAttribute("data-notify" , localStorage.cartNumber);

        }
        else
        {
            // console.log("cart number not found")
            cartItem = JSON.parse(localStorage.cartProducts);
            console.log(cartItem);
            for(p in cartItem)
                {
                   cartCount+= cartItem[p].count; 
                   console.log(cartCount);
                }
                localStorage.cartNumber = cartCount
            document.getElementsByClassName("cart-icon")[0].setAttribute("data-notify" , localStorage.cartNumber);

        }

    }

}

//Add to Favorites ///////////////////////////////////////////
var favoriteProducts ; 
var favoriteItem = {}; 
function addToFavorites(name , image , price){
    if(localStorage.favoriteProducts)
    {
        favoriteItem = JSON.parse(localStorage.favoriteProducts);
        console.log(favoriteItem);
        if(favoriteItem[name])
                {
                 alert("Already Added")
                }
            else
                {
                    favoriteItem[name] = { name:name , image:image , price:price , count:1}; 
                    DisplayFavoriteProductsNumber(); 
                }
    }
    else
    {
        favoriteItem = {};
        favoriteItem[name] = { name:name , image:image , price:price , count:1};  
        DisplayFavoriteProductsNumber(); 
    }
    localStorage.favoriteProducts = JSON.stringify(favoriteItem);
}


//Change products count on the favorite icon //////////////////////////
var favoriteCount = 1;
function DisplayFavoriteProductsNumber(){
    if(localStorage.favoritesNumber)
    {
        ++localStorage.favoritesNumber;
        document.getElementsByClassName("favorite-icon")[0].setAttribute("data-notify", localStorage.favoritesNumber)
    }
    else
    {
        for(p in favoriteProducts)
        {
            ++favoriteCount;
        }
        localStorage.favoritesNumber = favoriteCount;
        document.getElementsByClassName("favorite-icon")[0].setAttribute("data-notify", localStorage.favoritesNumber)
    }

}

window.onload = function(){
    if(localStorage.favoritesNumber)
        {  document.getElementsByClassName("favorite-icon")[0].setAttribute("data-notify", localStorage.favoritesNumber)};
    if(localStorage.cartNumber)
        {  document.getElementsByClassName("cart-icon")[0].setAttribute("data-notify", localStorage.cartNumber)};

    

}


//Search Input ////////////////////////
var searchInp = document.getElementById("search-btn");
searchInp.onkeyup = function(){
    var empty = "";
    searchVal = searchInp.value;
    for(p of productsAll.All)
        {
            if(p.pName.toLowerCase().includes(searchVal.toLowerCase()))
            {
                empty += `<div class="col-lg-3 col-md-6 py-5"><div class="product-item"> <div class="item-img"> <img src="${p.pImg}" class="img-fluid"> </div>
                </div> <div class="product-details">  <div class="d-flex justify-content-between py-3">
                    <h6> ${p.pName}</h6> <h6> ${p.pPrice} $</h6></div><div class="d-flex justify-content-between">
                <button class="btn btn-favorite btn-sm"> <i class="fas fa-heart"></i> </button>
                <button class="btn btn-cart btn-sm" onclick="addProduct('${p.pName}','${p.pImg}','${p.pPrice}')">Add to Cart </button>
                </div></div></div>`
                parentRow.innerHTML = empty;  

                console.log(p);
            } 
           
        }
       
}


//////////////////show men/women/all
document.getElementById("men-products").addEventListener("click",function(){
    var menProducts = productsAll.men;  
    counter = 0;
    displayProducts(menProducts);

})
document.getElementById("women-products").addEventListener("click",function(){
    var womenProducts = productsAll.women;  
    counter = 0;
    displayProducts(womenProducts);  
})

document.getElementById("all-products").addEventListener("click",function(){
    var allProducts = productsAll.All;  
    counter = 0;
    displayProducts(allProducts);  
});




////////Slider Code/////////////////////
var slideIndex = 1;
showDivs(slideIndex);

function plusDivs(n) {
  showDivs(slideIndex += n);
  console.log(slideIndex);
}

function showDivs(n) {
  var i;
  var x = document.getElementsByClassName("home");
  if (n > x.length) {slideIndex = 1}
  if (n < 1) {slideIndex = x.length} ;
  for (i = 0; i < x.length; i++) 
  {
      x[i].style.display = "none";
  }
  x[slideIndex-1].style.display = "block";
}

var slideIndex = 0;
automaticSlide();

function automaticSlide() {
  var i;
  var x = document.getElementsByClassName("home");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > x.length) {slideIndex = 1}
  x[slideIndex-1].style.display = "block";
  setTimeout(automaticSlide, 2500); // Change image every 2 seconds
}

////Active for loop///////////////////////
var activs = document.getElementsByClassName("nav-link");
for(let i=0 ; i<activs.length ; i++)
{
    activs[i].addEventListener("click",function(){
        for(let i=0 ; i<activs.length ; i++) { 
            activs[i].classList.remove("active"); 
        }
        this.classList.add("active");
       
    })
}

///Filter by price/////////////////////

var priceRange , firstPrice , secondPrice, matchedProductsArr;
var priceOptions = document.getElementsByClassName("price-option");
for (opt of priceOptions){
        opt.addEventListener("click" , filterByPrice)
}

function filterByPrice(){
    firstPrice = this.innerHTML.split("-")[0];
    secondPrice = this.innerHTML.split("-")[1];
    matchedProductsArr = []
    for(p of productsAll.All)
    {
        if(p.pPrice>=firstPrice && p.pPrice<=secondPrice)
        {
            matchedProductsArr.push(p);
        }    
    }
    counter = 0;
    displayProducts(matchedProductsArr); 
}

var matchedCategory;
var categotyOption = document.getElementsByClassName("category-option");
for (opt of categotyOption){
    opt.addEventListener("click" , filterByCategory)
}


function filterByCategory(){
    categoryName = this.innerHTML.toLowerCase().trim();
    matchedCategory = []
    for(p of productsAll.All)
    {
        if(p.pCategory.toLowerCase() == categoryName)
        {
            matchedCategory.push(p);
        }    
        else 
        {
            var allProducts = productsAll.All;  
            counter = 0;
            displayProducts(allProducts);  
        }
    }
    counter = 0;
    displayProducts(matchedCategory);      
}


