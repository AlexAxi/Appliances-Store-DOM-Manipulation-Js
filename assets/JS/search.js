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
       
        pageRedirect(searchTerm)
        console.log('doSearch()');
    }
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

//REDIRECT 
function pageRedirect(searchTerm) {
    window.location.href = `specific_prod_categ.html?search#${searchTerm}`;
}

function doSearchDex() {
    const searchTerm = document.querySelector("#searchInputDEX").value.trim();
    console.log(searchTerm);
    document.querySelector("#searchInputDEX").value = searchTerm;
    if (searchTerm != "") {

        pageRedirect(searchTerm);
        console.log('doSearch()');

    }
}



