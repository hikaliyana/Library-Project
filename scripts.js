let myLibrary = [];

function Book(title, author, pages, ifRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.ifRead = ifRead;
}

Book.prototype = {
  tellIfRead() {
    return this.ifRead ? "Already read" : " Not read yet";
  },
};

const books = document.getElementById("books");
const addBtn = document.getElementById("addbtn");
const form = document.getElementById("formpage");
const subBtn = document.getElementById("submitbtn");
const cancelBtn = document.getElementById("closeformbtn");

addBtn.addEventListener("click", () => {
  form.classList.remove("hide");
});

cancelBtn.addEventListener("click", () => {
  form.classList.add("hide");
});

subBtn.addEventListener("click", () => {
  const title = document.getElementById("addtitle").value;
  const author = document.getElementById("addauthor").value;
  const pages = document.getElementById("addpages").value;
  const ifRead = document.getElementById("addifread").checked;
  const newbook = new Book(title, author, pages, ifRead);
  myLibrary.push(newbook);
  form.classList.add("hide");
  displayBooks(newbook);
});

function displayBooks(book) {
  let bookcard = document.createElement("div");
  bookcard.className = "bookcard";
  bookcard.innerHTML = `
    <div>   
      <h2>${book.title}</h2>
      <h4><small>by</small> ${book.author}</h4>
      <p>${book.pages} pages</p>
    </div>
    <div class="bookchange">
     <button id="changebtn" class=${
       book.ifRead ? "yesread" : ""
     }>${book.tellIfRead()}</button>
     <button id="deletebtn">Delete Book</button>
    </div>
  `;
  books.appendChild(bookcard);

  const changebtn = bookcard.querySelector("#changebtn");
  changebtn.addEventListener("click", () => {
    book.ifRead = !book.ifRead;
    changebtn.textContent = book.tellIfRead();
    changebtn.classList.toggle("yesread");
  });

  const deletebtn = bookcard.querySelector("#deletebtn");
  deletebtn.addEventListener("click", () => {
    myLibrary.splice(myLibrary.indexOf(book), 1);
    books.removeChild(bookcard);
  });
}
