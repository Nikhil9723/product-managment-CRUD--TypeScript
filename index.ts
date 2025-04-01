import { Product } from "./model"

class ProductManagment {
    constructor() {
        this.callIntialEventListner()
        this.deleteProduct()
        this.filterProduct()
        this.getAllProduct("product")
    }
    

    callIntialEventListner() {
        const getProductdata = document.getElementById("add-product-form") as HTMLFormElement;
        let addproductBtn = document.querySelector(".edit-form-btn") as HTMLButtonElement;
        let addProductForm = document.getElementById("addProduct-form") as HTMLFormElement;
        let closeForm = document.getElementById("cross-btn") as HTMLButtonElement;
        console.log(closeForm);
        
        console.log(getProductdata);
        getProductdata.addEventListener("submit", (e: Event) => {
            e.preventDefault();
            let productName = (document.getElementById("product-name")! as HTMLInputElement).value;
            let productPrice = ((document.getElementById("product-price")! as HTMLInputElement)! as HTMLInputElement).value;
            let productimage = ((document.getElementById("product-image")! as HTMLInputElement)! as HTMLInputElement).value;
            let productDescription = (document.getElementById("product-description")! as HTMLInputElement).value
            console.log(productName, productPrice, productimage, productDescription);
            console.log("Helloooo");

            this.addproduct(productName, productPrice, productimage, productDescription);
            addProductForm.style.display = "none"
            this.clearFormInput()
        })

         this.getAllProduct("product");
       


        // image preview in add product form
        let Preview = document.getElementById("product-image") as HTMLInputElement ;
        let previewDiv = document.getElementById("img-preview") as HTMLDivElement;
        let imgPreview = document.createElement("img") as HTMLImageElement;

        Preview.addEventListener("change", (e: Event) => {
            console.log("previewwww");
            previewDiv.style.display = "block"
            let target = e.target;
            if(target instanceof HTMLInputElement) {
                console.log(target.value);
                imgPreview.src = ''
                imgPreview.src = target.value;
                console.log(imgPreview.src);
                previewDiv.appendChild(imgPreview);
            }
        })



        addproductBtn.addEventListener("click", (e: Event) => {
            console.log("add product");
            
                addProductForm.style.display = "flex";
            
        })

        closeForm.addEventListener("click", (e: Event) => {
            
            addProductForm.style.display = "none"
            this.clearFormInput()
        })

    }

    clearFormInput() {
        (document.getElementById("product-name")! as HTMLInputElement).value = "";
        (document.getElementById("product-price")! as HTMLInputElement).value = "";
        (document.getElementById("product-image")! as HTMLInputElement).value = '';
        (document.getElementById("product-descrip)tion")! as HTMLInputElement).value = ""
    }

    addproduct(prodName: string, prodPrice: string, prodImage: string, prodDesc: string) {
  
        const Product: Product = {
            id: crypto.randomUUID(),
            name: prodName,
            price: prodPrice,
            imgUrl: prodImage || "https://icrier.org/wp-content/uploads/2022/12/media-Event-Image-Not-Found.jpg",
            description: prodDesc,
        }
        this.storeProductLocal(Product);
        
    }   

    storeProductLocal(Product:Product) {
        let ManageProduct: Product[] = JSON.parse( localStorage.getItem("product")! )|| [];
        ManageProduct.push(Product);
        localStorage.setItem("product", JSON.stringify(ManageProduct));
        this.getAllProduct("product");
    }

    getAllProduct(productKey: string) {
        let ProductDetails: Product[] = JSON.parse( localStorage.getItem(productKey)! )|| []
        console.log(ProductDetails, "hII");
        this.createProduct(ProductDetails);

        let anchorTag = document.querySelectorAll(".product-a-style") as NodeList;
        anchorTag.forEach((ele) => {
            ele.addEventListener("click", (e) => {
               let target = e.target;
                if(target instanceof HTMLButtonElement) {
                    if (target.tagName === "BUTTON") {
                        e.preventDefault()
                    }
                    console.log(target.tagName);
                }
               
            })
        })
        
    }

    createProduct(ProductDetails: Product[]) {
        const productGroup = document.getElementById("Create-Product-details")! as HTMLDivElement;
        productGroup.innerHTML = ""

        ProductDetails.forEach(ele => {
            productGroup.innerHTML += `<a class = "product-a-style" href="/product.html?productId=${ele.id}">        
                <div class="main-section__product-list--product-1" >
                    <img height="250" width="100%" src=${ele.imgUrl}>
                    <div class="product-details">
                        <span class="name-style">${ele.name}</span>
                        <span class="price-style">₹ ${ele.price}</span>
                        <span class="desc-style">${ele.description}</span>
                        <div class = "edit-delete-style">
                            <button class="edit-btn-style" id = ${ele.id} value = "editProduct">Edit</button>       
                            <button class="delete-btn-style" id = ${ele.id} value = "deleteProduct">Delete</button>
                        </div>
                    </div>
                </div>                 
            </a>`         
        });   
    }

