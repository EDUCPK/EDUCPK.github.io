// Retrieve data from Firebase Realtime Database
var dataRef = database.ref("projects/");

dataRef.on("value", function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
        const val = childSnapshot.val()
        const div = document.createElement("div")
        const content = val.code
    
        const blob= new Blob([content], {
            type:'text/html'

        });

        const fileurl = URL.createObjectURL(blob);
        div.innerHTML = `
        <h1>${val.title}</h1>
        <h4><a href="https://educpk.github.io/users?${val.creator}">${val.creator}</a></h4>
        <p>${val.about}</p>
        <div id="view">
        <iframe src="${fileurl}" width="100%" height="100%">
        </div>
        
        
        
        `
        div.id = "post"
        div.addEventListener('click', function(){
          window.location.href = `https://educpk.github.io/project?${val.title}`
        })
        document.getElementById("container").append(div)
    });

  }, function(error) {
    console.log("Error retrieving data: " + error.code);
  });
