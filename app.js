
shownotes();
//if user enter the notes. store it to the local storage
let addBtn = document.getElementById('addBtn');
addBtn.addEventListener('click', function (e) {
    let addTxt = document.getElementById('addTxt');
    let addTitle = document.getElementById('addTitle');
    let notes = localStorage.getItem('notes')

    
    if(addTxt.textLength == 0){
        alert('Please write something');
        
    }
     else if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
        add()
    }
});
 
function add(){
    
    let myobj = {
        Title : addTitle.value,
        Text : addTxt.value
    }
    notesObj.push(myobj);
    localStorage.setItem('notes', JSON.stringify(notesObj))
    addTxt.value = '';
    addTitle.value = '';
    //console.log(notesObj)
    shownotes();

}

//function to print the Notes
function shownotes() {
    let notes = localStorage.getItem('notes')
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let html = '';
    notesObj.forEach(function (element, index) {
        html += `<div class=" noteCard my-2 mx-2 card" style="width: 18rem;">

        <div class=" card-body">
            <h5 class="card-title">${element.Title}</h5>
            <p class="card-text">${element.Text}</p>
            <button id= '${index}' onclick = "deleteNote(this.id)" class="btn btn-primary">Delete note</button>
        </div>
    </div> `;
    })
    let notesElm = document.getElementById('notes')
    if (notesObj.length != 0) {
        notesElm.innerHTML = html;
    }
    else {
        notesElm.innerHTML = `<div style="color:white;" class = "not">There is currently no notes</div>`
    }
}

//fuction to delete notes
function deleteNote(index) {
    //console.log('deleted note', index)
    let notes = localStorage.getItem('notes')
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }

    notesObj.splice(index,1)
    localStorage.setItem('notes', JSON.stringify(notesObj))
    shownotes();

}

// to search note
let search = document.getElementById('searchTxt');
search.addEventListener("input", function(){

    let inputVal = search.value.toLowerCase();
    // console.log('Input event fired!', inputVal);
    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function(element){
        let cardTxt = element.getElementsByTagName("div")[0].innerText;
        if(cardTxt.includes(inputVal)){
            element.style.display = "block";
        }
        else{
            element.style.display = "none";
        }
        // console.log(cardTxt);
    })
})
