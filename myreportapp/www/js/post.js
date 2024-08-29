const addImageBtn=document.getElementById('add-image-btn')
const postImage=document.getElementById('post-image')
const postForm=document.getElementById('post-form')
const addImageFromGallery=document.getElementById('add-image-gallery-btn')
const incidentType=document.getElementById("incident-type")
const PostTitle=document.getElementById("post-title")
const PostContent=document.getElementById("post-content")
const sendPostBtn=document.getElementById("send-form-btn")
const locationInput=document.getElementById('location')
const FileInput=document.getElementById('file')
const SpinnerButton=document.getElementsByClassName("spinner-btn")
const SpinnerBtnText=document.getElementById("btn-name")
const BtnSpinner=document.getElementById("spinner")
const getLocationBtn=document.getElementById("getlocation")
const tokenBox=document.getElementById("token")

function startSpin(){
    SpinnerBtnText.style.display="none";
    BtnSpinner.style.display="block"
    SpinnerButton[0].disabled=true
}

function stopSpin(){
    SpinnerBtnText.style.display="block";
    BtnSpinner.style.display="none"
    //BtnSpinner.style.opacity=0.4
    SpinnerButton[0].disabled=false
}


getLocationBtn.addEventListener("click",()=>{
    getNavLocation()
})

postForm.addEventListener('submit',async e=>{
    try{
    e.preventDefault()
    showModal()
    if(PostTitle.value && incidentType.value && locationInput.value && FileInput.files.length>0){
    const imagePreview = document.getElementById('imagePreview');
    const form=new FormData()
    form.append('title',PostTitle.value)
    form.append('category',incidentType.value)
    form.append('location',locationInput.value)
    form.append('image',imagePreview.src)
    form.append('content',PostContent.value)
    const postCreated=await fetch(`${baseurl}/post`,{
        method:"POST",
        headers:{
            "Authorization":`Bearer ${localStorage.getItem("token")}`
        },
        body:form
    })

    if(postCreated.status===201){
        var myToast = Toastify({
            text: "File successfully uploaded",
            duration: 1000
           })
        
           myToast.showToast();
       alert("Succesfully uploaded")
       postForm.reset()
       document.getElementById('imagePreview').src="";
    }
    else{
        Toast("Error occured not uploaded")
    }
    }
    else{
        alert("Fill in all required forms")
    }}
    catch(e){
        alert(e)
        }
        finally{
            hideModal()
        }

})

document.getElementById('file').addEventListener('change', function(event) {
    const file = event.target.files[0]; // Get the selected file

    if (file) {
        const reader = new FileReader();

        // On load, execute this function
        reader.onloadend = function() {
            const base64String = reader.result;

            // Display the image preview
            const imagePreview = document.getElementById('imagePreview');
            imagePreview.src = base64String;
            imagePreview.style.display = 'block';
        };

        // Read the file as a Data URL (Base64 string)
        reader.readAsDataURL(file);
    }
});

document.getElementById('capturePhoto').addEventListener('click', function() {
    navigator.camera.getPicture(onSuccess, onFail, {
        quality: 50,
        destinationType: Camera.DestinationType.DATA_URL,
        encodingType: Camera.EncodingType.JPEG,
        mediaType: Camera.MediaType.PICTURE
    });

    function onSuccess(imageData) {
        // Convert the image to Base64 and set it as the src of the preview image
        var image = document.getElementById('imagePreview');
        image.src = "data:image/jpeg;base64," + imageData;
        imagePreview.style.display = 'block';
    }

    function onFail(message) {
        alert('Failed because: ' + message);
    }
});

function getNavLocation(){
    window.FirebasePlugin.getToken(function(token) {
        tokenBox.value=token;
            // You can store this token or send it to your server for further use
        }, function(err) {
            alert("Error retrieving FCM token: " + err);
        });
    navigator.geolocation.getCurrentPosition(onSuccess, onError, {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    });

    function onSuccess(position) {
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;

        locationInput.value='Latitude: ' + latitude + '  ' + 'Longitude: ' + longitude;
    }

    function onError(error) {
        alert('Error occurred. Code: ' + error.code + '\n' + 'Message: ' + error.message);
    }
}
// Function to show the modal
function showModal() {
    document.getElementById('loadingModal').style.display = 'flex';
}

// Function to hide the modal
function hideModal() {
    document.getElementById('loadingModal').style.display = 'none';
}

getNavLocation()