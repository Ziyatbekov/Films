const URL = "http://localhost:3000/posts"
const form = document.querySelector("form") 


form.addEventListener("submit", (e) => {
   e.preventDefault()
   const post = {
      title : e.target[0].value,
      descr : e.target[1].value,
      img : e.target[2].value
   }
   console.log(post)
   fetch(URL, {  
      headers : {
         'Content-Type' : 'application/json'
      },
      method: 'POST',
      body : JSON.stringify(post)
   })
})