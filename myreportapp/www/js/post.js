const addImageBtn=document.getElementById('add-image-btn')
const postImage=document.getElementById('post-image')
const postForm=document.getElementById('post-form')
const addImageFromGallery=document.getElementById('add-image-gallery-btn')

postForm.addEventListener('submit',e=>{
    e.preventDefault()
})

addImageBtn.addEventListener('click',(e)=>{
    try{
        navigator.camera.getPicture(onSuccess, onFail, { 
            quality: 85,
            sourceType:Camera.PictureSourceType.CAMERA,
        destinationType: Camera.DestinationType.DATA_URL
})
    }
    catch(e){
        alert(e)
    }
});

addImageFromGallery.addEventListener('click',(e)=>{
    try{
        navigator.camera.getPicture(onSuccess, onFail, { 
            quality: 85,
            sourceType:Camera.PictureSourceType.PHOTOLIBRARY,
        destinationType: Camera.DestinationType.DATA_URL
})
    }
    catch(e){
        alert(e)
    }
});


function onSuccess(imageData) {
    postImage.src = "data:image/jpeg;base64," + imageData;
}

function onFail(message) {
    alert('Failed because: ' + message);
}
