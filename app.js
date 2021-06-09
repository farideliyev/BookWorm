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
        const data = [
            {
                title: 'BOOK1',
                author: 'Farid Aliyev',
                isbn: '1234567'
            },

            {
                title: 'BOOK2',
                author: 'Farid Aliyev',
                isbn: '7654321'
            },

        ]

        const books = data

        books.forEach(book=>UI.addBookToList(book))
    }

    static addBookToList (book) {
        const list = document.querySelector("#book-list")
        const row = document.createElement("tr")
        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><button class="btn btn-warning btn-sm delete">X</button></td>
        `
        list.appendChild(row)
    }

    static clearFields() {
        document.querySelector("#bookTitle").value = ""
        document.querySelector("#bookAuthor").value = ""
        document.querySelector("#bookISBN").value = ""
    }
}

// STORE CLASS

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

    // Instantiate New Book
    let book = new Book(title, author, isbn)
    console.log(book)

    // Add Book to List
    UI.addBookToList(book)

    // Clear fields data
    UI.clearFields()
})
//Event: Remove a book