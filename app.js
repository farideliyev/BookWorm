// Book Class

class Book {
    constructor(title, author, isbn) {
        this.title = title
        this.author = author
        this.isbn = isbn
    }
}

//UI CLASS

class UI {
    static displayBooks() {
        const data = Store.getBooks()

        data.forEach(book=>UI.addBookToList(book))
    }

    static addBookToList (book) {
        const list = document.querySelector("#book-list")
        const row = document.createElement("tr")
        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td id="isbn">${book.isbn}</td>
        <td><button class="btn btn-warning btn-sm delete">X</button></td>
        `
        list.appendChild(row)


    }

    static showAlert(message, alertType){
        const div = document.createElement("div")
        div.className = `alert alert-${alertType}`
        div.appendChild(document.createTextNode(message))
        const container = document.querySelector(".container")
        const form = document.querySelector("#book-form")
        container.insertBefore(div, form)


        setTimeout(()=>{

            document.querySelector(".alert").remove()
        }, 3000)

        setTimeout(()=>{
            document.querySelector(".alert").style.opacity = "0"
        }, 1000)

    }

    static deleteBook (el) {
        el.classList.contains("delete") && el.parentElement.parentElement.remove()

    }

    static clearFields() {
        document.querySelector("#bookTitle").value = ""
        document.querySelector("#bookAuthor").value = ""
        document.querySelector("#bookISBN").value = ""
    }
}

// STORE CLASS

class Store {

    static getBooks(){
        let books;
        if(localStorage.getItem("books") === null) {
            books = []
        } else {
            console.log(JSON.parse(localStorage.getItem('books')))
            books = JSON.parse(localStorage.getItem('books'))
        }

        return books

    }

    static addBook(book){
        const books = Store.getBooks()
        books.push(book)
        localStorage.setItem('books', JSON.stringify(books))
    }


    static deleteBook(isbn){
        console.log(isbn)
        const books = Store.getBooks()
        books.forEach((book, index)=>{
            if(book.isbn === isbn){
                books.splice(index, 1)
            }
        })

        localStorage.setItem('books', JSON.stringify(books))
    }
}

//Event: Display books
document.addEventListener("DOMContentLoaded", UI.displayBooks)
//Event: Add a book
document.querySelector("#book-form").addEventListener("submit", (e)=>{
    // Prevent default value
    e.preventDefault()

    // GET Form Values
    let title = document.querySelector("#bookTitle").value
    let author = document.querySelector("#bookAuthor").value
    let isbn = document.querySelector("#bookISBN").value

    if(title === '' || author === '' || isbn === '') {
        UI.showAlert("Please fill in all fields", 'danger')

    } else {
        // Instantiate New Book
        let book = new Book(title, author, isbn)

        // Add Book to List
        UI.addBookToList(book)

        // Add Book To Local Storage

        Store.addBook(book)

        //Show success message
        UI.showAlert("Book was successfully added to list", "success")

        // Clear fields data
        UI.clearFields()
    }


})
//Event: Remove a book

document.querySelector("#book-list").addEventListener("click", (e)=>{
    //delete message
    UI.deleteBook(e.target)

    //delete from Local Storage
    let isbn = e.target.parentElement.previousElementSibling.textContent
   Store.deleteBook(isbn)

    //  Show delete alert

    UI.showAlert("Book was deleted" , "info")
})