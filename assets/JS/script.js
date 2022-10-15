/************
NAVIGATION
*************/


const url = window.location.href;

trigger();

function trigger() {

    if (url.indexOf("search#") != -1) {
        const searchSplit = url.split("#");
        searchResult = searchSplit[1];
        console.log(`{searchResult}`)

        if (window.innerWidth < 1200) {
            getDataWP(searchResult);
        } else {
            getDataWPDex(searchResult);
        }

        //    getDataWP(searchResult); 

    } else {

        if (url.indexOf("html?") != -1) {
            const urlSplit = url.split("?");
            pageId = urlSplit[1];
            console.log(pageId);

        } else {
            pageId = 0;
        }
        if (pageId > 0) {
            getCategoryWP(pageId);
        } else {
            getDataBlog();
        }
    }

}


//AUTHORIZATION TOKEN 
fetch('https://www.lars-vesterager.dk/wp-json/jwt-auth/v1/token', {
    method: "POST",
    headers: {
        'Content-Type': 'application/json',
        'accept': 'application/json',
    },

    body: JSON.stringify({
        username: 'api.user',
        password: 'elsalg_group5'
    })
}).then(function(response) {
    return response.json()
}).then(function(user) {
    console.log(user.token)
    localStorage.setItem('jwt', user.token)
});

//GET PRIVATE POSTS + Bearer
fetch('https://www.lars-vesterager.dk/wp-json/wp/v2/posts?status=private', {
    method: "GET",
    headers: {
        'Content-Type': 'application/json',
        'accept': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
    }
}).then(function(response) {
    return response.json()
}).then(function(post) {
    console.log(post)
});

//GET CATEGORIES + Bearer
fetch('https://www.lars-vesterager.dk/wp-json/wp/v2/categories', {
    method: "GET",
    headers: {
        'Content-Type': 'application/json',
        'accept': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
    }
}).then(function(response) {
    return response.json()
}).then(function(categories) {
    console.log(categories)
});



//DRAWING PRODUCT CARDS + Bearer


function getDataBlog() {
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
        console.log(data);
        drawRecipe(data);
    });
}

function drawRecipe(data) {
    recipeList = "";
    for (let i = 0; i < data.length; i++) {
        const rez = data[i];
        recipeList = ` 
        
        <div class="grid-child-products">
                    <div class="imageContainerProductCard">
                        <img src="${rez.acf.product_image_1.sizes.large }" alt="" />
                        <img style"width: 50px;
                        height: 40px;" id="energy" class="energy" src="${rez.acf.energy_level_img.sizes.thumbnail}" alt="" />
                    </div>
                    <div class="title">${rez.acf.product_name}</div>
                    <div class="price">${rez.acf.price} kr</div>
                    <hr />
                    <div class="buttonFlex">
                        <div class="seeProductButton">
                            <a href="product.html?${rez.id}">See product </a>
                        </div>
                    </div>
                </div>
        
   
        `;
        document.getElementById("gridParentProducts").innerHTML += recipeList;
    }
}










function getCategoryWP(categoryId) {
    fetch(`https://www.lars-vesterager.dk/wp-json/wp/v2/posts?status=private&categories=${categoryId}`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'accept': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`
        }
    }).then(function(response) {
        return response.json()
    }).then(function(pstCat) {
        console.log(pstCat);

        drawRecipe(pstCat);
    });

}






//SEARCH FUNCTION + Bearer

let showItemAmount = 5;
initSearchTool();

function initSearchTool() {
    document
        .querySelector("#searchButton")
        .addEventListener("click", function() {
            doSearch();
        });

    document
        .querySelector("#searchInput")
        .addEventListener("keyup", function(event) {
            console.log(event.keyCode);
            if (event.keyCode == 13) {
                doSearch();
            }
        });

}

function refresh() {
    document.querySelector(".searchTerm").value = '';
}
window.onload = refresh();

function doSearch() {
    const searchTerm = document.querySelector("#searchInput").value.trim();
    console.log(searchTerm);
    document.querySelector("#searchInput").value = searchTerm;
    if (searchTerm != "") {
        resultsClear();
        getDataWP(searchTerm);
        console.log('doSearch()');
    }
}

function resultsClear() {
    document.querySelector(".grid-parent-products").innerHTML = '';
}

function getDataWP(searchTerm) {
    fetch(`https://www.lars-vesterager.dk/wp-json/wp/v2/posts?status=private&search=${searchTerm}`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'accept': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`
        }
    }).then(function(response) {
        return response.json()
    }).then(function(pstSrc) {
        console.log(pstSrc);
        drawRecipe(pstSrc);
    });

}

//SEARCH FUNCTION DEX+ Bearer

initSearchToolDex();

function initSearchToolDex() {
    document
        .querySelector("#searchButtonDEX")
        .addEventListener("click", function() {
            doSearchDex();
        });

    document
        .querySelector("#searchInputDEX")
        .addEventListener("keyup", function(event) {
            console.log(event.keyCode);
            if (event.keyCode == 13) {
                doSearchDex();
            }
        });

}

function refreshDex() {
    document.querySelector(".searchTermDEX").value = '';
}
window.onload = refreshDex();

function doSearchDex() {
    const searchTerm = document.querySelector("#searchInputDEX").value.trim();
    console.log(searchTerm);
    document.querySelector("#searchInputDEX").value = searchTerm;
    if (searchTerm != "") {
        resultsClearDex();
        getDataWPDex(searchTerm);
        console.log('doSearch()');
    }
}

function resultsClearDex() {
    document.querySelector(".grid-parent-products").innerHTML = '';
}

function getDataWPDex(searchTerm) {
    fetch(`https://www.lars-vesterager.dk/wp-json/wp/v2/posts?status=private&search=${searchTerm}`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'accept': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`
        }
    }).then(function(response) {
        return response.json()
    }).then(function(pstSrc) {
        console.log(pstSrc);
        drawRecipe(pstSrc);
    });

}



//FILTER FUNCTION


//GET TAGS + Bearer
fetch('https://www.lars-vesterager.dk/wp-json/wp/v2/tags?per_page=100').then(function(response) {
    return response.json()
}).then(function(tags) {
    console.log(tags)
    filterPrint(tags);

});

//Creates the filter options
function filterPrint(tags) {
    for (let i = 0; i < tags.length; i++) {
        const rez = tags[i];
        filterCateg = ` 
        <a href="specific_prod_categ.html?tag#${rez.id}" onclick="getDataBlogTag(${rez.id})"><li class="optionS"> <p>${ rez.name }</p></li></a> `;
        document.querySelector("#brandsTest").innerHTML += filterCateg;
    }
}


function getDataBlogTag(tagId) {
    fetch(`https://www.lars-vesterager.dk/wp-json/wp/v2/posts?status=private&tags=${tagId}`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'accept': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`
        }
    }).then(function(response) {
        return response.json()
    }).then(function(data) {
        console.log(data);
        resultsClear();
        drawRecipe(data);
    });
}


//Filter Buttons 
let brandNames = document.querySelectorAll(".optionS");


document.querySelector('.titleFlex').addEventListener("click", function() {
    let hideMe = document.getElementById('brandsTest');

    if (hideMe.style.display != "block") {
        hideMe.style.display = "block"
    } else {
        hideMe.style.display = "none";
    }
})



document.querySelector('.h1_filter').addEventListener("click", function() {
    let hideFilter = document.querySelector('.filterContainer');

    if (hideFilter.style.display != "block") {
        hideFilter.style.display = "block"
    } else {
        hideFilter.style.display = "none";
    }
})