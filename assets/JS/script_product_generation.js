const url = window.location.href;
window.onload = trigger

function trigger() {
    if (url.indexOf("html?") != -1) {
        const urlSplit = url.split("?");
        if (urlSplit[1].indexOf('&') == -1) {
            const bananaSplit = urlSplit[1].split('.');
            console.log(bananaSplit[0]);
            pageId = bananaSplit[0];
        }
    }
}

fetch('https://www.lars-vesterager.dk/wp-json/wp/v2/posts?status=private', {
    method: "GET",
    headers: {
        'Content-Type': 'application/json',
        'accept': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
    }
}).then(function(response) {
    return response.json()
}).then(function(data) {
    console.log(data)
    searchArray(data)
    browseImages(data)
});

function searchArray(data) {
    for (let i = 0; i < data.length; i++) {
        let dataVariable1 = data[i];
        if (dataVariable1.id == pageId) {
            console.log(i);

            recipeList = '';
            const product = data[i];
            let noFrost = product.acf.nofrost;
            if (noFrost === "true") {
                noFrost = "Yes";
            } else {
                noFrost = "No";
            }
            let digitalDisplay = product.acf.digital_display;
            if (digitalDisplay === "true") {
                digitalDisplay = "Yes";
            } else {
                digitalDisplay = "No";
            }
            console.log()
            recipeList = `
            
        
            <section class="wrapper_product_mobile">
                <!-- Information about the product-->
                <main class="product_content">
                    <section class="product_show">
                        <!--Section with images-->
                        <div class="product_display">
                            <h1 class="product_title mobile">
                            ${product.title.rendered}
                            </h1>
                            <!--Display Inline-->
                            <div class="item_nr_policy mobile">
                                <h5 id="item_nr mobile">Item nr. 24352</h3>
                                    <div class="policy mobile">
                                        <i></i>
                                        <h5>30 day return policy</h3>
                                    </div>
                            </div>
                            <div class="big_img">
                                <img src="assets/images/categories/refrigeratos_and_freezers/Fridge_w_Freezer.png" alt="#" class="main" id="display_img_mobile">
        
                            </div>
                            <!-- the meta information-->
        
                            <div class="product_info">
                                <h1 class="price"> ${product.acf.price} kr</h1>
                                <a href="#" class="reserve_btn" id="renderBtn_mobile">RESERVE PRODUCT</a>
        
                                <p class="description">
                                ${product.acf.product_description}   
                                </p>
                                <h2>Key features</h2>
                                <ul class="key_features">
                                    <li>${product.acf.key_feature_1}</li>
                                    <li>${product.acf.key_feature_2}</li>
                                    <li>${product.acf.key_feature_3}</li>
                                </ul>
                            </div>
                    </section>
        
        
                    <!--SPECIFICATIONS-->
                    <section class="spec">
                        <ul class="tabs">
                            <button class="spec_btn">Specifications</button>
                            <button class="energy_btn"> Energy Labels</button>
                        </ul>
                        <!--Capacity Consumption and power-->
                        <h3 class="spec_description">Capacity, Consumption and Power</h3>
                        <ul class="product_spec">
                            <hr class="span_hr">
                            <li class="spec_info">
                                <h3>Energy Level</h3>
                                <h3>${product.acf.energy_level}</h3>
                            </li>
                            <hr class="span_hr">
                            <li class="spec_info">
                                <h3>Energy consumption kWh / year (EU)</h3>
                                <h3>${product.acf.energy_consumption}</h3>
                            </li>
                            <hr class="span_hr">
                            <li class="spec_info">
                                <h3>Net volume of keel (liters) </h3>
                                <h3>${product.acf.net_volume}</h3>
                            </li>
                            <hr class="span_hr">
                            <li class="spec_info">
                                <h3>Net volume of freezer (liters)</h3>
                                <h3>${product.acf.net_volume_of_freezer}</h3>
                            </li>
                            <h2 class="spec_description">Features</h2>
        
                            <hr class="span_hr">
                            <li class="spec_info">
                                <h3>No Frost</h3>
                                <h3>${noFrost}</h3>
                            </li>
                            <hr class="span_hr">
                            <li class="spec_info">
                                <h3>Digital temperature display</h3>
                                <h3>${digitalDisplay}</h3>
                            </li>
                            <hr class="span_hr">
                            <li class="spec_info">
                                <h3>Water / ice cube dispenser</h3>
                                <h3>${product.acf.water_ice_cube_dispenser}</h3>
                            </li>
                            <h2 class="spec_description">Design and Measurments</h2>
        
                            <hr class="span_hr">
                            <li class="spec_info">
                                <h3>Color</h3>
                                <h3>${product.acf.color}</h3>
                            </li>
                            <hr class="span_hr">
                            <li class="spec_info">
                                <h3>height (cm)</h3>
                                <h3>${product.acf.height_cm}</h3>
                            </li>
                            <hr class="span_hr">
                            <li class="spec_info">
                                <h3>width (cm)</h3>
                                <h3>${product.acf.width_cm}</h3>
                            </li>
                            <hr class="span_hr">
                            <li class="spec_info">
                                <h3>depth (cm)</h3>
                                <h3>${product.acf.depth_cm}</h3>
                            </li>
                            <hr class="span_hr">
                            <li class="spec_info">
                                <h3>Weight (kg)</h3>
                                <h3>${product.acf.weight_kg}</h3>
                            </li>
                        </ul>
                    </section>
                </main>
        
                <!--SIMILAR PRODUCTS-->
                <section class="similar_products">
                    <h1>Similar Products</h1>
                    <div class="similar_products_card">
                        <div class="similar_products_img">
                            <img src="assets/img/FRidges/drying cabinet.png" alt="#" class="card_image">
                            <img src="assets/img/FRidges/lightbulb-solid.svg" alt="#" class="energy_image">
                        </div>
                        <p class="product_title">
                        ${product.title.rendered}
                        </p>
                        <h2 class="price">5,000</h2>
                        <hr class="span_hr">
                        <a class="reserve_btn" id="see_product">See Product</a>
                    </div>
                    <!--LOAN CARD-->
                    <div class="similar_products_card">
                        <h1>LOAN PLAN</h1>
                        <div class="similar_products_img">
                        <img src="assets/images/hands.png" alt="# " class="card_image ">
                        </div>
                        <a href="loans.html" class="reserve_btn" id="see_product">Read More</a>
                    </div>
                    <!--FACEBOOK USED PRODUCTS-->
                    <div class="similar_products_card">
                        <div class="used">
                            <h1>Used</h1>
                            <h2>High Quality used products</h2>
                            <h3>Follow our Facebook page for high quality second hand products</h3>
                            <i></i>
                        </div>
                        <div class="similar_products_img">
                        <iframe src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Felpandrup&tabs=timeline&width=540&height=300&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId" width="340" height="300"
                        style="border:none;overflow:hidden;" scrolling="no" frameborder="0" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe></div>
                        </div>
                    </div>
                </section>
            </section>
        
        
        
            <!--DESKTOP VERSION-->
            <section class="wrapper_product_desktop wrapper-form">
                <main class="product_content">
                    <section class="product_show">
                        <!--Section with images-->
                        <div class="product_images">
                            <div class="big_img">
                                <i class="fas fa-chevron-left"></i>
                                <img src=${product.acf.product_image_1.url} alt="#" class="main_desktop" id="display_img_desktop">
                                <i class="fas fa-chevron-right"></i>
                                <div class="arrows">
                                    <!--insert icons-->
                                </div>
                            </div>
                            <ul class="small_img">
                                <li>
                                    <img src=${product.acf.product_image_1.url} # id="small_img_1 "></li>
                                <li><img src=${product.acf.product_image_2.url} alt="# " id="small_img_2 "></li>
                                <li><img src= ${product.acf.product_image_3.url} alt="# " id="small_img_3 "></li>
                                </ul>
                        </div>
                        <!-- the meta information-->
                        <div class="product_display ">
                            <div class="product_info ">
        
                                <h1 class="product_title ">
                                ${product.title.rendered}
                                </h1>
                                <div class="item_nr_policy ">
                                    <h5 id="item_nr ">Item nr. 24352</h3>
                                        <div class="policy ">
                                            <i class="fas fa-check-circle style="color:#0B877F;"></i>30 day return policy
                                        </div>
                                </div>
                                <div class="ammount_info ">
                                    <h2 class="price ">${product.acf.price}kr</h2>
                                    <i class="fas fa-check-circle" style="color:#0B877F;"></i> Stock 10+
                                </div>
                                <p class="description ">
                                ${product.acf.product_description}
                                </p>
                                <h2>key features</h2>
                                <ul class="key_features ">
                                    <li>${product.acf.key_feature_1}</li>
                                    <li>${product.acf.key_feature_2}</li>
                                    <li>${product.acf.key_feature_3}</li>
                                </ul>
                                <a href="# " class="reserve_btn form_btn " id="reservation_big " style="padding: 1rem 1rem;">RESERVE PRODUCT</a>
                            </div>
                    </section>
        
        
                    <!--SPECIFICATIONS-->
                    <section class="spec ">
                        <ul class="tabs ">
                            <button class="specs_btn ">Specifications</button>
                            <button class="energy_btn "> Energy Labels</button>
                        </ul>
                        <!--Capacity Consumption and power-->
                        <h2 class="spec_description ">Capacity, Consumption and Power</h2>
                        <ul class="product_spec ">
                            <hr class="span_hr ">
                            <li class="spec_info ">
                                <h3>Energy Level</h3>
                                <h3>${product.acf.energy_level}</h3>
                            </li>
                            <hr class="span_hr ">
                            <li class="spec_info ">
                                <h3>Energy consumption kWh / year (EU) </h3>
                                <h3>${product.acf.energy_consumption}</h3>
                            </li>
                            <hr class="span_hr ">
                            <li class="spec_info ">
                                <h3>Net volume of keel (liters) </h3>
                                <h3>${product.acf.net_volume}</h3>
                            </li>
                            <hr class="span_hr ">
                            <li class="spec_info ">
                                <h3>Net volume of freezer (liters)</h3>
                                <h3>${product.acf.net_volume_of_freezer}</h3>
                            </li>
                            <h2 class="spec_description ">Features</h2>
        
                            <hr class="span_hr ">
                            <li class="spec_info ">
                                <h3>No Frost</h3>
                                <h3>${noFrost}</h3>
                            </li>
                            <hr class="span_hr ">
                            <li class="spec_info ">
                                <h3>Digital temperature display</h3>
                                <h3>${digitalDisplay}</h3>
                            </li>
                            <hr class="span_hr ">
                            <li class="spec_info ">
                                <h3>Water / ice cube dispenser</h3>
                                <h3>${product.acf.water_ice_cube_dispenser}</h3>
                            </li>
                            <h2 class="spec_description ">Design and Measurments</h2>
        
                            <hr class="span_hr ">
                            <li class="spec_info ">
                                <h3>Color</h3>
                                <h3>${product.acf.color}</h3>
                            </li>
                            <hr class="span_hr ">
                            <li class="spec_info ">
                                <h3>height (cm)</h3>
                                <h3>${product.acf.height_cm}</h3>
                            </li>
                            <hr class="span_hr ">
                            <li class="spec_info ">
                                <h3>width (cm)</h3>
                                <h3>${product.acf.width_cm}</h3>
                            </li>
                            <hr class="span_hr ">
                            <li class="spec_info ">
                                <h3>depth (cm)</h3>
                                <h3>${product.acf.depth_cm}</h3>
                            </li>
                            <hr class="span_hr ">
                            <li class="spec_info ">
                                <h3>Weight (kg)</h3>
                                <h3>${product.acf.weight_kg}</h3>
                            </li>
        
                        </ul>
                    </section>
                </main>
        
                <!--SIDE BAR-->
                <section class="sidebar_product ">
                    <h3 class="product_title_sidebar" style="margin-bottom:1.5rem ">Last Used Products</h3>
                    <div class="sidebar_used_products ">
                        <iframe src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Felpandrup&tabs=timeline&width=340&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId
                                        " width="100% " height="100% " style="border:none;overflow:hidden " scrolling="no " frameborder="0 " allowfullscreen="true " allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share "></iframe>
                    </div>
                    <!--Loan div-->
                    <div class="similar_products_card ">
                        <h1>LOAN PLAN</h1>
                        <div class="similar_products_img ">
                            <a class="readmore_btn " id="loan_btn " href="loans.html">Read more</a>
                            <img src="assets/images/hands.png" alt="# " class="card_image ">
                        </div>
                    </div>
                    <div class="similar_products_card ">
                        <h1 style="text-align:left; margin-left:1.5em;">Insurance and warranty</h1>
                        <div class="similar_products_img ">
                            <a class="readmore_btn " id="insurance_btn " href="repair-insurance.html">Read more</a>
                        </div>
                    </div>
                </section>
            </section>
            <section class="similar_products_desktop ">
                <h1>Similar Products</h1>
                <div class="card_layout ">
                    <div class="similar_products_card_desktop " id=" ">
                        <div class="similar_products_img_desktop ">
                            <img src="assets/img/FRidges/drying cabinet.png " alt="# " class="card_image_desktop ">
                        </div>
                        <p class="product_title_similar ">
                            Samsung refrigerator freezer RL34T675DWWEF
                        </p>
                        <h2 class="price_similar ">5,000</h2>
                        <hr class="span_hr ">
                        <a class="reserve_btn " href="# " id="see_product ">SEE PRODUCT</a>
                    </div>
                    <div class="similar_products_card_desktop " id=" ">
                        <div class="similar_products_img_desktop ">
                            <img src="assets/img/FRidges/drying cabinet.png " alt="# " class="card_image_desktop ">
                        </div>
                        <p class="product_title_similar ">
                            Samsung refrigerator freezer RL34T675DWWEF
                        </p>
                        <h2 class="price_similar ">5,000</h2>
                        <hr class="span_hr ">
                        <a class="reserve_btn " href="# " id="see_product ">SEE PRODUCT</a>
                    </div>
                    <div class="similar_products_card_desktop " id=" ">
                        <div class="similar_products_img_desktop ">
                            <img src="assets/img/FRidges/drying cabinet.png " alt="# " class="card_image_desktop ">
                        </div>
                        <p class="product_title_similar ">
                            Samsung refrigerator freezer RL34T675DWWEF
                        </p>
                        <h2 class="price_similar ">5,000</h2>
                        <hr class="span_hr ">
                        <a class="reserve_btn " href="# " id="see_product ">SEE PRODUCT</a>
                        </div>
                        <div class="similar_products_card_desktop " id=" ">
                        <div class="similar_products_img_desktop ">
                        <img src="assets/img/FRidges/drying cabinet.png " alt="# " class="card_image_desktop ">
                        </div>
                        <p class="product_title_similar ">
                        Samsung refrigerator freezer RL34T675DWWEF
                        </p>
                        <h2 class="price_similar ">5,000</h2>
                        <hr class="span_hr ">
                        <a class="reserve_btn " href="# " id="see_product ">SEE PRODUCT</a>
                        </div>
                        </div>
                        </section>
                        <section class="insurance_desktop ">
                        <div class="insurance_desktop_text ">
                        <h1>Repairs and Insurance</h1>
                        <h2>High Quality Services</h2>
                        <p>We offer you insurance and reparation services for all your appliances</p>
                        <a class="reserve_btn " href="repair-insurance.html" id="repair_btn ">Read More</a>
                        </div>
                        <div class="repair_image_prodpage">
                        <img src="assets/images/imageslider-repair.jpg " alt="# " class="card_image_desktop ">
                        </div>
                        </section>
                        
                        `;
            document.getElementById('products').innerHTML = recipeList
        } else {}
    }

    let renderBtn_mobile = document.querySelector("#renderBtn_mobile");
    let renderFieldMobile = document.querySelector(".wrapper_product_mobile")
    let renderBtnDesktop = document.querySelector(".form_btn");
    let renderFieldDesktop = document.querySelector("#products")

    function browseImages() {

        let slider_img = [`${product.acf.product_image_1.url}`, `${product.acf.product_image_2.url}`, `${product.acf.product_image_3.url}`, ]
        let i = 0;

        let right_arrow = document.querySelector(".fa-chevron-right");
        let left_arrow = document.querySelector(".fa-chevron-left")
        let small_images = document.querySelectorAll(".small_img_mobile")
        let product_image = document.querySelector(".main_desktop")
        let product_image_mobile = document.getElementById("display_img_mobile")
        let small_images_div = document.querySelector(".arrows");
        right_arrow.addEventListener("click", function() {
            console.log(slider_img[i])
            console.log(product_image.src)
            console.log(product_image)
            product_image.src = nextImage();
        })
        left_arrow.addEventListener("click", function() {
            product_image.src = prevImage();
        })

        function nextImage() {
            i = i + 1;
            i = i % slider_img.length;
            return slider_img[i]
        }

        function prevImage() {
            if (i === 0) {
                i = slider_img.length
            }
            i = i - 1;
            return slider_img[i]
        }

        console.log(slider_img)
        console.log(product_image)

        // mobile version dispaly

        function getImg() {
            for (i = 0; i < slider_img.length; i++) {
                console.log("hello")
                console.log(slider_img[i])
                small_images[i].src = slider_img[i];
            }
        }
        getImg();
    }



    function createFormMobile() {

        renderBtn_mobile.addEventListener("click", function() {
            let form_section = document.createElement("section");

            form_section.classList.add("default")
                //  form_section.classlist.add("default");
            window.setTimeout(function() {
                form_section.classList.add("appear")
            }, 100);

            form_section.innerHTML = `
                <div class="submit_form">
                <div class="submit_form_exit">
                <i class="fas fa-times"></i>
                </div>
                <div class="submit_form_title">
                <h1>Product Title</h1>
                <p> This item is great, trust me </p>
                </div>
                
                <form action="" class="submit_form_fields" id="submitForm">
                <input class="submit_form_input" type="text"  placeholder="Full Name" id="full_name">
                <input class="submit_form_input" type="text"  placeholder="Email" id="email>
                <input class="submit_form_input" type="text"  placeholder="Phone number" id="phone_number">
                <input class="submit_form_input" type="text"  placeholder="Address(only in case of delivery)" id="address">
                
                <div class="submit_form_input_check">
                <input type="checkbox" id="delivery" value="Delivery">
                <label for="delivery">Delivery</label>
                <input type="checkbox" id="instalation" value="Instalation">
                <label for="instalation">Instalation</label>
                <input type="checkbox" id="pickup" value="Pick up">
                <label for="pickup">Pick-up</label>
                </div>
                <button class="submit_form_button" type="submit" form="submitForm" value="RESERVE">RESERVE</button>
                </form>
                
                <div class="done hidden">
                <i class="fas fa-check"></i>
                <h2> Your reservations has been processed</h2>
                </div>
                </div> 
                
                `
            console.log(form_section)
            renderFieldMobile.appendChild(form_section);


            let exit = document.querySelector(".fa-times");
            exit.addEventListener("click", function() {
                form_section.remove();
            })


            let submit = document.querySelector(".submit_form_button");
            let form_content = document.querySelector(".submit_form_fields");
            let title = document.querySelector(".submit_form_title");


            submit.addEventListener("click", function() {
                let successful = document.querySelector(".done");
                form_content.innerHTML = "";
                title.remove();
                exit.remove()
                successful.classList.remove("hidden");
                successful.addEventListener("transitionend", function() {
                    form_content.innerHTML =
                        `
                        <div class="done hidden">
                <i class="fas fa-times"></i>
                <h2> Your reservations has been processed</h2>
                </div>
                        `

                    setTimeout(function() {
                        form_section.style.opacity = "0";
                    }, 1200)
                    setTimeout(function() {
                        form_section.remove();
                    }, 1750)
                });
            })


        });



    }

    function createFormDesktop() {
        renderBtnDesktop.addEventListener("click", function() {
            let form_section = document.createElement("section");

            form_section.classList.add("default")
                //  form_section.classlist.add("default");
            window.setTimeout(function() {
                form_section.classList.add("appear")
            }, 100);

            form_section.innerHTML = `
            <div class="submit_form">
            <div class="submit_form_exit">
            <i class="fas fa-times"></i>
            </div>
            <div class="submit_form_title">
            <h1>Product Title</h1>
            <p> This item is great, trust me </p>
            </div>
            
            <form action="" class="submit_form_fields" id="submitForm">
            <input class="submit_form_input" type="text"  placeholder="Full Name" id="full_name">
            <input class="submit_form_input" type="text"  placeholder="Email" id="email>
            <input class="submit_form_input" type="text"  placeholder="Phone number" id="phone_number">
            <input class="submit_form_input" type="text"  placeholder="Address(only in case of delivery)" id="address">
            
            <div class="submit_form_input_check">
            <input type="checkbox" id="delivery" value="Delivery">
            <label for="delivery">Delivery</label>
            <input type="checkbox" id="instalation" value="Instalation">
            <label for="instalation">Instalation</label>
            <input type="checkbox" id="pickup" value="Pick up">
            <label for="pickup">Pick-up</label>
            </div>
            <button class="submit_form_button" type="submit" form="submitForm" value="RESERVE">RESERVE</button>
            </form>
            
            <div class="done hidden">
            <i class="fas fa-check"></i>
            <h2> Your reservations has been processed</h2>
            </div>
            </div> 
            
            `
            console.log(form_section)
            renderFieldDesktop.appendChild(form_section);


            let exit = document.querySelector(".fa-times");
            exit.addEventListener("click", function() {
                form_section.remove();
            })


            let submit = document.querySelector(".submit_form_button");
            let form_content = document.querySelector(".submit_form_fields");
            let title = document.querySelector(".submit_form_title");


            submit.addEventListener("click", function() {
                let successful = document.querySelector(".done");
                form_content.innerHTML = "";
                title.remove();
                exit.remove()
                successful.classList.remove("hidden");
                successful.addEventListener("transitionend", function() {
                    form_content.innerHTML =
                        `
                    <div class="done hidden">
            <i class="fas fa-times"></i>
            <h2> Your reservations has been processed</h2>
            </div>
                    `

                    setTimeout(function() {
                        form_section.style.opacity = "0";
                    }, 1200)
                    setTimeout(function() {
                        form_section.remove();
                    }, 1750)
                });
            })


        });
        console.log(renderBtnDesktop)
    }

    createFormMobile();
    createFormDesktop();
    browseImages();


}


/*
setTimeout(function(){
    section.style.opacity="0";
},1600)
setTimeout(function(){
    section.remove();
},1750)
*/