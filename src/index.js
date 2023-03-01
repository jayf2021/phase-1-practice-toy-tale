let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});
// Get Toys (fetch)
function getToys() {
  fetch('http://localhost:3000/toys')
  .then(response => response.json())
  .then(toysInfo => {
    console.log(toysInfo);
    toysInfo.forEach(renderToys)
  })
}

// DOM selection
let toyCollectionDiv = document.querySelector("#toy-collection");
//console.log(toyCollectionDiv);
let toyForm = document.querySelector(".add-toy-form");
//console.log(toyForm);

//render function
function renderToys(toysInfo) {
  let cardDiv = document.createElement("div");
  cardDiv.className = "card";
  let toyTitle = document.createElement("h2");
  let toyImg = document.createElement("img");
  let toyLikes = document.createElement("p");
  let likeButton = document.createElement("button");
  toyTitle.textContent = toysInfo.name;
  toyImg.src = toysInfo.image;
  toyImg.className = "toy-avatar";
  toyLikes.textContent = toysInfo.likes;
  likeButton.className = "like-btn";
  likeButton.innerText = "Like ❤️";
  cardDiv.append(toyTitle, toyImg, toyLikes, likeButton);
  toyCollectionDiv.append(cardDiv);
  let cardLike = toysInfo.likes;
  likeButton.addEventListener("click", () => {
    //let cardLike = toysInfo.likes;
    cardLike += 1;
    toyLikes.textContent = cardLike;
})
}

toyForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = event.target.name.value;
  const image = event.target.image.value;
  let toyInput = {
    name,
    image,
  }
  fetch('http://localhost:3000/toys'), {
    method: 'POST',
    header : {
      "content-type": "application/json",
      Accept : "application/json",
    },
    body : JSON.stringify(toyInput) 
}
.then(response => response.json())
.then()
});

renderToys();




getToys()