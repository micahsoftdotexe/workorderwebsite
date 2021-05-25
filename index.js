
function makenewcustomer(id, FirstName, LastName){
    var newnode = document.getElementById("c.-1").cloneNode(true);
    newnode.id = "c."+id
    newnode.classList.remove('invisible');
    newnode.classList.add('visible');
    for(i=0;i < newnode.childNodes.length; i++){
        var child = newnode.childNodes[i];
        if(child.id == "first.-1"){
            child.id = "first."+id;
            child.innerHTML = FirstName;

        }
        if(child.id == "last.-1"){
            child.id = "last."+id;
            child.innerHTML = LastName
        }
        if(child.id == "cid.-1"){
            child.id = "cid."+id;
            child.innerHTML = id;
        }
        if(child.id == "csel.-1"){
            child.id = "csel."+id;
        }
    }
    
    return newnode;
}
function addautomobiles(event){
    console.log(this.responseText);
}

function syncautomobiles(id){
    var children = document.getElementById("automobileTable").children[0].children;
    for(var i = 0; i < children.length; i++){
        if(children[i].id != "aheader" & children[i].id != "a.-1"){
            children[i].remove();
            i--;
        }
    }
    var data={
        'id':id
    }
    var json = JSON.stringify(data);
    postapi('http://localhost:8080/customersearch',json,addautomobiles);
}
function selectustomer(node){
    //get info
    var newnode = document.getElementById("cselected.-1").cloneNode(true);
    var old = node.parentNode.parentNode
    var Firstname;
    var id;
    var Lastname;
    for(i=0; i < old.children.length; i++){
        //console.log(old.children[i].id.split('.')[0])
        if(old.children[i].id.split('.')[0] == "first"){
            Firstname = old.children[i].innerHTML;
            id = old.children[i].id.split('.')[1]
        }
        if(old.children[i].id.split('.')[0] == "last"){
            Lastname = old.children[i].innerHTML;
        }
        
    }
    //add new node
    newnode.id ="cselected."+id;
    newnode.classList.remove('invisible');
    newnode.classList.add('visible');
    for(i=0;i < newnode.childNodes.length; i++){
        var child = newnode.childNodes[i];
        //console.log(newnode.children);
        if(child.id == "first.-1"){
            child.id = "first."+id;
            child.innerHTML = Firstname;

        }
        if(child.id == "last.-1"){
            child.id = "last."+id;
            child.innerHTML = Lastname
        }
        if(child.id == "cid.-1"){
            child.id = "cid."+id;
            child.innerHTML = id;
        }
        if(child.id == "csel.-1"){
            child.id = "csel."+id;
        }
    }
    var customer = document.getElementById("customerselectTable");
    //check if more than one customer is selected
    if(customer.children[0].children.length<3){
        document.getElementById("customerselectTable").children[0].appendChild(newnode);
        syncautomobiles(id);
    }
    else{
        alert("Cannot add more than one person to a work order");
    }
    
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
function deselcustomer(element){
    //console.log(element.parentNode.parentNode);
    element.parentNode.parentNode.remove();
}
function postapi(connectionstring,data,func){
    //console.log("called");
    const xhr = new XMLHttpRequest()
    
    //xhr.addEventListener('readystatechange',func);
    xhr.onreadystatechange = func;
    xhr.open('POST',connectionstring,true)
    xhr.setRequestHeader('content-type', 'application/json')
    
    xhr.send(data);
    
}
function searchcustomer(){
    //delete all previous seach results
    var children = document.getElementById("customerTable").children[0].children;
    for(var i = 0; i < children.length; i++){
        if(children[i].id != "cheader" & children[i].id != "c.-1"){
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