let baseurl="https://reportingapp.onrender.com"
//baseurl="http://localhost:3300"
//baseurl="http://192.168.174.176:3300"
const NotFound=document.getElementsByClassName("not-found")

document.addEventListener('DOMContentLoaded', function() {
    const userName = document.getElementById('userName');
    const userEmail = document.getElementById('userEmail');
    const postContainer = document.getElementById('posts');
    const logoutButton = document.getElementById('logoutButton');

    // Fetch user details
    function fetchUserDetails() {
        fetch(`${baseurl}/user/profile`, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
        .then(response => response.json())
        .then(data => {
            userName.textContent = data.username;
            userEmail.textContent = data.email;
        })
        .catch(error => alert('Error fetching user details:', error));
    }

  

    // Logout functionality
    logoutButton.addEventListener('click', function() {
        localStorage.removeItem('token');
        window.location.href = 'index.html'; // Redirect to login page
    });

    // Initialize page
    fetchUserDetails();
    fetchPosts();
});

async function fetchPosts(category,start=false){
    showModal()
    console.log(NotFound[0])
    if(!NotFound[0])  return
    NotFound[0].style.display="block"
    NotFound[1].style.display="none"
    try{
    const postContainer=document.getElementsByClassName("posts")
    if(postContainer.length<=0) return
     const url=category ? `${baseurl}/post?category=${category}` : `${baseurl}/post/user`
    const res=await fetch(url,{method:"GET",
        headers:{
            "Authorization":`Bearer ${localStorage.getItem("token")}`
        }
    })
    const posts=await res.json()
    console.log(posts)
    NotFound[0].style.display="none"
    if(posts.length > 0){
        posts.map(async (item)=>{

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
if(start){
    postContainer[0].innerHTML=""
}
            postContainer[0].innerHTML=postContainer[0].innerHTML+
            `
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
            <button class="edit-button" onclick="openUpdateModal(${item.id},'${item.title}','${item.content}','${item.image}')">Edit</button>
            <button class="delete-button">Delete</button>
        </div>
                `
                document.querySelectorAll('.delete-button').forEach(button => {
                    button.addEventListener('click', function() {
                        const postId = this.getAttribute('data-id');
                        
                        fetch(`${baseurl}/post/${item.id}`, {
                            method: 'DELETE', // or 'POST' if your API expects POST for deletes
                            headers: {
                                   'Authorization': 'Bearer ' + localStorage.getItem('token')
                            }
                        })
                        .then(response => {
                            if (response.ok) {
                                window.location.reload // Remove the post element from the DOM
                            } else {
                                return response.text().then(text => { throw new Error(text); });
                            }
                        })
                        .catch(error => {
                            console.error('Error:', error);
                        });
                    });
                });
        })
    }
    else{
        NotFound[1].style.display="block"
    }
}
    catch(e){
        Toast("Error occured")
    }
    finally{
        hideModal()
    }
}

function Toast(message){
    var myToast = Toastify({
        text: message,
        duration: 1000
       })
    
       myToast.showToast();
}

// Function to show the modal
function showModal() {
    document.getElementById('loadingModal').style.display = 'flex';
}

// Function to hide the modal
function hideModal() {
    document.getElementById('loadingModal').style.display = 'none';
}

// Function to open the update modal and populate it with data
function openUpdateModal(postId, title, content, imageUrl) {
    document.getElementById('postId').value = postId;
    document.getElementById('title').value = title;
    document.getElementById('content').value = content;
    
    // Set the image preview if there's an image URL
    const imagePreview = document.getElementById('imagePreview');
    if (imageUrl) {
        imagePreview.src = imageUrl;
        imagePreview.style.display = 'block';
    } else {
        imagePreview.style.display = 'none';
    }

    document.getElementById('updateModal').style.display = 'flex';
}
// Function to close the update modal
function closeUpdateModal() {
    document.getElementById('updateModal').style.display = 'none';
}

// Handle form submission
document.getElementById('updateForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const postId = document.getElementById('postId').value;
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;

    const form=new FormData()
    form.append('title',title)
    form.append('image',imagePreview.src)
    form.append('content',content)
    // Replace 'your-api-endpoint' with the actual URL to handle the update request
    fetch(`${baseurl}/post/${postId}`, {
        method: 'PUT',
        headers: {
                "Authorization":`Bearer ${localStorage.getItem("token")}`
        },
        body: form
    })
    .then(response => {
        if (response.ok) {
            alert('Post updated successfully.');
            closeUpdateModal();
            fetchPosts(null,true)
        } else {
            return response.text().then(text => { throw new Error(text); });
        }
    })
    .catch(error => {
        closeUpdateModal();
        console.error('Error:', error);
    });
});

document.getElementById('image').addEventListener('change', function(event) {
    const file = event.target.files[0];
    const imagePreview = document.getElementById('imagePreview');

    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            imagePreview.src = e.target.result;
            imagePreview.style.display = 'block';
        };
        reader.readAsDataURL(file);
    } else {
        imagePreview.style.display = 'none';
    }
});
