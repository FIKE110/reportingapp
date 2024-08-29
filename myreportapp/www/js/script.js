const SpinnerButton=document.getElementsByClassName("spinner-btn")
const SpinnerBtnText=document.getElementById("btn-name")
const BtnSpinner=document.getElementById("spinner")
const InputUsername=document.getElementById("form-username")
const InputPassword=document.getElementById("form-password")

let url="https://reportingapp.onrender.com"
const signupurl="user/register"
const loginurl="user/login"
//url="http://localhost:3300"
//url="http://192.168.174.176:3300"

SpinnerButton[0].addEventListener('click',async ()=>{
    try{
    startSpin()
    if(document.getElementById("form-email")){
        await register()
    }
    else{
        await login()
    }

   stopSpin()
    }
    catch(e){
        stopSpin()
        Toast("Internet Access Error")
        console.log(e)
    }
})


async function login(){
    const res=await fetch(`${url}/${loginurl}`,{method:'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({
        username:InputUsername.value,
        password:InputPassword.value
    })})

    let data=await res.json()
    console.log(data)
    if(data.token){
        const token=data.token
        data={message:"Login Successful"}
        setTimeout(()=>{
            localStorage.setItem("token",token)
            window.location.href="/home.html"
        },500)
    }
    Toast(parseErrorMessage(data))
}

async function register(){
    const InputEmail=document.getElementById("form-email")
    const res=await fetch(`${url}/${signupurl}`,{method:'POST',
        headers: {
            'Content-Type': 'application/json'
            // Add any other headers as needed
        },
        body:JSON.stringify({
        username:InputUsername.value,
        password:InputPassword.value,
        email:InputEmail.value,
        token:localStorage.getItem("FCM")
    })})
    const data=await res.json()
    Toast(parseErrorMessage(data))
    if(res.status==201){
        setTimeout(()=>{
                window.location.href="/index.html"
        },300
        )
    }
}

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


window.addEventListener('submit',e=>{
    e.preventDefault()
})

function Toast(message){
    var myToast = Toastify({
        text: message,
        duration: 1000
       })
    
       myToast.showToast();
}

function parseErrorMessage(data){
    if(data.error){
        if(data.error[0]==="{" || data.error[0]==="["){
             var error=JSON.parse(data.error)
        if(error[0] && error[0].code){
            return data.error[0].message
        }
        }
        else if(data.error=='Validation error'){
            return "Usenrname or email taken"
        }
       
        return data.error
    }
    else if(data.message){
        return data.message
    }

    return data.message
}
