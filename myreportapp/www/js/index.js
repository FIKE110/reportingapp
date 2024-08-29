const NotFound=document.getElementsByClassName("not-found")

let baseurl="https://reportingapp.onrender.com"
//baseurl="http://localhost:3300"
//baseurl="http://192.168.174.176:3300"
function doesTokenExist(){
    const token=localStorage.getItem('token')
    if(!token){
        Toast("Authorization has expires")
        setTimeout(()=>{
            window.location.href="/index.html"
        },200)
    }
}

async function fetchPosts(category){
    console.log(NotFound[0])
    if(!NotFound[0])  return
    NotFound[0].style.display="block"
    NotFound[1].style.display="none"
    try{
    const postContainer=document.getElementsByClassName("posts")
    if(postContainer.length<=0) return
     const url=category ? `${baseurl}/post?category=${category}` : `${baseurl}/post`
    const res=await fetch(url,{method:"GET",
        headers:{
            "Authorization":`Bearer ${localStorage.getItem("token")}`
        }
    })
    const {posts}=await res.json()
    console.log(posts)
    NotFound[0].style.display="none"
    if(posts.length > 0){
        posts.map(async (item)=>{
            const res=await fetch(`${baseurl}/user/${item.user_id}`,{method:"GET",
                headers:{
                    "Authorization":`Bearer ${localStorage.getItem("token")}`
                }
            })
            const user=await res.json()
            console.log(item)
            // The ISO date string
const isoDateString = item.createdAt;

// Parse the ISO date string to a Date object
const date = new Date(isoDateString);

// Extract the components
const year = date.getUTCFullYear();
const month = date.toLocaleString('default', { month: 'long' }); // Full month name
const day = date.getUTCDate();
const hours = date.getUTCHours().toString().padStart(2, '0');
const minutes = date.getUTCMinutes().toString().padStart(2, '0');
const seconds = date.getUTCSeconds().toString().padStart(2, '0');

// Combine into a readable format
const readableDate = `${month} ${day}, ${year}, ${hours}:${minutes}:${seconds} UTC`;
            postContainer[0].innerHTML=postContainer[0].innerHTML+
            `
             <div class="post-user-details">
                    <img src="img/user.svg"/>
                    <p>${user.username}</p>
                </div>
            <div class="post-header">
            <h1>${item.title}</h1>
            <span class="post-category">${item.category}</span>
        </div>
        <div class="post-body">
            <p class="post-content">
                ${item.content}
            </p>
            <div class="post-image">
                <img src="${item.image}" alt="Incident Image">
            </div>
            <div class="post-location">
                <p><strong>Location : </strong>${item.location}</p>
                 <p><strong>Uploaded At : </strong>${item.createdAt}</p>
            </div>
        </div>
        <div class="post-footer">
        </div>
                `
        })
    }
    else{
        NotFound[1].style.display="block"
    }
}
    catch(e){
        Toast("Error occured")
        NotFound[1].style.display="block"
        NotFound[1].innerHTML="<h2>Could not find Post</h2>"
        NotFound[0].style.display="none"
    }
}

function Toast(message){
    var myToast = Toastify({
        text: message,
        duration: 1000
       })
    
       myToast.showToast();
}

fetchPosts()
doesTokenExist()

if(document.querySelector('.search-button')){
document.querySelector('.search-button').addEventListener('click', async function() {
    const searchOption = document.querySelector('.search-input').value;
    NotFound[0].style.display="block"
    NotFound[1].style.display="none"
    document.getElementsByClassName("posts")[0].innerHTML=` <div class="not-found">
                <div id="spinner-container">
                    <h2>Fetching data</h2>
                    <div id="spinner" class="spinnerspinner">
                    </div>
                </div>
            </div>
            <div class="not-found">
                <div id="spinner-container">
                    <h2>No Post has been uploaded</h2>
                    </div>
                </div>
            </div>`
    searchOption=== "all" ? await  fetchPosts() : await fetchPosts(searchOption)
    doesTokenExist()
});
}


