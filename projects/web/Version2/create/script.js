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