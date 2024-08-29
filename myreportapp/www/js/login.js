const SpinnerBtnText=document.getElementById("btn-name")
const BtnSpinner=document.getElementById("spinner")

SpinnerBtnText.addEventListener('click',()=>{
    SpinnerBtnText.style.display="none";
    BtnSpinner.style.display="block"
})

document.addEventListener('deviceready', function() {

    window.FirebasePlugin.onMessageReceived(function(message) {
        console.log(`Message received ${JSON.stringify(message)}`);

        if (message.messageType === "notification") {
            // App is in foreground, display notification
            alert("Notification received \n" + "Title : "+message.title+"\n"+"Body" + message.body);
        } else {
            // Handle data message
            alert("Data message received: " + JSON.stringify(message));
        }
    }, function(error) {
        alert("Error receiving message: " + error);
    });

    // Retrieve the FCM token for sending notifications
    window.FirebasePlugin.getToken(function(token) {
        localStorage.setItem("FCM",token)
    }, function(err) {
        console.log("Error retrieving FCM token: " + err);
    });

    window.FirebasePlugin.grantPermission(function(hasPermission){
        console.log("Permission was " + (hasPermission ? "granted" : "denied"));
    });

}, false);

