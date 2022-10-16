class Books{
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    } 
}

class Store{
    static getBooks(){
        let books;
        if(localStorage.getItem("books")===null){
            books = [];
        }else{
            books = JSON.parse(localStorage.getItem("books"));
        }
        return books;
    }

    static addBook(book){
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem("books",JSON.stringify(books));
    }

    static deleteBook(isbn){
        const books = Store.getBooks();
        
        books.forEach((book,index)=>{
            if(book.isbn === isbn){
                books.splice(index,1);
            }
        });

        localStorage.setItem("books",JSON.stringify(books));
    
    }
}

class UI{ 
    static displayBooks(){
        const books = Store.getBooks();
        books.forEach((book) => UI.addBookToList(book));
    }

    static addBookToList(book){
        const tablo = document.querySelector("#book-list");
        const row = document.createElement("tr");  
        row.innerHTML=`
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><i class="fa-solid fa-xmark" id="delete"></i></i></td>
        `   
        tablo.appendChild(row); 
    }
    static removeBookToList(target){
        if(target.id === "delete"){
            target.parentElement.parentElement.remove();
        }
    }
    static showAlerts(message,className){
        const div = document.createElement("div");
        div.className=`alert ${className} text-center`
        div.innerHTML=`${message}`;
        const container = document.querySelector(".container");
        const table = document.querySelector(".table");
        container.insertBefore(div,table);

        setTimeout(function(){
            document.querySelector(".alert").remove();
        },3000);
    }
    static clearFields(){
        const title = document.querySelector("#title").value="";
        const author = document.querySelector("#author").value="";
        const isbn = document.querySelector("#isbn").value="";
    }
}

document.addEventListener('DOMContentLoaded', UI.displayBooks);

document.querySelector("#book-form").addEventListener("submit",function(e){
    e.preventDefault();


    // Bilgileri Al
    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const isbn = document.querySelector("#isbn").value;

    console.log(title,author,isbn +"  Bilgileri aldık.");

    
    if(title ==="" && author==="" && isbn === ""){
        UI.showAlerts("Her alanı doldurduğunuza emin olun.","bg-warning text-black mt-2")
    }else{
        // Kitap Sınıfına bilgileri aktar.
        const book = new Books(title,author,isbn);
        // Arayüz fonksiyonlarını sırasıyla çağır.
        UI.addBookToList(book);
        Store.addBook(book);
        UI.clearFields();
        UI.showAlerts("Kitap başarıyla eklendi.","bg-success text-white mt-2")
    }  
})

document.querySelector("#book-list").addEventListener("click",function(e){
    e.preventDefault();
    console.log(e.target);

    //   
    UI.removeBookToList(e.target);
    Store.deleteBook(e.target.parentElement.previousElementSibling.textContent);

    if(e.target.id==="delete"){
        UI.showAlerts("Kitap başarıyla silindi.","bg-danger text-white mt-2"); }
})


