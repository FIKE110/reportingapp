document.addEventListener('deviceready', onDeviceReady, false);
document.addEventListener("deviceready", onDeviceReady, false);
const NotFound=document.getElementsByClassName("not-found")

const baseurl="https://reportingapp.onrender.com"

function onDeviceReady() {
    console.log(navigator.camera);
}

function doesTokenExist(){
    const token=localStorage.getItem('token')
    if(!token){
        Toast("Authorization has expires")
        setTimeout(()=>{
            window.location.href="/index.html"
        },200)
    }
}

async function fetchPosts(){
    NotFound[0].style.display="block"
    NotFound[1].style.display="none"
    try{
    const postContainer=document.getElementsByClassName("posts")
    const res=await fetch(`${baseurl}/post`,{method:"GET",
        headers:{
            "Authorization":`"Bearer ${localStorage.getItem("token")}`
        }
    })
    const {posts}=await res.json()
    NotFound[0].style.display="none"
    if(posts){
        posts.map(async (item)=>{
            const res=await fetch(`${baseurl}/user/${item.user_id}`,{method:"GET",
                headers:{
                    "Authorization":`"Bearer ${localStorage.getItem("token")}`
                }
            })
            const user=await res.json()
            console.log(item)
            postContainer[0].innerHTML=postContainer[0].innerHTML+
            `
            <div class="post">
            <div class="post-user-details">
                    <img src="img/user.svg"/>
                    <p>${user.username}</p>
                </div>
                <p class="post-detail">
                ${item.title}
                </p>
                <div class="post-img-container">
                    <img class="post-img" src='${baseurl+"/post/"+item.imageurl}'/>
                </div>
                <div class="post-details">
                    <p>Category : ${item.category}</p>
                    <p>Location : ${item.location}</p>
                    <p>Location : ${item.created_at}</p>
                </div>
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