let reserve = document.querySelector("#reserveBtnForm");
let wrapper = document.querySelector(".wrapper-form")
let content = document.body;
reserve.addEventListener("click", function() {
    let section = document.createElement("section");
    section.classList.add("default")
    window.setTimeout(function() {

        section.classList.add("display")

    }, 50);
    section.innerHTML = `
   <div class="reservation-field">
   <i class="fas fa-times"></i>
   <form class="reservation-form form">
   <h1>Refrigirator</h1>
   <p>this is a description of a product  ITEM NUMBER</p>
   <input type="text" id="fullname" value="Full Name">
   <input type="text" id="email" value="email">
   <input type="text" id="phone" value="phone number">
   <input type="text" id="address" value="address (only in case of delivery)">
   </form>
   <div class="reservation-form-check"
   <form class="form">
   <input type="checkbox" id="delivery" value="delivery">
   <label for="delivery">Delivery</label>
   <input type="checkbox" id="instalation" value="instalation">
   <label for="instalation">Instalation</label>
   <input type="checkbox" id="pick-up" value="pick-up">
   <label for="pick-up">Pick up</label>
   </form>
   <input type="submit" id="reserve-btn-form" value="RESERVE">
   <p class="mention"> *Item will be reserved for the next 48 hours</p>
   <p class="mention"> *Item will be reserved for the next 48 hours</p>
   </div>
   <div class="spinner hidden">
   <i class="fas fa-check-circle"></i>
   <h2> Your reservations has been processed</h2>
   </div>
   </div>
   `
    wrapper.appendChild(section)
    console.log(section)

    let exit = document.querySelector(".fa-times")

    exit.addEventListener("click", function(e) {
        section.remove()
    })

    let submit = document.querySelector("#reserve-btn-form");
    let formDone = document.querySelector(".reservation-field");
    let form1 = document.querySelector(".reservation-form")
    let form2 = document.querySelector(".reservation-form-check")

    submit.addEventListener("click", function() {
        let spinner = document.querySelector(".spinner");
        spinner.classList.remove("hidden");
        submit.remove();
        form1.remove();
        form2.remove();
        spinner.addEventListener("transitionend", function() {
            formDone.innerHTML = `
        <div class="spinner">
   <i class="fas fa-check-circle">
   </i>
    <h2> Your reservations has been processed</h2>
   </div>
        `
            setTimeout(function() {
                section.style.opacity = "0";
            }, 1600)
            setTimeout(function() {
                section.remove();
            }, 1750)
        })

    })

})