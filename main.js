// define class books
class Book{
    constructor(title,author,genre,pages,read){
        this.title=title;
        this.author=author;
        this.genre=genre;
        this.pages=pages;
        this.read=read;
    }
}

// Library array to store book instances
const library=[
    new Book("The Blue Umbrella", "Ruskin Bond", "Children's Fiction", 90, true),
    new Book("The Sign of the Four", "Arthur Conan Doyle", "Mystery, Detective", 129, true),
    new Book("A Study in Scarlet", "Arthur Conan Doyle", "Mystery, Detective", 108, true)
];




// get the container for book card
const booksGrid=document.getElementById('booksGrid');

// function to display books
function displayBooks(){

    document.querySelectorAll(".dynamic-book").forEach(book => book.remove());
    

    // iterate over the lib array and create html ofr each book

    library.forEach((book,index)=>{
        const bookCard = document.createElement("div");
        bookCard.classList.add("book-card", "dynamic-book");

        bookCard.innerHTML=`
            <h3>${book.title}</h3>
            <p><strong>Author:</strong>${book.author}</p>
            <p><strong>Genre:</strong>${book.genre}</p>
            <p><strong>Pages:</strong>${book.pages}</p>
            <label class="switch">
                <input type="checkbox" class="toggle-read-btn" data-index="${index}" ${book.read ? "checked" : ""}>
                <span class="slider"></span>
            </label>
            <button class="remove-btn" data-index="${index}">Remove Book</button>
            <button class="toggle-read-btn" data-index="${index}">Toggle Read Status</button>
        `;

        booksGrid.appendChild(bookCard);

    });

    addEventListeners();
    updateBookLogs();
}


function addEventListeners(){
    document.querySelectorAll('.remove-btn').forEach(button=>{
        button.addEventListener("click",(e)=>{
            const index=e.target.dataset.index;
            removeBook(index);
        });
    });

    document.querySelectorAll(".toggle-read-btn").forEach(button=>{
        button.addEventListener("click",(e)=>{
            const index=e.target.dataset.index;
            toggleReadStatus(index);
        });
    });
}

// selecting from and input elements
const bookForm=document.getElementById('bookForm');

// adding event listener for the from submission
bookForm.addEventListener("submit",(event)=>{
    event.preventDefault(); //prevent te default submission to server

    // capture the data from element input
    const title=document.getElementById('title').value;
    const author=document.getElementById('author').value;
    const genre=document.getElementById('genre').value;
    const pages=document.getElementById('pages').value;
    const read=document.getElementById('read').value==="Yes";

    const newBook=new Book(title,author,genre,pages,read);

    addBookToLibrary(newBook); // Add new book to the library and display it

    bookForm.reset();
});
function updateBookLogs(){
    const totalBooks=library.length;
    const readBooks=library.filter(book=>book.read).length;
    const unreadBooks=totalBooks-readBooks;

    document.getElementById('bookCount').textContent=`Number of Books: ${totalBooks}`;
    document.getElementById('readCount').textContent=`Read: ${readBooks}`;
    document.getElementById("unreadCount").textContent = `Unread: ${unreadBooks}`;
}

// function to save the lib to local storage

function saveLibraryToLocalStorage(){
    sessionStorage.setItem('library',JSON.stringify(library))
}

// function to load the library from local storage
function loadLibraryFromLocalStorage(){
    const storedLibrary=sessionStorage.getItem('library');
    if(storedLibrary){
        const parsedLibrary=JSON.parse(storedLibrary);
        library.length=0;//clear current lib
        parsedLibrary.forEach(bookData=>{
            library.push(new Book(bookData.title,bookData.author,bookData.genre,bookData.pages,bookData.read));
        });
    }
}
// Add a new book to the library
function addBookToLibrary(book) {
    library.push(book);
    saveLibraryToLocalStorage();
    displayBooks(); // Update the display each time a book is added
}
function removeBook(index){
    library.splice(index,1);
    saveLibraryToLocalStorage();
    displayBooks();
}
function toggleReadStatus(index){
    library[index].read=!library[index].read;
    saveLibraryToLocalStorage();
    displayBooks();
}
window.onload=function(){
    loadLibraryFromLocalStorage();
    displayBooks();
}