//loader
var loader = document.querySelector(".loader")

window.addEventListener("load", vanish);

function vanish() {
  loader.classList.add("disppear");
}

document.oncontextmenu = () =>{
    return false
}