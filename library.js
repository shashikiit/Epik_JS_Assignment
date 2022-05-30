// Write your code here!
const tableContainer = document.querySelector('.book-table');
const loginInput = document.querySelector('#logged-user');
const mainHeader = document.querySelector('#logged-in-user-name');
let bookInput = document.querySelector('.book-input');
let authorInput = document.querySelector('.author-input');

const BookInfo1 = {
    Id: '1',
    Title: 'Book1',
    Author: 'Author1',
    Lender: 'UserC',
    Borrower: 'UserB'
}
const BookInfo2 = {
    Id: '2',
    Title: 'Book2',
    Author: 'Author2',
    Lender: 'UserC'
}
const BookInfo3 = {
    Id: '3',
    Title: 'Book3',
    Author: 'Author3',
    Lender: 'UserD',
    Borrower: 'UserC'
}
const BookInfo4 = {
    Id: '4',
    Title: 'Book4',
    Author: 'Author4',
    Lender: 'UserA'
}
const BookInfo5 = {
    Id: '5',
    Title: 'Book5',
    Author: 'Author5',
    Lender: 'UserA'
}
const BookInfo6 = {
    Id: '6',
    Title: 'Book6',
    Author: 'Author6',
    Lender: 'UserB',
    Borrower: 'UserA'
}

const books = [BookInfo1, BookInfo2, BookInfo3, BookInfo4, BookInfo5, BookInfo6];

const users = ['UserA', 'UserB', 'UserC', 'UserD'];

let currentUser, currentLength;

const initialTableContent = tableContainer.innerHTML;

const tableInitialData = () => {
    tableContainer.innerHTML = initialTableContent;
    displayDetails();
    displayAdd();
}

const displayHeader = () => {
    if(currentUser) {
        mainHeader.textContent = `Logged in user: ${currentUser}`;
    } else {
        mainHeader.textContent = 'No user Logged in';
    }
}

const displayDetails = () => {
    books.forEach(function(book) {
        const html = `
        <tr>
            <td>${book.Id}</td>
            <td>${book.Title}</td>
            <td>${book.Author}</td>
            <td>${book.Lender}</td>
            <td>${book.Borrower ? book.Borrower : '-'}</td>
            <td>${
                !currentUser ? '-' : `${
                    currentUser === book.Borrower ? `<button onClick="returnFunction(this.id)" class="return-button" id="${book.Id}">return</button>` : `${
                        (currentUser === book.Lender) ? '-' : `${
                            books.includes(book) && book.Borrower ? '-' : `<button onClick="borrowFunction(this.id)" class="borrow-button" id="${book.Id}">borrow</button>`
                        }`
                    }`
                }`
            }</td>
        </tr>
        `;
        tableContainer.insertAdjacentHTML('beforeend',html);
    })
}

displayHeader();
displayDetails();

const changeLoggedInUser =  () => {
    if(users.includes(loginInput.value))
        currentUser = loginInput.value;
        else{
            currentUser='';
            books.forEach(function(arr){
              arr.action='-';
            })
            document.querySelector("#logged-in-user-name").textContent=' ';
            document.querySelector("#logged-in-user-name").textContent='No user Logged In';
            alert('User does not exist'); 
            
          }
    displayHeader();
    tableInitialData();
}

const displayAdd = () => {
        currentLength = books.length;
        const html = `
        <tr>
            <td>${String(++currentLength)}</td>
            <td>${'<input class="book-input" type="text" placeholder="title">'}</td>
            <td>${'<input class="author-input" type="text" placeholder="author">'}</td>
            <td>${currentUser}</td>
            <td>-</td>
            <td><button onClick="addbutton()" class="btn-add">add</button></td>
        </tr>
        `;
        tableContainer.insertAdjacentHTML('beforeend',html);
}

const addbutton = () => {
    bookInput = document.querySelector('.book-input');
    authorInput = document.querySelector('.author-input');
    const tempObject = {};
    tempObject.Id = String(currentLength);
    tempObject.Title = bookInput.value;
    tempObject.Author = authorInput.value;
    tempObject.Lender = document.getElementById("logged-user").value;
    if(tempObject.Title === '' || tempObject.Author === '' || tempObject.Title === '' && tempObject.Author === '')
      {
        alert("Title and Author cannot be empty!");
      }

      else 
      {
       let check=true;

       books.some(function(t)
       {
         if(t.Title === tempObject.Title)
         {
          alert(" Book exist! Please add a unique book ");
          check = false;
         }
       }
       )
       if(check) 
       {
    
       books.push(tempObject);
       tableInitialData();
   
       }
      }
    }

    
    

    


const returnFunction = (clicked) => {
  books[clicked-1].Borrower = '';
  tableInitialData();
}

const borrowFunction = (val) => {
    books[val-1].Borrower = document.getElementById("logged-user").value;
   tableInitialData();
}