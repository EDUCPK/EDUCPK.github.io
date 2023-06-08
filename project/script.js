import { log } from "../script/db/loginchecker.js";
import { insert } from "../script/functions.js";
if(window.location.href.includes("?")){
    // Specify the path to the data node you want to check
    const  tile = decodeURI(window.location.href.split("?").pop())
    const path_ = 'projects/' + tile;

    // Create a reference to the data node
    const dataRef_ = database.ref(path_);

    // Read the data once
    dataRef_.once('value')
    .then((snapshot) => {
        if (snapshot.exists()) {
            const val = snapshot.val()
            document.getElementById("container").parentNode.removeChild(document.getElementById("container"))
            const div = document.createElement("div")
            const content = val.code
            
            const blob= new Blob([content], {
                type:'text/html'
            
            });
            
            const fileurl = URL.createObjectURL(blob);
            div.innerHTML = `
            <div id="title"><h1>${val.title}</h1></div>
            <h4><a href="https://educpk.github.io/users?${val.creator}">${val.creator}</a></h4>
            <div id="about"><p>${val.about}</p></div>
            
            <a href="${fileurl}"><button id="new">View project</button></a>

            <div id="view">
            <iframe src="${fileurl}" width="100%" >
            </div>
                
                
            `
            div.id = "postFull"
            
            document.getElementById("projects").append(div)

        }else{
            document.getElementById("container").style.visibility = 'visible'
        }
    })
}else{
    window.location.href = "https://educpk.github.io/"
}