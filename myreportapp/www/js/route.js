const HomeBtn=document.getElementById('homebtn')
const PostBtn=document.getElementById("postbtn")
const UserBtn=document.getElementById("userbtn")
const NotificationBtn=document.getElementById("notifybtn")

const routeItems=document.getElementsByClassName("nav-item")
const routeMap=[
    {route:'/home.html',name:'homebtn',activeImg:'img/house2.svg'},
    {route:'/post.html',name:'postbtn',activeImg:'img/plus2.svg'},
    {route:'/profile.html',name:'userbtn',activeImg:'img/user2.svg'},
]

HomeBtn.addEventListener('click',e=>{
    window.location='/home.html'
})

PostBtn.addEventListener('click',e=>{
    window.location='/post.html'
})



UserBtn.addEventListener('click',e=>{
    window.location='/profile.html'
})

const navActiveSelect=()=>{
    console.log(routeItems)
    for (let index = 0; index < routeItems.length; index++) {
        const element = routeItems[index];
        if(routeMap[index].route===window.location.pathname){
            element.style.borderTop="2px #ff4b2b solid"
            element.getElementsByTagName('img')[0].src=routeMap[index].activeImg
        }
    }
}

navActiveSelect()
