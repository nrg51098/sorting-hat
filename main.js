const housesArray=["Gryffindor", "Hufflepuff", "Ravenclaw", "Slytherin"];
const studentsArray = [];
const expelledStudentsArray =[];



//gets the name from the input element, and pushes in to the students array, and prints to the dom
const getName=(e)=>{
    const inputName= document.querySelector(".form-control");
    if(inputName.value===""){
     alert("Please enter a name");   
    }else {
        const enteredName = inputName.value;
        const randomHouse = randomNumber(housesArray.length);
        //creates a array of objects
        studentsArray.push({
            name: enteredName,
            house: housesArray[randomHouse]
        })
        console.log(studentsArray);
        //assigns a id to the object
        for (let i = 0; i < studentsArray.length; i++) {
            studentsArray[i].id= i;            
        }
        
        
        const selector = ".house-card"
          buildCard(studentsArray, selector);

    }
        e.preventDefault();
}



const sortByName= (e)=>{
    if(studentsArray === undefined || studentsArray.length == 0){
       
    }else{

        const myForm = document.querySelector(".my-form");
        if(myForm.classList.contains('show')){
            myForm.classList.remove("show");
            myForm.classList.add("hide");
        }
        
        const sortedArray = studentsArray.sort(function(c1, c2) {
            if(c1.name > c2.name) {
              return 1;
            } else {
              return -1;
            }}
            );
            const selector = ".house-card";           
            buildCard(sortedArray, selector);
    }

    e.preventDefault();
}




const sortByHouse= (e)=>{
    if(studentsArray === undefined || studentsArray.length == 0){       
    }else{

        const myForm = document.querySelector(".my-form");
    if(myForm.classList.contains('show')){
        myForm.classList.remove("show");
        myForm.classList.add("hide");
    }        
        const sortedArray = studentsArray.sort(function(c1, c2) {
            if(c1.house > c2.house) {
              return 1;
            } else {
              return -1;
            }}
            );

            const selector = ".house-card";            
            buildCard(sortedArray, selector);
    }
    e.preventDefault();
}




//function creates a new array from the expelled students
const createExpelledArray = (id)=>{   
const getItem=(obj) =>{     
    return obj.id == id;
  }  
  expelledStudentsArray.push((studentsArray.find(getItem))); 
  // { name: 'id', .... }

  console.log(expelledStudentsArray);
  

const selector= ".expel-card";
buildExpelledStudentsCards(expelledStudentsArray, selector );
}



const createExpelStudentArray =(e)=>{

    const myForm = document.querySelector(".my-form");
    if(myForm.classList.contains('show')){
        myForm.classList.remove("show");
        myForm.classList.add("hide");
    }
// creates a new array from the expelled students, pass in the student you want to remove
createExpelledArray(e.target.parentElement.id);


// remove object by index number
studentsArray.splice(e.target.parentElement.id, 1);

//readjst the new indexes to match the items again after index removed
for (let i = 0; i < studentsArray.length; i++) {
    studentsArray[i].id= i;            
}

console.log(studentsArray);

// now print the remaining array to the DOM
const selector = ".house-card"
buildCard(studentsArray, selector);
}


//generates the cards and prints to the DOM if passed teh array and selector
const buildExpelledStudentsCards = (passedCards, selector)=>{
    
    domString="";
    
    for (let i = 0; i < passedCards.length; i++) {
        domString += `
        <div id="${passedCards[i].id}" class="card ${passedCards[i].house}">
        <h1> ${passedCards[i].name} </h1>
        <h3> ${passedCards[i].house} </h3>
        <h3> You have been Expelled!!!</h3>       
        </div>
        `               
    }
    
    printToDom(selector, domString);
    
}




//generates the cards and prints to the DOM if passed teh array and selector
const buildCard = (passedCards, selector)=>{
    
    domString="";
    
    for (let i = 0; i < passedCards.length; i++) {
        domString += `
        <div id="${passedCards[i].id}" class="card ${passedCards[i].house}">
        <h1> ${passedCards[i].name} </h1>
        <h3> ${passedCards[i].house} </h3>
        <button type="submit" id="expel" class= "btn btn-primary mb-2"> Expel!</button> 
        </div>
        `               
    }
    
    printToDom(selector, domString);
    const allExpelBtn = document.querySelectorAll('#expel')
    allExpelBtn.forEach((item)=>{

        item.addEventListener('click', createExpelStudentArray);

    });
}



//Print to the dom just pass the selector and any domString
const printToDom=(selector, domString) =>{
    document.querySelector(selector).innerHTML = domString;
}




//get the random number between 0 and number passed
const randomNumber=(number)=>{
    
return Math.floor(Math.random() * Math.floor(number));

}




const showForm = (e) =>{
    const myForm = document.querySelector(".my-form");  
    if(myForm.classList.contains('hide')){
        myForm.classList.remove("hide");
        myForm.classList.add("show");
    } 

    e.preventDefault();
}



// hide the form if pressed the hide button
const hideForm = (e)=>{
    const myForm = document.querySelector(".my-form");
    if(myForm.classList.contains('show')){
        myForm.classList.remove("show");
        myForm.classList.add("hide");
    }

     e.preventDefault();
}



//all the click events
const clickEvents =()=>{
    const findButton= document.querySelector("#findBtn");
    findButton.addEventListener('click', showForm);

    const hideBtn= document.querySelector('.hideBtn');
    hideBtn.addEventListener('click', hideForm);

    const sortBtn= document.querySelector('.sortBtn');
    sortBtn.addEventListener('click', getName);    

    const sortByNameBtn= document.querySelector('.sortByName');
    sortByNameBtn.addEventListener('click', sortByName);

    const sortByHouseBtn= document.querySelector('.sortByHouse');
    sortByHouseBtn.addEventListener('click', sortByHouse);   

}



const init= ()=>{
    
    clickEvents();
   
}



init();








