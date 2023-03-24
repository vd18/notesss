let addbtn = document.getElementById('addBtn');
let addtxt = document.getElementById('addTxt');
let addtitle = document.getElementById('addTitle');
shownotes();

addbtn.addEventListener('click', function(e) {
    
    let notes = localStorage.getItem('notes');

    if(addtxt.textLength == 0){
        alert('Please write something');
        
    }
    

    
     else if (notes == null) {
        notesobj = [];
    }
    else{
        notesobj = JSON.parse(notes)
    

    let mynotes = {
        title: addtitle.value,
        text: addtxt.value
        }



    notesobj.push(mynotes);
    localStorage.setItem('notes', JSON.stringify(notesobj));
    addtxt.value = '';
    addtitle.value = '';
    console.log(notesobj);
    shownotes();
    }  
}
)


function shownotes(){
    let notes = localStorage.getItem('notes');
    
    
    if (notes == null  ) {
        notesobj = [];
    }
    else{
        notesobj = JSON.parse(notes)
    }

    let html = '';
    notesobj.forEach(function(element, index){
        html +=`<div class="noteCard my-2 mx-2 card" style="width: 18rem;"> 
        <div class="card-body"> 
        <h5 class="card-title"> ${element.title}</h5> 
         <p class="card-text">  ${element.text} </p>  
        <button id=${index} onclick="deleteBtn(this.id)" class="btn btn-primary"> Delete</button>   </div>   </div>`;   
       
    });
    let noteselm = document.getElementById('notes');
    if(notesobj.length != 0){
        noteselm.innerHTML = html
    }
     else {
        noteselm.innerHTML = `Nothing to show! Use "Add a Note" section above to add notes.`;
      }
}

function deleteBtn(index){
    let notes = localStorage.getItem('notes');

    if (notes == null) {
        notesobj = [];
    }
    else{
        notesobj = JSON.parse(notes)
    }
    
    notesobj.splice(index , 1);
    location.reload()
    localStorage.setItem('notes', JSON.stringify(notesobj));
    shownotes();
}

let search = document.getElementById('searchTxt');
search.addEventListener("input", function(){

    let inputVal = search.value.toLowerCase();

    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function(element){
       
        let cardTxt = element.getElementsByTagName("div")[0].innerText;
       
        if(cardTxt.includes(inputVal)){
            element.style.display = "block";
        }
        else{
            element.style.display = "none";
        }
    
    })
})

