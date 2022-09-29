//Le but est de respecter la séparation des concernes

//declare global variables here
const baseUrl =  "http://localhost:3000/ramens"
const ramenMenu = document.getElementById("ramen-menu");
const ramenDetail = document.getElementById("ramen-detail");
let span = document.getElementById("rating-display");
let p = document.getElementById("comment-display");
const ramenForm = document.getElementById("new-ramen");

//holds all functions
function init(){
    getAllRamen();
    eventListeners();
}

function getAllRamen(){
    fetch(baseUrl)
        .then(res => res.json())
        .then(ramenData => renderAllRamen(ramenData));
}

function renderAllRamen(ramenData){
    ramenData.forEach(ramen => renderOneRamen(ramen));
}

function renderOneRamen(ramen){
    //create img element
    const img = document.createElement('img');
    img.src = ramen.image;
    img.alt = ramen.name;
    img.id = ramen.id;

    ramenMenu.append(img);
}

function eventListeners(){
    ramenMenu.addEventListener("click", clickRamenImageHandler);
    ramenForm.addEventListener("submit", submitNewRamenHandler);
}

function clickRamenImageHandler(event){
    //console.log(event.target.id);
    let img = ramenDetail.querySelector(".detail-image");
    let h2 = ramenDetail.querySelector(".name");
    let h3 = ramenDetail.querySelector(".restaurant");

    //GET the ramen by id
    fetch(`${baseUrl}/${event.target.id}`)
        .then(res => res.json())
        .then(ramenObj => {
            img.src = ramenObj.image;
            img.alt = ramenObj.name;
            h2.textContent = ramenObj.name;
            h3.textContent = ramenObj.restaurant;
            span.textContent = ramenObj.rating;
            p.textContent = ramenObj.comment;
        })
}

function submitNewRamenHandler(event){
    event.preventDefault();

    console.log(event.target.name); //Wow, I can grab the input element by the name attribute value
    console.log(event.target.restaurant);
    console.log(event.target.image);
    console.log(event.target.rating);
    console.log(event.target["new-comment"]);

    const newRamenObj = {
        name: event.target.name.value,
        restaurant: event.target.restaurant.value,
        image: event.target.image.value,
        rating: event.target.rating.value,
        comment: event.target["new-comment"].value
    }

    addNewRamentoDatabase(newRamenObj);
}

function addNewRamentoDatabase(newRamenObj){
    fetch(baseUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(newRamenObj)
    })
        .then(res => res.json())
        .then(data => renderOneRamen(data))
}

init();
