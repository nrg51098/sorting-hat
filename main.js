const housesArray=["Gryffindor", "Hufflepuff", "Ravenclaw", "Slytherin"];
const studentsArray = [];
const expelledStudentsArray =[];



//gets the name from the input element, and creates a object of name and assigned house and id
//then pushes object in to the students array, and calls the builCards function
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


//Sort by name or house based on the property, same name was assigned to the id of element to make job easier
const sort= (e)=>{
    if(studentsArray === undefined || studentsArray.length == 0){       
    }else{

        const myForm = document.querySelector(".my-form");
    if(myForm.classList.contains('show')){
        myForm.classList.remove("show");
        myForm.classList.add("hide");
    }         
    
        const sortedArray = studentsArray.sort(function(c1, c2) {
            let prop = e.target.id;                       
            if(c1[prop] > c2[prop]) {
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
//and calls the respective buildExpelledStudentsCards function
const newExpelledStdsArray = (id)=>{   
const getItem=(obj) =>{     
    return obj.id == id;
  }  
  expelledStudentsArray.push((studentsArray.find(getItem))); 
  // { name: 'id', .... }

  console.log(expelledStudentsArray);
  

const selector= ".expel-card";
buildExpelledStudentsCards(expelledStudentsArray, selector );
}


//function removes the expelled students from the original array and readjusts the indexes again, 
//also calls newExpelledStdsArray to create the new array for the expelled students
//and calls the buildCard function to recreate the remaining cards
const removeExpelledFromStudentsArray =(e)=>{

    const myForm = document.querySelector(".my-form");
    if(myForm.classList.contains('show')){
        myForm.classList.remove("show");
        myForm.classList.add("hide");
    }
// creates a new array from the expelled students, pass in the student you want to remove
newExpelledStdsArray(e.target.parentElement.id);


// remove object by index number number 1 is only one element to remove
studentsArray.splice(e.target.parentElement.id, 1);

//readjust the new indexes to match the items again after index removed
for (let i = 0; i < studentsArray.length; i++) {
    studentsArray[i].id= i;            
}

console.log(studentsArray);

// now print the remaining array to the DOM
const selector = ".house-card"
buildCard(studentsArray, selector);
}


//generates the cards for the expelled students and prints to the DOM if passed the array and selector
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



//generates the cards and prints to the DOM if passed the array and selector
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

        item.addEventListener('click', removeExpelledFromStudentsArray);

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



//This shows the form if not already visible
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
    sortByNameBtn.addEventListener('click', sort);

    const sortByHouseBtn= document.querySelector('.sortByHouse');
    sortByHouseBtn.addEventListener('click', sort);   

}



const init= ()=>{
    
    clickEvents();
   
}



init();








