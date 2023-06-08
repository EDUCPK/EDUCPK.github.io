import { login_account } from "../../../../script/db/login.js";
import { log } from "../../../../script/db/loginchecker.js";

function Reset(){
    let alerta = confirm("Are you sure")
    if (alerta){
        document.getElementById("textarea-id").value = "";
        
    }
}
function Start(){
    const content = document.getElementById("textarea-id").value;
    
    const blob= new Blob([content], {
        type:'text/html'

    });

    const fileurl = URL.createObjectURL(blob);
    window.open(fileurl, "", "fullscreen=yes")

}
function Download(){
    name = document.getElementById('Name').value;

    const content = document.getElementById("textarea-id").value;
    const element = document.createElement('a');
    const blob= new Blob([content], {
        type:'plain/html'
    });
    const fileurl = URL.createObjectURL(blob);
    element.setAttribute('href', fileurl);
    element.setAttribute('download', name+".html");
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();

    document.body.removeChild(element);
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

  function projectshare() {
    const title = document.getElementById("Name").value;
    const code = document.getElementById("textarea-id").value;
    const user = getCookie("username");
    
    Swal.fire({
      html: `
        <h1>Title</h1>
        <br>
        <h2>${title}</h2>
        <br>
        <h1>About</h1>
        <br>
        <textarea name="" id="about" rows="2" cols="100"></textarea>
      `,
      showCloseButton: true,
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText: 'Share',
      cancelButtonText: 'Cancel',
      cancelButtonAriaLabel: 'Thumbs down'
    }).then(async (result) => {
      if (result.isConfirmed) {
        const about = document.getElementById("about").value;
        const titleExists = await exists(title);
        
        if (titleExists) {
          Swal.fire({
            icon: 'error',
            title: 'This project name is taken',
            text: 'Please change it',
          });
        } else {
          const dataRef = firebase.database().ref("projects/" + title);
          const data = {
            title: title,
            creator: user,
            about: about,
            code: code
          };
  
          dataRef.set(data)
            .then(function() {
              const link = "https://educpk.github.io/project?" + title
              console.log("Data added to Firebase Realtime Database successfully!");
              Swal.fire(
                'Success',
                `The project is now live at <a href='${link}'>${link}</a>`,
                'success'
              )
            })
            .catch(function(error) {
              console.error("Error adding data to Firebase Realtime Database: ", error);
            });
        }
      }
    });
  }
  
  async function exists(title) {
    const database = firebase.database();
    const path = 'projects/';
    const lowercaseTitle = title.toLowerCase();
    const dataRef = database.ref(path);
  
    try {
      const snapshot = await dataRef.once('value');
      const projects = snapshot.val();
  
      for (const projectKey in projects) {
        const project = projects[projectKey];
        if (project.title.toLowerCase() === lowercaseTitle) {
          return true;
        }
      }
  
      return false;
    } catch (error) {
      console.log("An error occurred:", error);
      throw error;
    }
  }
  
  
function share(){
    log()
    .then((result) => {
        if(result){
            projectshare()
        }else{
            Swal.fire({
                title: 'Please log in',
                icon: 'info',
                
                showCloseButton: true,
                showCancelButton: true,
                confirmButtonText:
                '<i class="fa fa-thumbs-up"></i>Login',
                confirmButtonAriaLabel: 'Thumbs up, great!',
                
                focusConfirm: false,
              }).then((r)=>{
                if (r.isConfirmed) {
                    login_account().then(function(){
                        projectshare()
                    })
                  }
              })
        }
    })
    .catch((error) => {
        console.log("An error occurred:", error);
    });    
}
document.getElementById("share").addEventListener('click', share)
