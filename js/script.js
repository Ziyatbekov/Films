const URL = 'http://localhost:3000/posts'
const main = document.querySelector('main')
const URL_CATEGORY = "http://localhost:3000/categories"
const categoriesWrapper = document.querySelector('.categories')

fetch(URL)
        .then((res) => res.json ())
        .then((data) => renderPosts(data))

const renderPosts = (posts) => {
    main.innerHTML = ``
    posts.map(post =>  {
        main.innerHTML += `<div class="post post${post.id}">
                            <div class="normal-mode active">
                                <h2>${post.title}</h2>
                                <img src='${post.img}'>
                                <div>
                                    <p class="descr">${post.descr}</p>
                                    <div class="accordion" id="${post.id}">
                                    <div class="accordion-item">
                                      <h2 class="accordion-header" id="headingThree">
                                        <button class="accordion-button collapsed" id="${post.id}" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                          Описание
                                        </button>
                                      </h2>
                                      <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                                        <div class="accordion-body">
                                          <strong>${post.descr}</strong>
                                        </div>
                                      </div>
                                    </div>
                                    </div>
                                </div>
                                <button class ="btn btn-danger" id="${post.id}">Удалить</button>
                                <button class ="btn btn-edit btn-success" id="${post.id}">Редактировать</button>
                            </div>
                            <div class="edit-mode" id="edit-mode">
                              <input class="form-control new-title" type="text" value="${post.title}" name="new-title">
                              <input class="form-control new-img" type="text" value="${post.img}" name="new-img">
                              <input class="form-control new-descr" type="text" value="${post.descr}" name="new-descr">
                              <button class ="btn btn-success" id="${post.id}">Сохранить</button>
                           </div>
                           </div>`
                           
    })
}

window.addEventListener("click", (e) =>{
    if(e.target.classList[0] == "btn") {
       const id = e.target.id
    }
 })

 const creatPost = () => {
    const post = {
       title : "Первородные",
       descr : "американский телесериал, разработанный Джули Плек, стартовавший 3 октября 2013 года. Это спин-офф шоу «Дневники вампира», в центре которого находятся несколько основных персонажей из сериала. 10 мая 2017 года сериал был продлён на пятый сезон, который стал финальным.",
       img : "https://kinogo.zone/uploads/posts/2021-04/1618779230-1698309387-drevnie.jpg"
    }
    
    fetch(URL, {
       headers : {
          'Content-Type' : 'application/json'
       },
       method : 'POST',
       body: JSON.stringify(post)
    })
 }


 window.addEventListener("click", (e) => {
    if(e.target.classList[1] == "btn-danger") {
       const id = e.target.id
       deletePost(id)
    }
    if(e.target.classList[1] == 'btn-success') {
       const id = e.target.id
       const newTitle = document.querySelector(`.post${id} .new-title`).value
       const newDescr = document.querySelector(`.post${id} .new-descr`).value
       const newImg = document.querySelector(`.post${id} .new-img`).value
       const newData = {
          title : newTitle,
          descr : newDescr,
          img : newImg
       }
       editPost(id, newData)
    }
 })

 window.addEventListener("click", (e) => {
    if(e.target.classList[1] == "btn-edit") {
       const id = e.target.id
       togglePostMode(id)
    }
 })



 const togglePostMode = (id) => {
    const postWrapper = document.querySelector(`.post${id}`)
    const normalMode = postWrapper.querySelector('.normal-mode')
    const editMode = postWrapper.querySelector('.edit-mode')
    normalMode.classList.toggle("active")
    editMode.classList.toggle("active")
    console.log(id)
 }
 const deletePost = (id) => {
    const urlDelete = `http://localhost:3000/posts/${id}`
    fetch(urlDelete, {
       method : 'DELETE' ,
       headers : {
          'Content-Type' : 'application/json'
       }
    })
 }
 
 const editPost = (id, newData) => {
    const urlEdit = `http://localhost:3000/posts/${id}`
    fetch(urlEdit, {
       method : 'PATCH',
       headers : {
          'content-type' : 'application/json'
       },
       body : JSON.stringify(newData)
    })
    .then(res => {
       togglePostMode(id)
       return res.json()
 
    })
    .then(data => {
       console.log(data)
       changeData(id,data)
    })
    .catch(err => console.log(err))
 }
 
 const changeData = (id,data) => {
    const postWrapper = document.querySelector(`.post${id}`)
    postWrapper.querySelector(`h1`).innerText = data.title
    postWrapper.querySelector(`p`).innerText = data.descr
    postWrapper.querySelector(`img`).src = data.img
 }

 fetch(URL_CATEGORY)
 .then((res) => res.json())
 .then((data) => renderCategories(data))

const renderCategories = (categories) =>{
categories.map(category => {
 categoriesWrapper.innerHTML += `
                        <a id="${category.id}" class="category">${category.name}</a>`
    })
}

document.addEventListener('click', (e) => {
if(e.target.classList[0] == "category") {
     e.preventDefault()
    const id= e.target.id
    fetchPostByCategory(id)
}
})

const fetchPostByCategory = (categoryId) => {
fetch(`http://localhost:3000/posts?category=${categoryId}`)
 .then(res => res.json())
 .then(data => renderPosts(data))
}
