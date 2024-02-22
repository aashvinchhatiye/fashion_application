// 1.getlimited products from api and show



    // 2.getallproducts from api..


    // 3. getallcategoryproducts from api ..



    // 4.getsingle products from api...
////


async function getlimitedproducts(){
    try {
        let str=''
        let res = await axios.get('https://fakestoreapi.com/products?limit=8')
        res.data.forEach((itmes,index)=>{
            str+=`<a href='#' onclick='GetSingleProducts(${itmes.id})'>
            <div class="col-lg-3 col-md-6 col-sm-6 col-md-6 col-sm-6 mix new-arrivals">
            <div class="product__item text-center">
                <div class="product__item__pic set-bg" data-setbgs>
                <img src=${itmes.image}  height='250'/>
                    <span class="label">New</span>
                    <br/>
                    <h6 class='mt-2 mb-3'>${itmes.category}</h6>
                        
                </div>
                <div class="product__item__text">
                    
                    <a href="#" class="add-cart"onclick='AddToCart(${itmes.id})'>+ Add To Cart</a>
                    
                    <h5 class='mt-2'>$${itmes.price}</h5>
                   
                </div>
            </div>
        </div>
        
          </a>  `
        })
        
        document.getElementById("limeted_data").innerHTML=str;
        
    } catch (error) {
        
    }

}
getlimitedproducts()

// get all products / 
async function getAllProducts(){
    try { let str=''
    let res = await fetch('https://fakestoreapi.com/products');
    let data = await res.json()
      data.forEach((itmes,index)=>{
          str+=`<a href='#'  onclick='GetSingleProducts(${itmes.id})'>
          <div class="col-lg-3 col-md-6 col-sm-6 col-md-6 col-sm-6 mix new-arrivals">
          <div class="product__item text-center">
              <div class="product__item__pic set-bg" data-setbgs>
              <img src=${itmes.image}  height='250'/>
                  <span class="label">New</span>
                  <br/>
                  <h6 class='mt-2 mb-3'>${itmes.category}</h6>
                      
              </div>
              <div class="product__item__text">
                  
                  <a href="#" class="add-cart " onclick='AddToCart(${itmes.id})'>+ Add To Cart</a>
                  
                  <h5 class='mt-2'>$${itmes.price}</h5>
                 
              </div>
          </div>
      </div>
      
        </a>  `
          
          
      })
        
 
    document.getElementById("allcategory").innerHTML=str;
} catch (error) {
        
}

}
getAllProducts()
// /  get all category from api like electronics, ,mens, woman,jawelary  / 
async function getAllCategory(){
    try {
        let result=''
        let res =  await axios.get("https://fakestoreapi.com/products/categories")
        res.data.forEach((itmes,index)=>{
          result+=`    <li><a href="#" onclick='getallcategoryproducts(this)' >${itmes}</a></li>
          `
        })
        document.getElementById('Categories-data').innerHTML=result
    } catch (error) {
        
    }


}
getAllCategory()
// get all categoryproducts data for api 
//&  set data to local stotrage..
async function getallcategoryproducts(t){
    
        let category_name = t.innerText.toLowerCase();
        let res = await axios.get(`https://fakestoreapi.com/products/category/${category_name}`)
         localStorage.setItem('category_products', JSON.stringify(res.data))
         window.location='categorey-products.html';
       
        
    } 
// get data from local storage for all catogory data 
function getallcategoryProductsFromLocalStorage(){
    try {
        let str=''
        let res 
     let catdata = localStorage.getItem("category_products");
    if(catdata!=null){
      res = JSON.parse(catdata)
    } 
    res.forEach((itmes,index)=>{
        str+=
        `<a href='#'  onclick='GetSingleProducts(${itmes.id})'>
        <div class="col-lg-3 col-md-6 col-sm-6 col-md-6 col-sm-6 mix new-arrivals">
        <div class="product__item text-center">
            <div class="product__item__pic set-bg" data-setbgs>
            <img src=${itmes.image}  height='250'/>
                <span class="label">New</span>
                <br/>
                <h6 class='mt-2 mb-3'>${itmes.category}</h6>
                    
            </div>
            <div class="product__item__text">
                
                <a href="#" class="add-cart " onclick='AddToCart(${itmes.id})'>+ Add To Cart</a>
                
                <h5 class='mt-2'>$${itmes.price}</h5>
               
            </div>
        </div>
    </div>
    
      </a> `
    }) 
    document.getElementById('allcategoryproducts').innerHTML=str;
    
    } catch (error) {
        
    }
    
       
    
}
getallcategoryProductsFromLocalStorage()


// get limited products../
// &
// set data from local storage
 async function GetSingleProducts(pid){
 let res = await axios.get(`https://fakestoreapi.com/products/${pid}`)
localStorage.setItem("singleproducsdata",JSON.stringify(res.data))
 window.location='shop-details.html'

}



// add to cart and set to local storage
async function AddToCart(productid){

  let result = localStorage.getItem("cartdata")
   if(result!=null){
    arr = JSON.parse(result)
  }

  else{
    arr = []
  }
  let cartdata = arr.filter((items)=>{
    return items.id == productid
})
if(cartdata.length > 0){
    alert("This Product is Allready Adeed")
}
else{
    let res = await axios.get(`https://fakestoreapi.com/products/${productid}`)
    arr.push(res.data)
    localStorage.setItem("cartdata",JSON.stringify(arr))
    cartCount()
}
 
}

// get cart data -------------------------

function getCartData(){
    // let tootalcart=0;
    try {
        let result = localStorage.getItem('cartdata');
    if(result != null) {
        arr = JSON.parse(result);
    }
    else {
        arr =  []
    }
    let cart = "";
    arr.forEach((items, index)=>{
        cart += `<tr>
        <td class="product__cart__item">
            <div class="product__cart__item__pic">
                <img src="${items.image}" width="100px" alt="">
            </div>
            <div class="product__cart__item__text">
                <h6>${items.title}</h6>
            </div>
        </td>
        <td class="cart__price">$ ${items.price}</td>
        <td class="cart__close"><i  class="fa fa-close" onclick='DeleteProduct(${items.id})'></i></td>
    </tr>`
    // tootalcart+=items.price
    })
    let totalprice = arr.reduce((total,items)=>{
            return total+items.price
    },0)
    // console.log(totalprice)
    // console.log(tootalcart);
    document.getElementById('cart-data').innerHTML = cart;
    document.getElementById("totalprice").innerHTML = `<li>Subtotal <span>$ ${totalprice} </span></li>
     <li>Total <span>$ ${totalprice}</span></li>`
    } catch (error) {
        
    }
    
}
getCartData();
// delete cart data ------------------
function DeleteProduct(did){
    alert("You Are Sure This Product Was Remove From Your Cart ")
    try {
        let result = localStorage.getItem('cartdata');
        if(result != null) {
            arr = JSON.parse(result);
        }
        else {
            arr =  []
        }
       let newarr = arr.filter((items)=>{
         return items.id != did
        });
        localStorage.setItem("cartdata",JSON.stringify(newarr));
        getCartData()
    
        
    } catch (error) {
        
    }
   
}



// count card/
function cartCount(){
    try {
        let result = localStorage.getItem('cartdata');
        if(result != null) {
            arr = JSON.parse(result);
        }
        else {
            arr =  []
        }
        let pricedata= document.getElementsByClassName("price");
        for(let x of pricedata ){
         x.innerHTML = arr.length;
        }
    } catch (error) {   
    }
}
cartCount();




