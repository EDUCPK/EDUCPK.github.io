function search() {
    
    const term = document.getElementById('search').value.toLowerCase();
    if(term == ""){
        return
    }
    const res = document.createElement("div");
  
    // Retrieve data from Firebase Realtime Database
    var dataRef = database.ref("projects/");
    var tile = 0;
  
    dataRef.on("value", function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        const val = childSnapshot.val();
        const title = val.title.toLowerCase();
        
        if (title.includes(term) && tile !== 3) {
          tile = tile + 1;
          const termRes = document.createElement("a");
          termRes.innerHTML = val.title + "<hr>";
          termRes.href = `https://educpk.github.io/project?${val.title}`;
          termRes.classList.add("res")
          res.append(termRes);
        }
      });
    });
    // Retrieve data from Firebase Realtime Database
    var dataRef = database.ref("users/");
    var tile = 0;
      
    dataRef.on("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            const val = childSnapshot.val();
            const title = val.name.toLowerCase();
            
            if (title.includes(term) && tile !== 3) {
              tile = tile + 1;
              const termRes = document.createElement("a");
              termRes.innerHTML = val.name + "<hr>";
              termRes.href = `https://educpk.github.io/users?${val.name}`;
              termRes.classList.add("res")
              res.append(termRes);
            }
        });
    });
        
      
    
  
    document.getElementById("result").append(res);
  }
  
  document.getElementById("search_button").addEventListener('click', search);
  