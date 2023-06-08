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
export function log() {
  return new Promise((resolve, reject) => {
    var user = getCookie("username");
    if (user) {
      const path = 'users/' + user;
      const dataRef = database.ref(path);
      
      dataRef.once('value')
        .then((snapshot) => {
          resolve(snapshot.exists());
        })
        .catch((error) => {
          console.log("Error reading data:", error);
          reject(error);
        });
    } else {
      resolve(false);
    }
  });
}
