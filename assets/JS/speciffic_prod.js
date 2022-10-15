let slider_img = 
["assets/img/FRidges/Extractor Hood cieling.png","assets/img/FRidges/industrial drink fridge.png","assets/img/FRidges/industrial freezing box.png","assets/img/FRidges/home surveilance.png",
"assets/img/FRidges/home surveilance.png"]
let i=0;

let right_arrow = document.querySelector(".fa-chevron-right");
let left_arrow = document.querySelector(".fa-chevron-left")
let small_images = document.querySelectorAll(".small_img_mobile")
let product_image = document.querySelector(".main_desktop")
let product_image_mobile = document.getElementById("display_img_mobile")
let small_images_div = document.querySelector(".arrows");
right_arrow.addEventListener("click", function(){
        console.log(slider_img[i])
        console.log(product_image.src)
        console.log(product_image)
        product_image.src = nextImage();
})
left_arrow.addEventListener("click", function(){
    product_image.src = prevImage();
})

function nextImage(){
     i = i+1;
     i = i % slider_img.length;
     return slider_img[i]
}
function prevImage(){
    if (i===0){
        i=slider_img.length
    }
    i = i-1;
    return slider_img[i]
}

console.log(slider_img)
console.log(product_image)

// mobile version dispaly

function getImg(){
    for(i=0; i<slider_img.length;i++){
        console.log("hello")
        console.log(slider_img[i])
        small_images[i].src = slider_img[i];
    }
}
getImg();

small_images_div.addEventListener("click",function(e){
    console.log(e.target)
    product_image_mobile.src = e.target.src
})

function changeSmallImg(){
    product_image_mobile.src = this
}