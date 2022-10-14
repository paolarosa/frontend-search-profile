function checkInput() {
    const taginput = document.querySelector(".input-user")
    const tagbutton = document.querySelector(".button-search")
    taginput.addEventListener("keyup", (event) => {
        if (taginput.value == true) {
            tagbutton.disabled = true
            tagbutton.classList.remove("button-on")

        }
        else {
            tagbutton.disabled = false
            tagbutton.classList.add("button-on")
        }
    })
}
checkInput()


function captureInput() {
    const buttonSearch = document.querySelector(".button-search")
    const input = document.querySelector(".input-user")

    buttonSearch.addEventListener("click", (event) => {
        event.preventDefault()
        let inputValue = input.value
        /*  arrayObjects.push(inputValue)
         console.log(arrayObjects) */
        localStorage.setItem("@user", input.value)
        requisitionOpen()



    })
}
captureInput()


function requisitionOpen() {
    const dataRepos = fetch(`https://api.github.com/users/${localStorage.getItem("@user")}`)
        .then((response) => response.json())
        .then((response) => {
            if (response.message == "Not Found") {
                catchError()
            } else { window.location.replace("http://127.0.0.1:5500/gitSearchBase-paolarosa/pages/profile/index.html") }

        })
}
/* requisition() */

const buttonCharge = document.querySelector(".button-search");
buttonCharge.addEventListener("click", () => {
    buttonCharge.classList.add("loading");
});

function catchError() {
    const p = document.querySelector(".not-found-user")
    const input = document.querySelector(".input-user")
    const buttonCharge = document.querySelector(".button-search")
    p.classList.remove("hidden")
    input.classList.add("input-red")
    buttonCharge.classList.add("button-off")
}

function renderLasts(object) {
    const div = document.querySelector(".div-img")
    const divImgButton = document.createElement("div")
    const buttonImg = document.createElement("a")
    const img = document.createElement("img")
    divImgButton.classList.add("divButtonImg")
    img.classList.add("left-side-img")
    img.src = object.avatar_url
    img.id = object.id
    buttonImg.innerText = "Acessar este perfil"
    buttonImg.classList.add("button-img")
    buttonCharge.id = object.id
    buttonImg.href = object.html_url


    img.addEventListener("mouseover", (event) => {
        buttonImg.classList.remove("hidden")
        divImgButton.appendChild(buttonImg)
        console.log(object.html_url)
    })

    buttonImg.addEventListener("mouseout", (event) => {


        buttonImg.classList.add("hidden")

    })
    divImgButton.append(img)
    div.appendChild(divImgButton)

}


function storageImg() {
    if (localStorage.getItem("@array")) {
        const item = JSON.parse(localStorage.getItem("@array"))
        item.forEach((element, index) => {
            if (index >= item.length - 3) { renderLasts(element) }
        })
    }
}
storageImg()

