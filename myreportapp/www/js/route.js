const HomeBtn=document.getElementById('homebtn')
const PostBtn=document.getElementById("postbtn")
const UserBtn=document.getElementById("userbtn")
const NotificationBtn=document.getElementById("notifybtn")

const routeItems=document.getElementsByClassName("nav-item")
const routeMap=[
    {route:'/index.html',name:'homebtn',activeImg:'img/house2.svg'},
    {route:'/post.html',name:'postbtn',activeImg:'img/plus2.svg'},
    {route:'/user.html',name:'userbtn',activeImg:'img/user2.svg'},
    {route:'/notification.html',name:'notifybtn',activeImg:'img/bell2.svg'}
]

HomeBtn.addEventListener('click',e=>{
    window.location='/index.html'
})

PostBtn.addEventListener('click',e=>{
    window.location='/post.html'
})

NotificationBtn.addEventListener('click',e=>{
    window.location='/notification.html'
})

UserBtn.addEventListener('click',e=>{
    window.location='/user.html'
})

const navActiveSelect=()=>{
    console.log(routeItems)
    for (let index = 0; index < routeItems.length; index++) {
        const element = routeItems[index];
        if(routeMap[index].route===window.location.pathname){
            element.style.borderTop="2px rgb(0, 153, 254) solid"
            element.getElementsByTagName('img')[0].src=routeMap[index].activeImg
        }
    }
}

navActiveSelect()
