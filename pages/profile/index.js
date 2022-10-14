let arrayObjects = JSON.parse(localStorage.getItem("@array"))
function requisition() {
    const dataRepos = fetch(`https://api.github.com/users/${localStorage.getItem("@user")}/repos`)
        .then((response) => response.json())
        .then((response) => {
            
            travelArray(response)
        })
        .catch((error) => console.log("tchau"))
    const dataUser = fetch(`https://api.github.com/users/${localStorage.getItem("@user")}`)
        .then((response) => response.json())
        .then((response) => {
            if(arrayObjects == null){
                arrayObjects = [response]
            }else{
                arrayObjects.push(response)
            }
            
           
            console.log(arrayObjects)
           localStorage.setItem("@array",JSON.stringify(arrayObjects))
            travelArrayUser(response)
        })
}
requisition()


function createCardUser(object) {

    const divSupreme = document.createElement("div")
    const divUser = document.createElement("div")
    const tagImg = document.createElement("img")
    const divInfo = document.createElement("div")
    const tagName = document.createElement("h2")
    const tagJob = document.createElement("p")
    const tagNav = document.createElement("nav")
    const tagButtonEmail = document.createElement("a")
    const tagButtonUser = document.createElement("a")

    divSupreme.classList.add("div-supreme")
    divUser.classList.add("div-user")
    tagImg.classList.add("header-img")
    tagImg.src = object.avatar_url
    divInfo.classList.add("div-info-user")
    tagName.classList.add("header-name")
    tagName.innerText = object.name
    tagJob.classList.add("header-job")
    tagJob.innerText = object.bio
    tagButtonEmail.classList.add("button-email")
    tagButtonEmail.innerText = "Email"
    tagButtonEmail.href = object.email
    tagButtonUser.classList.add("button-changeuser")
    tagButtonUser.innerText = "Trocar de usuário"
    tagButtonUser.href = "http://127.0.0.1:5500/gitSearchBase-paolarosa/pages/home/index.html"
   /*  tagButtonUser.target = "_blank" */

    tagNav.append(tagButtonEmail, tagButtonUser)
    divInfo.append(tagName, tagJob)
    divUser.append(tagImg, divInfo)
    divSupreme.append(divUser,tagNav)

    return divSupreme

}
function travelArrayUser(object) {
    const tagHeader = document.querySelector(".header");
    tagHeader.innerHTML = ""
    tagHeader.append(createCardUser(object))

}



function createCardRepos(object) {
    const tagLi = document.createElement("li")
    const tagProject = document.createElement("h3")
    const tagDescription = document.createElement("p")
    const tagDiv = document.createElement("div")
    const buttonRepo = document.createElement("a")
    const buttonDemo = document.createElement("a")

    tagLi.classList.add("li")
    tagProject.classList.add("project-title")
    tagProject.innerText = object.name
    tagDescription.classList.add("project-description")
    tagDescription.innerText = object.description
    tagDiv.classList.add("div-buttons")
    buttonRepo.classList.add("project-repo")
    buttonRepo.innerText = "Repositório"
    buttonRepo.href = object.html_url
    buttonDemo.classList.add("project-demo")
    buttonDemo.innerText = "Demo"
    buttonDemo.href = object.homepage

    tagDiv.append(buttonRepo, buttonDemo)
    tagLi.append(tagProject, tagDescription, tagDiv)
    return tagLi
}

function travelArray(array) {
    const tagUl = document.querySelector(".ul");
    tagUl.innerHTML = ""
    array.forEach((element) => {
        tagUl.append(createCardRepos(element))
    })
    
}


