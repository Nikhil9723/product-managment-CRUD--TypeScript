import { Product } from "./model";

let productName = document.getElementById("product-name")! as HTMLParagraphElement;
console.log(productName);

let productPrice = document.getElementById("product-price")! as HTMLParagraphElement;
let productDescription = document.getElementById("product-description")! as HTMLParagraphElement


let ProductDetails = JSON.parse( localStorage.getItem("product")! )|| []
let productImage = document.getElementById("product-img")! as HTMLImageElement;
// console.log(ProductDetails);

// Using a custom URL string
// const myUrl1 = new URL(`http://127.0.0.1:5500/product.html?productId=`);


// Using the current page's URL
const myUrl2 = new URL(window.location.toLocaleString());

const productId: string = myUrl2.searchParams.get("productId")!;
console.log(productId);

// console.log(productImage.src);


const findProduct: Product = ProductDetails.map((item: Product) => {
    return item.id === productId
})

if(findProduct) {
    productName.textContent = findProduct.name;
    productPrice.textContent = `₹ ${findProduct.price}`;
    productDescription.textContent = findProduct.description;
    productImage.src = findProduct.imgUrl;
}