const newButton = document.querySelector(".newButton");
const bookForm = document.querySelector(".bookForm");
const addButton = document.querySelector(".addButton");
const main = document.querySelector(".main");
const bookTitle = document.querySelector("#bookTitle");
const bookAuthor = document.querySelector("#bookAuthor");
const bookPages = document.querySelector("#bookPages");
const checkBox = document.querySelector("#isRead");
const cancelButton = document.querySelector(".cancelButton");

let books = [];

newButton.addEventListener("click", () => (bookForm.style.display = "flex"));
addButton.addEventListener("click", (e) => e.preventDefault());
addButton.addEventListener("click", addBook);
cancelButton.addEventListener("click", (e) => e.preventDefault());
cancelButton.addEventListener("click", () => {
  bookForm.reset();
  bookForm.style.display = "none";
});

function addBook() {
  let title = bookTitle.value;
  let author = bookAuthor.value;
  let pages = bookPages.value;
  let isRead = checkBox.checked;
  book = new Book(title, author, pages, isRead);
  books.push(book);
  bookForm.style.display = "none";
  bookForm.reset();
  iterateBook();
}

function Book(title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
}

function iterateBook() {
  main.innerHTML = "";
  for (let book of books) {
    const newBookCard = document.createElement("div");
    const newBookTitle = document.createElement("div");
    const newBookAuthor = document.createElement("div");
    const newBookPages = document.createElement("div");
    const newBookRead = document.createElement("div");
    const deleteButton = document.createElement("div");
    newBookCard.appendChild(newBookTitle);
    newBookCard.appendChild(newBookAuthor);
    newBookCard.appendChild(newBookPages);
    newBookCard.appendChild(newBookRead);
    newBookCard.appendChild(deleteButton);
    newBookCard.classList.add("bookCard");
    deleteButton.innerHTML = `<svg style="width:24px;height:24px" viewBox="0 0 24 24">
    <path fill="currentColor" d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z" />
</svg>`;
    main.appendChild(newBookCard);
    newBookTitle.innerHTML = `Title: <span>${book.title}</span>`;
    newBookAuthor.innerHTML = `Author: ${book.author}`;
    newBookPages.innerHTML = `${book.pages} Pages`;
    if (book.isRead === true) {
      newBookRead.innerHTML = "Have read: Yes";
    } else {
      newBookRead.innerHTML = "Have read: No";
    }
    deleteButton.addEventListener("click", deleteCard);
  }
}

function deleteCard() {
  let titleName =
    this.previousElementSibling.previousElementSibling.previousElementSibling
      .previousElementSibling.firstChild.nextSibling.innerHTML;
  let index = books.findIndex((book) => book.title === titleName);
  books.splice(index, 1);
  iterateBook();
}
