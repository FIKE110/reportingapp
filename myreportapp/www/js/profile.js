const usernameH2=document.getElementById("profile-name")
const postHolder=document.getElementById('posts-container2')

async function getUsername(){
    try{
    const res=await fetch(`${baseurl}/user/profile`,{
        method:"GET",
        headers:{
            "Authorization":`Bearer ${localStorage.getItem("token")}`
        }
    })

    const username=await res.json()
    usernameH2.innerHTML=username.username
    fetchPostsById()
    }
    catch(e){
        console.log(e)
    }
}

getUsername()

async function fetchPostsById(){
    if(!NotFound[0])  return
    NotFound[0].style.display="block"
    NotFound[1].style.display="none"
    try{
    const postHolder=document.getElementsByClassName("posts")
    const res=await fetch(`${baseurl}/post`,{method:"GET",
        headers:{
            "Authorization":`Bearer ${localStorage.getItem("token")}`
        }
    })
    const {posts}=await res.json()
    NotFound[0].style.display="none"
    if(posts.length > 0){
        posts.map(async (item)=>{
            const res=await fetch(`${baseurl}/user/${item.user_id}`,{method:"GET",
                headers:{
                    "Authorization":`"Bearer ${localStorage.getItem("token")}`
                }
            })
            const user=await res.json()
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
            postHolder[0].innerHTML=postHolder[0].innerHTML+
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
                    <p style="display: block; color: #333; font-weight: bold;">Category : <span>${item.category}</span></p>
                    <p style="display: block; color: #333; font-weight: bold;">Location : <span>${item.location}</span></p>
                    <p style="display: block; color: #333; font-weight: bold;">Date posted : <span>${readableDate}</span></p>
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
        NotFound[1].style.display="block"
        NotFound[1].innerHTML="<h2>Could not find Post</h2>"
        NotFound[0].style.display="none"
    }
}
