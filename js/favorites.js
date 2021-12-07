
var favoritesRow = document.getElementById("favorites-append-row");
function displayFavorites(){
 var fItems = "";
 if(localStorage.favoriteProducts)
 {
    favoriteItem = JSON.parse(localStorage.favoriteProducts);  
   for (f in favoriteItem)
   {
         fItems+=  ` <div class="col-lg-3 col-md-6 my-1">
         <div class="card" style="width: 16rem;">
             <img src="${favoriteItem[f].image}" class=" img-fluid" >
             <div class="card-body d-flex justify-content-between align-items-center">
                 <h5 class="card-title">${favoriteItem[f].name}</h5>
                 <h6>${favoriteItem[f].price}$</h6>
             </div>
             <a class="btn btn-favorite btn-sm" onclick="removeFavorite('${favoriteItem[f].name}')" >Remove from favorites</a>
         </div>
     </div>` ;

         favoritesRow.innerHTML = fItems
   }

 }

}
displayFavorites();

/////////////////////Remove from favorites
function removeFavorite(favoriteItemName){
  
  for(f in favoriteItem)
  {
     if(favoriteItem[f].name ==favoriteItemName)
     {
      var deleteCheck = confirm (`Are you sure you want to remove ${favoriteItemName} from your favorites`)  
         if(deleteCheck)
            {
               delete favoriteItem[favoriteItemName];
               localStorage.favoriteProducts = JSON.stringify(favoriteItem);
            
            } 
     }
     displayFavorites();
  }

}







