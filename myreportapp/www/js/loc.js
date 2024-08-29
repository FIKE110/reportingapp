
const locationText=document.getElementById("location_text")
const locationBtn=document.getElementById("location_btn")

const firebaseConfig = {
    apiKey: "AIzaSyCd90ssqINKJoKpOxLIlx7LYmA7dnp93PA",
    authDomain: "bingcompersonal.firebaseapp.com",
    projectId: "bingcompersonal",
    storageBucket: "bingcompersonal.appspot.com",
    messagingSenderId: "182179740239",
    appId: "1:182179740239:web:d42003c798c690570d083a",
    measurementId: "G-3X71SF68KC"
  };

  if(firebase){
  firebase.initializeApp(firebaseConfig);

  const messaging = firebase.messaging();
}

if(window.FirebasePlugin){
    window.FirebasePlugin.onMessageReceived(function(message) {
        alert(`Message received ${JSON.stringify(message)}`);

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
        tokenBox.value=token;
    }, function(err) {
        console.log("Error retrieving FCM token: " + err);
    });

    window.FirebasePlugin.grantPermission(function() {
        alert("Notification permission granted by the user");
    }, function(error) {
        alert("Error granting notification permission: " + error);
    });

}


function getGelocation(){
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
}



var onSuccess = function(position) {
    locationText.innerHTML='Latitude: '          + position.coords.latitude          + '<br />' +
          'Longitude: '         + position.coords.longitude         + '<br />'
};

// onError Callback receives a PositionError object
//
function onError(error) {
    locationText.innerHTML='code: '    + error.code    + '<br />' +
          'message: ' + error.message + '<br />';
}



