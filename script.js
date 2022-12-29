let btnSearch = document.querySelector("#Search");
let input = document.querySelector("input");
let result = document.querySelector(".resultDiv");


/****************DISPLAYING EVERY OBJECT IN THE JSON.file******************/
async function dataFromJson (){
    const response = await fetch(`http://localhost:3000/game`)
    const data = await response.json();
    
    window.onload = function() {
      displayData(data);
    }
}

  dataFromJson ();





function displayData(data){
  let everyGameDiv = document.querySelector(".everyGame")
    let games =  data
    for (const game of games) {
    let div = document.createElement("div");
    div.className="gameCard";
    let h1 = document.createElement("h1");
    let p = document.createElement("p");
    let pID = document.createElement("p");
    pID.innerText = "ID";
    pID.className="pID";
    
    p.innerHTML = `Genre: ${game.typeOf} <br> Age: ${game.age}`;
    h1.innerHTML = game.name;

    document.execCommand("copy");

    div.append(h1,p,pID);
    everyGameDiv.append(div);
   
      pID.addEventListener("mouseover",()=>{
      pID.innerText = game.id;
      
      })
      
    }
    
}


/*********SEARCHING FUNCTION ON SPECIFIC NAME******/
async function dataFromUser (searchValue){
    const response = await fetch(`http://localhost:3000/game/${searchValue}`)
    const data = await response.json();
    
    return data;
}


btnSearch.addEventListener("click", async () => {
    result.innerHTML= "";


   
    let info = await dataFromUser(input.value);

    if(info.name){
        let h1 = document.createElement("h1");
        let p = document.createElement("p");
        p.innerHTML = `Genre: ${info.typeOf} <br> Age: ${info.age}`;
        h1.innerHTML = info.name;
    
        result.append(h1,p);
    }
});


/*****************END OF SEARCHING****************/

/*********************ADDGAME TO SHELF ***************************/
let btnAdd = document.querySelector("#add");
console.log(btnAdd);

let inputName = document.querySelector("#Name")
let inputAge = document.querySelector("#Age")
let inputType = document.querySelector("#typeOfGame")

const postData = async () => {
fetch('http://localhost:3000/game/addgame', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: inputName.value,
    age: inputAge.value,
    typeOf: inputType.value
  })
}).then(res => res.json())
  .then(data => console.log(data));
}

btnAdd.addEventListener("click",postData);


/**********************DELETE A SPECIFIC GAME IN SHELF************************/
const btnDelete = document.querySelector("#deleteData");
const inputDelete = document.querySelector("#DeleteInput"); 

async function deleteData (input){
  try {
    const response = await fetch(`http://localhost:3000/game/${input}/delete`,{
      method: 'DELETE'
    });
  
    if (response.ok) {
      const data = await response.json();
      return data;

    } else {
      console.error(`Error ${response.status}: ${response.statusText}`);
    }
  } catch (error) {
    console.error(error);
  }
}

btnDelete.addEventListener("click", async ()=>{

  await deleteData(inputDelete.value);
  
 
})


/**************EDIT ANYTHING, NEEDED A SPECIFIC ID TO EDIT**************************/

let btnUpdate = document.querySelector("#updateBtn");
let updateName = document.querySelector("#updateInput");
let inputId = document.querySelector("#byId");

console.log(inputId,updateName);


async function updateData (id, input) {
  try {
  
    const response = await fetch(`http://localhost:3000/game/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name:input})
    });
   
    if (response.ok) {
      
      const data = await response.json();
      console.log(data);
    } else {
  
      console.error(`Error ${response.status}: ${response.statusText}`);
    }
  } catch (error) {
  
    console.error(error);
  }
}


btnUpdate.addEventListener("click",async()=>{

await updateData(inputId.value,updateName.value)

});


/*************DISPLAY-NONE FUNCTION FOR EVERY ELEMENT******************/


let openAdd = document.querySelector("#OpenAdd");
let openDelete = document.querySelector("#OpenDelete");
let openUpdate = document.querySelector("#OpenUpdate");
let addDiv = document.querySelector(".AddDiv")
let updateDiv = document.querySelector(".updateDiv")
let deleteDiv = document.querySelector(".DeleteDiv")

function toggleVisibility(element) {
  if (element.style.display === "none") {
    element.style.display = "flex";
  } else {
    element.style.display = "none";
  }
}

openAdd.addEventListener("click",()=>{
  toggleVisibility(addDiv)
  updateDiv.style.display="none";
  deleteDiv.style.display="none";
})
openDelete.addEventListener("click",()=>{
  toggleVisibility(deleteDiv)
  addDiv.style.display="none";
  updateDiv.style.display="none";
})
openUpdate.addEventListener("click",()=>{
  toggleVisibility(updateDiv)
  addDiv.style.display="none";
  deleteDiv.style.display="none";
})

