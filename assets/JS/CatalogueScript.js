function showPage(pageId) {
    Array.from(document.querySelectorAll(".SubCategory")).forEach((classThing) => {
        classThing.style.display = "none";
    })
    let noHashtags = pageId.split("#") //
        //Basically instead of using ID's we shift to classes
        //To do that we have to remove the hashtag from the location.hash - Which we do with split 
        //Split then gives us an array hence the no hashtags[1]

    //  document.getElementById(`${pageId}`).style.display = "block";
    Array.from(document.querySelectorAll(`.${noHashtags[1]}`)).forEach((category) => {
        category.style.display = "block";
    })
}

function locationHashChanged() {
    showPage(location.hash);
    buttonColor();
}
window.onhashchange = locationHashChanged;
window.onload = locationHashChanged


// Button Colour correction! 

function buttonColor(){
    const applianceHighlight = document.querySelector('.buttonAppliances')
    const householdHighlight = document.querySelector('.buttonHouseholds');

    if(
    location.hash === "#appliances" || 
    location.hash === "#ovens" || 
    location.hash === "#refrigerators_and_freezers" || 
    location.hash === "#stoves"|| 
    location.hash === "#dishwashers"|| 
    location.hash === "#dryers"|| 
    location.hash === "#washing_machines"
    ){
        applianceHighlight.setAttribute('highlighter', true);
        householdHighlight.setAttribute('highlighterHouse', false)
    } 

    if (
    location.hash === "#households" || 
    location.hash === "#lighting" || 
    location.hash === "#security" || 
    location.hash === "#microwaves"|| 
    location.hash === "#extractor_hoods"|| 
    location.hash === "#ventilators"|| 
    location.hash === "#irons"
    ){
        householdHighlight.setAttribute('highlighterHouse', true)
        applianceHighlight.setAttribute('highlighter', false)
    }
}

//GET CATEGORIES + Bearer
fetch('https://www.lars-vesterager.dk/wp-json/wp/v2/categories?per_page=100', {
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


fetch('https://www.lars-vesterager.dk/wp-json/wp/v2/categories/45', {
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