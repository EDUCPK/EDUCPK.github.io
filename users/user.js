import { userFeed } from "../script/db/userfeed.js";

if(!window.location.href.includes("?")){
    window.location.href = "https://educpk.github.io/"
}else{


    // Specify the path to the data node you want to check
    const  user_ = decodeURI(window.location.href.split("?").pop())
    const path_ = 'users/' + user_;

    // Create a reference to the data node
    const dataRef_ = database.ref(path_);

    // Read the data once
    dataRef_.once('value')
    .then((snapshot) => {
        if (snapshot.exists()) {
            console.log(true)
            document.getElementById("user_profile").style.visibility = "visible"
            document.getElementById("username_user").innerText = user_
            userFeed(user_)
            const path_ = 'users/' + user_ + "/photo";
            const valueRef_ = firebase.database().ref(path_);
    
            valueRef_.once('value')
                .then((snapshot) => {
                const value = snapshot.val();
                document.getElementById("photo_img").src = value
                })
                .catch((error) => {
                console.log("Error reading value:", error);
                });
            
        }else{
            window.location.href = "https://educpk.github.io/"            
            
        }
        function getCookie(name) {
            var cookieName = name + "=";
            var decodedCookie = decodeURIComponent(document.cookie);
            var cookieArray = decodedCookie.split(";");
          
            for (var i = 0; i < cookieArray.length; i++) {
              var cookie = cookieArray[i];
              while (cookie.charAt(0) === " ") {
                cookie = cookie.substring(1);
              }
              if (cookie.indexOf(cookieName) === 0) {
                return cookie.substring(cookieName.length, cookie.length);
              }
            }
          
            return "";
          }
        if(user_ == getCookie("username")){
            document.getElementById("photo").classList.add("hovertrue")
            document.getElementById("photo").addEventListener('mouseover', function(){
                document.getElementById("phototext").classList.add("show")
            })
            document.getElementById("photo").addEventListener('mouseout', function(){
                document.getElementById("phototext").classList.remove("show")
            })
            document.getElementById("photo").addEventListener("click", function(){
               document.getElementById("tut").classList.add('show') 
            })


        }


    })
    .catch((error) => {
        console.log("Error reading data:", error);
    });
}