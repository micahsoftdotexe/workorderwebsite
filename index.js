
function makenewcustomer(id, FirstName, LastName){
    var newnode = document.getElementById("c-1").cloneNode(true);
    newnode.id = "c"+id
    newnode.classList.remove('invisible');
    newnode.classList.add('visible');
    for(i=0;i < newnode.childNodes.length; i++){
        var child = newnode.childNodes[i];
        if(child.id == "first-1"){
            child.id = "first"+id;
            child.innerHTML = FirstName;

        }
        if(child.id == "last-1"){
            child.id = "last"+id;
            child.innerHTML = LastName
        }
        if(child.id == "cid-1"){
            child.id = "cid"+id;
            child.innerHTML = id;
        }
        if(child.id == "csel-1"){
            child.id = "csel"+id;
        }
    }
    
    return newnode;
}
function addcustomer(event){
    //console.log(this.readyState);
    if(this.readyState === 4 && this.status === 200){
        response = this.responseText;
        response = JSON.parse(response);
        
        for(var i = 0; i < Object.keys(response.recordset).length;i++){
            var newnode = makenewcustomer(response.recordset[i].CustomerID,response.recordset[i].FirstName,response.recordset[i].LastName);
            document.getElementById("customerTable").children[0].appendChild(newnode);
        }
        

    }
}
function postapi(connectionstring,data,func){
    //console.log("called");
    const xhr = new XMLHttpRequest()
    
    //xhr.addEventListener('readystatechange',func);
    xhr.onreadystatechange = func;
    // console.log(json);
    xhr.open('POST',connectionstring,true)
    xhr.setRequestHeader('content-type', 'application/json')
    
    xhr.send(data);
    
}
function searchcustomer(){
    //delete all previous seach results
    var children = document.getElementById("customerTable").children[0].children;
    console.log(document.getElementById("customerTable").children[0].children);
    console.log(children.length);
    for(var i = 0; i < children.length; i++){
        if(children[i].id != "cheader" & children[i].id != "c-1"){
            children[i].remove();
            i--;
        }
    }
    var nameel = document.getElementById("customerin").value;
    var data = {
        'name': nameel
    }
    var json = JSON.stringify(data);
    postapi('http://localhost:8080/customersearch',json,addcustomer);
    
   
}