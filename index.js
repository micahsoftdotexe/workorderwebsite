
function makenewcustomer(id, FirstName, LastName){
    var newnode = document.getElementById("c-1").cloneNode(true);
    newnode.id = "c"+id
    newnode.childNodes.item("first-1").innerHTML = FirstName;
    console.log(newnode.childNodes.item("first-1").value)
    newnode.childNodes.item("first-1").id = "first"+id;
    newnode.childNodes.item("first-2").innerHTML = LastName;
    newnode.childNodes.item("first-2").id = "last"+id;
    newnode.childNodes.item("cid-1").innerHTML = id;
    newnode.childNodes.item("cid-1").id = "cid"+id;
    newnode.childNodes.item("csel-1").id = "csel" + id;

    console.log(newnode);
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
    //console.log("search called")
    var children = document.getElementById("customerTable").children[0].children;
    console.log(document.getElementById("customerTable").children[0].children);
    console.log(children.length);
    for(var i = 0; i < children.length; i++){
        if(children[i].id != "cheader" & children[i].id != "c-1"){
            console.log("going through");
            console.log(children[i].id);
            //console.log(children[i]);
            //console.log("ID:"+children[i].id)
            children[i].remove();
            i--;
        }
        console.log("not gone through");
        console.log(children[i].id);
    }
    var nameel = document.getElementById("customerin").value;
    var data = {
        'name': nameel
    }
    var json = JSON.stringify(data);
    postapi('http://localhost:8080/customersearch',json,addcustomer);
    
   
}