    deleteProduct() {
        const productGroup = document.getElementById("Create-Product-details") as HTMLDivElement
       
        productGroup.addEventListener("click", (e: Event) => {
            let target = e.target as HTMLButtonElement;
            let clc = target.closest("a")!;
            console.log(target.value);
            if(target.value === "deleteProduct") {
                // console.log(e.target.id);
                
                let deleteId = target.id;
                clc.remove()
                console.log("Removed");

                this.updateLocalStorage(deleteId);

            } else if(target.value == "editProduct") {
                // console.log("hiii from else if");
                this.editProduct(target.id)

            }
            else {
                return;
            }
            
           
        })
        this.getAllProduct("product")
    }

     

    
    editProduct(editProductId: string) {
        let submitEditForm = document.querySelector(".mainsection-submit-form")! as HTMLDivElement;
        let editForm = document.getElementById("edit-product-form")! as HTMLFormElement;
        let editProductName = document.getElementById("edit-product-name")! as HTMLInputElement;
        let editProductPrice = document.getElementById("edit-product-price")! as HTMLInputElement;
        let editProductImage = document.getElementById("edit-product-imgUrl")! as HTMLInputElement;
        let editProductDescription = document.getElementById("edit-product-desc")! as HTMLInputElement;
        let ProductDetails:Product[] = JSON.parse( localStorage.getItem("product")! )|| [];

        let closeForm = document.getElementById("close-submit-btn") as HTMLButtonElement;
        submitEditForm.style.display = "flex";

          ProductDetails.map((ele) => {
            if(ele.id === editProductId) {
            console.log(ele.id);
            editProductName.value = ele.name;
            editProductPrice.value = ele.price;
            editProductImage.value = ele.imgUrl;
            editProductDescription.value = ele.description;
            }
        })

        let editPreviewDiv = document.getElementById("img-preview-edit") as HTMLDivElement;
        let editImgPreview = document.createElement("img") as HTMLImageElement;
        editPreviewDiv.style.display = "inline"

        console.log(editProductImage);
        editImgPreview.src = ''
        editImgPreview.src = editProductImage.value;
        console.log(editImgPreview.src);
        editPreviewDiv.appendChild(editImgPreview);
         
        editProductImage.addEventListener("change", (e: Event) => {
            console.log("previewwww");           
            // console.log(e.target.value);
            let target = e.target as HTMLInputElement;
            editImgPreview.src = ''
            editImgPreview.src = target.value;
            console.log(editImgPreview.src);
            editPreviewDiv.appendChild(editImgPreview);
        })

        
        editForm.addEventListener("submit", (e: Event) => {
            e.preventDefault();
            
            ProductDetails.map((ele) => {
                if(ele.id === editProductId) {
                    ele.name = editProductName.value;
                    ele.price = editProductPrice.value;
                    ele.imgUrl = editProductImage.value;
                    ele.description = editProductDescription.value;
                }
            })
            localStorage.setItem("product", JSON.stringify(ProductDetails));
            
            this.getAllProduct("product");
            submitEditForm.style.display = "none"
            

        })

        closeForm.addEventListener("click", (e: Event) => {
            submitEditForm.style.display = "none"
        })


    }

    filterProduct() {
        let filterData = document.getElementById("searchbar")! as HTMLInputElement;
        filterData.addEventListener("input", (e: Event) => {
            let ProductDetails: Product[] = JSON.parse( localStorage.getItem("product")! )|| []
            this.showFilterProduct(filterData.value, ProductDetails);
        })
    }

    showFilterProduct(filterValue: string, ProductDetails: Product[]) {
        filterValue = filterValue.trim();
        let filterArray = ProductDetails.filter((ele) => {
            if( (ele.name.toLowerCase()).includes(filterValue.toLowerCase()) || (ele.description.toLowerCase()).includes(filterValue.toLowerCase())) {
                return ele
            }
            else {
                return;
            }
        })
        console.log(filterArray);

        localStorage.setItem("filterProduct", JSON.stringify(filterArray));
        this.getAllProduct("filterProduct")    
        if(filterValue === "") {
            this.getAllProduct("product")
        }
    }



    updateLocalStorage(deleteProductId: string) {
        console.log(deleteProductId);
        
        let ProductDetails = JSON.parse( localStorage.getItem("product")! )|| []
        console.log(deleteProductId);

        let updatedProductDetails =  ProductDetails.filter((ele: Product) => {
            if(ele.id !== deleteProductId) {
                return ele;
            }
        })

        localStorage.setItem("product", JSON.stringify(updatedProductDetails));        
    }

}

window.addEventListener('DOMContentLoaded', (e: Event) => {
    new ProductManagment();
    })