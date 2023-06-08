import md5 from 'https://cdn.skypack.dev/md5';

function generateGravatarUrl(email) {
  const hash = md5(email.trim().toLowerCase());
  const gravatarUrl = `https://www.gravatar.com/avatar/${hash}`;

  return gravatarUrl;
}


function login() {
    

    Swal.fire({
      title: 'Login/signup',
      html:
        `
        <div class="form-container form-group">
          <div id="loginform">
            <h2>Login</h2>
            <input type="text" placeholder="Username" id="username">
            <br><br>
            <input type="password" placeholder="Password" id="password"><br><br>
            <button id="logform">Login</button>
            <div id="exists" class="error">Incorrect username or password</div>
          </div>
          <div id="registerform">
            <h2>Register</h2>
            <div id="username_" class="error">Please fill out</div>
            <div id="taken" class="error">This username is taken</div>
            <input type="text" placeholder="Username" id="username_reg"><br><br>
            <div id="email_1" class="error">Please fill out</div>
            <div id="email_2" class="error">Please enter a valid email</div>
            <input type="email" placeholder="Email" id="email"><br><br>
            <div id="password_" class="error">Please fill out</div>
            <input type="password" placeholder="Password" id="password_reg"><br><br>
            <div id="passmatch" class="error">Passwords don't match</div>
            <input type="password" placeholder="Password Again" id="password_reg_again"><br><br>
            <div id="message">
              <h3>Password must contain the following:</h3>
              <p id="letter" class="invalid">A <b>lowercase</b> letter</p>
              <p id="capital" class="invalid">A <b>capital (uppercase)</b> letter</p>
              <p id="number" class="invalid">A <b>number</b></p>
              <p id="length" class="invalid">Minimum <b>8 characters</b></p>
            </div>
              
            <button id="regform">Register</button>
          </div>
        </div>
        `,
      focusConfirm: false,
      confirmButtonText: '<i class="fa fa-thumbs-up"></i> Cancel',
      cancelButtonAriaLabel: 'Thumbs down'
    });
    var myInput = document.getElementById("password_reg");
    var letter = document.getElementById("letter");
    var capital = document.getElementById("capital");
    var number = document.getElementById("number");
    var length = document.getElementById("length");

    // When the user clicks on the password field, show the message box
    myInput.onfocus = function() {
      document.getElementById("message").style.display = "block";
    }

    

    // When the user starts to type something inside the password field
    myInput.onkeyup = function() {
      // Validate lowercase letters
      var lowerCaseLetters = /[a-z]/g;
      if(myInput.value.match(lowerCaseLetters)) {  
        letter.classList.remove("invalid");
        letter.classList.add("valid");
      } else {
        letter.classList.remove("valid");
        letter.classList.add("invalid");
      }
      
      // Validate capital letters
      var upperCaseLetters = /[A-Z]/g;
      if(myInput.value.match(upperCaseLetters)) {  
        capital.classList.remove("invalid");
        capital.classList.add("valid");
      } else {
        capital.classList.remove("valid");
        capital.classList.add("invalid");
      }

      // Validate numbers
      var numbers = /[0-9]/g;
      if(myInput.value.match(numbers)) {  
        number.classList.remove("invalid");
        number.classList.add("valid");
      } else {
        number.classList.remove("valid");
        number.classList.add("invalid");
      }
      
      // Validate length
      if(myInput.value.length >= 8) {
        length.classList.remove("invalid");
        length.classList.add("valid");
      } else {
        length.classList.remove("valid");
        length.classList.add("invalid");
      }
    }
    
  
    document.getElementById("logform").addEventListener('click', form_log);
    document.getElementById("regform").addEventListener('click', form_reg);
  }
  
  function form_log() {
    const user = document.getElementById("username").value;
    const password = document.getElementById('password').value;
  
    const path = 'users/' + user;
    const dataRef = firebase.database().ref(path);
  
    dataRef.once('value')
      .then((snapshot) => {
        if (snapshot.exists()) {
          const path_ = 'users/' + user + "/password";
          const valueRef_ = firebase.database().ref(path_);
  
          valueRef_.once('value')
            .then((snapshot) => {
              const value = snapshot.val();
              if (value == password) {
                var date = new Date();
                date.setTime(date.getTime() + (24 * 60 * 60 * 1000)); // Set the expiration time to 24 hours in the future
                document.cookie = `username=${user}; expires=${date.toUTCString()}; path=/`;
                window.location.reload();
              } else {
                document.getElementById("exists").style.visibility = "visible";
              }
            })
            .catch((error) => {
              console.log("Error reading value:", error);
            });
        } else {
          document.getElementById("exists").style.visibility = "visible";
        }
      })
      .catch((error) => {
        console.log("Error reading data:", error);
      });
  }
  
  async function registercheck() {
    const user = document.getElementById("username_reg").value;
    const password = document.getElementById('password_reg').value;
    const email = document.getElementById("email").value;
    const again_ = document.getElementById("password_reg_again").value;
    let return_ = [];
    document.getElementById("password_").style.visibility = 'hidden';
    document.getElementById("email_1").style.visibility = 'hidden';
    document.getElementById("email_2").style.visibility = 'hidden';
    document.getElementById("username_").style.visibility = 'hidden';
    document.getElementById("passmatch").style.visibility = 'hidden';
    document.getElementById("taken").style.visibility = 'hidden';
    if (user === "") {
      document.getElementById("username_").style.visibility = 'visible';
      return_.push(false);
    } else {
      return_.push(true);
    }
  
    if (email === "") {
      document.getElementById("email_1").style.visibility = 'visible';
      return_.push(false);
    } else {
      var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      if (email.match(validRegex)) {
        return_.push(true);
      } else {
        document.getElementById("email_2").style.visibility = 'visible';
        return_.push(false);
      }
    }
  
    if (password === "") {
      document.getElementById("password_").style.visibility = 'visible';
      return_.push(false);
    } else {
      return_.push(true);
      if (password == again_) {
        return_.push(true);
      } else {
        document.getElementById("passmatch").style.visibility = 'visible';
        return_.push(false);
      }
    }
    if(document.querySelector('.invalid')){
      return_.push(false)
    }
  
    const path = 'users/' + user;
    const dataRef = firebase.database().ref(path);
  
    try {
      const snapshot = await dataRef.once('value');
      if (snapshot.exists()) {
        if(!user ==""){
          document.getElementById("taken").style.visibility = 'visible';

        }
        return_.push(false);
        return return_.includes(false);

      } else {
        return_.push(true);
        return return_.includes(false);

      }
    } catch (error) {
      console.log("Error reading data:", error);
      // Handle the error
    }
  }
  
  
  
  function form_reg() {
    
    registercheck()
    .then((result) => {
      if (!result) {
        const user = document.getElementById("username_reg").value;
        const password = document.getElementById('password_reg').value;
        const email = document.getElementById("email").value;
    
        const dataRef = firebase.database().ref("users/" + user);
        const data = {
          name: user,
          email: email,
          password: password,
          photo: generateGravatarUrl(email)
        };
    
        dataRef.set(data)
          .then(function() {
            console.log("Data added to Firebase Realtime Database successfully!");

            var date = new Date();
            date.setTime(date.getTime() + (24 * 60 * 60 * 1000)); // Set the expiration time to 24 hours in the future
            document.cookie = `username=${user}; expires=${date.toUTCString()}; path=/`;
            window.location.reload();
          })
          .catch(function(error) {
            console.error("Error adding data to Firebase Realtime Database: ", error);
          });
      }
    })
    .catch((error) => {
      // Handle any errors
    });
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
  if(document.getElementById('loginsignup')){
    document.getElementById('loginsignup').addEventListener('click', login);

  }
  var user = getCookie("username");
  if (user) {
    

    // Specify the path to the data node you want to check
    const path = 'users/' + user;

    // Create a reference to the data node

    const dataRef = database.ref(path);

    // Read the data once
    dataRef.once('value')
    .then((snapshot) => {
        if (snapshot.exists()) {
            if(window.location.href.includes("/projects/web/")){
              return true
            }
            document.getElementById('loginsignup').innerHTML = `<div id="user"><img id="pfp-logo" src="none"></div><div class="dropdown">
            <ul class="dropdown-list">
              <li id="profile">Profile</li>
              <li id="new">New project</li>
              <hr>
              <li id = "sign">Sign out</li>
              <!-- Add more list items as needed -->
            </ul>
          </div>`
            document.getElementById('loginsignup').removeEventListener('click', login)
            const profile = document.getElementById('loginsignup');
            const dropdownList = document.querySelector('.dropdown-list');

                // Toggle the dropdown list
                profile.addEventListener('click', function() {
                dropdownList.style.display = dropdownList.style.display === 'block' ? 'none' : 'block';
                });

                // Hide the dropdown list when clicking outside
                document.addEventListener('click', function(event) {
                if (!profile.contains(event.target)) {
                    dropdownList.style.display = 'none';
                }
                });
                document.getElementById("new").addEventListener("click", function(){
                  window.location.href = "https://educpk.github.io/projects/web/Version2/create/"
                })
                document.getElementById("sign").addEventListener('click', function(){
                  var date = new Date();
                  date.setTime(date.getTime() + (24 * 60 * 60 * 1000)); // Set the expiration time to 24 hours in the future
                  document.cookie = `username=; expires=${date.toUTCString()}; path=/`;
                  window.location.reload();
                })
                document.getElementById('profile').addEventListener("click", function(){
                  window.open("https://educpk.github.io/users/?" + user)
                })
                const path_ = 'users/' + user + "/photo";
                const valueRef_ = firebase.database().ref(path_);
                    
                valueRef_.once('value')
                  .then((snapshot) => {
                    const value = snapshot.val().split("?s=")[0] + "?s=30";
                    document.getElementById("pfp-logo").src=value

                  })

        }
    })
    .catch((error) => {
        console.log("Error reading data:", error);
    });
}
export function login_account(){
  login()
}