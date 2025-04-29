var bookmarkname = document.getElementById("bookmarkname");
var bookmarkURL = document.getElementById("bookmarkurl");
var msg = document.getElementById("msg");
var ListBooks = [];
var regexURL = /^https?:\/\/(www\.)[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b$/;
var regexName = /^[A-Za-z0-9].{2,}$/;
var currentuser = JSON.parse(localStorage.getItem("currentUser"));
var AllBooks = JSON.parse(localStorage.getItem("book")) || [];

for (var i = 0; i < AllBooks.length; i++) {
  if (AllBooks[i].index === currentuser) {
    ListBooks.push(AllBooks[i]);
  }
}
console.log("All Books:", AllBooks);
console.log("User's Books:", ListBooks);
  display();


function add() {
  var urlText = bookmarkURL.value;
  var nameText = bookmarkname.value;
  if (regexURL.test(urlText) && regexName.test(nameText)) {
    var exists = false;

    for (var i = 0; i < ListBooks.length; i++) {
      if (ListBooks[i].name === nameText) {
        exists = true;
        break;
      }
    }

    if (exists) {
      msg.classList.remove("d-none");
    } else {
      
      var singlebook = {
        index: currentuser,
        name: nameText,
        url: urlText,
      };
      
      AllBooks.push(singlebook); 
      localStorage.setItem("book", JSON.stringify(AllBooks)); 

      if (singlebook.index === currentuser) {
        ListBooks.push(singlebook);
      }
      display();
      clear();
      msg.classList.add("d-none");
    }
  } else {
    var errorModal = new bootstrap.Modal(document.getElementById("errorModal"));
    errorModal.show();
  }
}

function display() {
  var cartona = "";
  for (var i = 0; i < ListBooks.length; i++) {
    cartona += `
     <tr>
      <td>${i + 1}</td>
      <td>${ListBooks[i].name}</td>
      <td>
        <button class="btn btn-visit" onclick="visit('${ListBooks[i].url}')">
          <i class="fa-solid fa-eye pe-2"></i>Visit
        </button>
      </td>
      <td>
        <button class="btn btn-delete pe-2" onclick="deleteBook(${i})">
          <i class="fa-solid fa-trash-can"></i> Delete
        </button>
      </td>
    </tr>
    `;
  }
  document.getElementById("tableBody").innerHTML = cartona;
}

function clear() {
  bookmarkname.value = "";
  bookmarkURL.value = "";
}

function visit(url) {
  window.open(url, "_blank");
}

function deleteBook(index) {
 
  AllBooks.splice(AllBooks.findIndex(book => book.name === ListBooks[index].name), 1);
  localStorage.setItem("book", JSON.stringify(AllBooks));


  ListBooks = AllBooks.filter(book => book.index === currentuser);

  display();
 
}

function namevalidate() {
  var nameText = bookmarkname.value;
  if (regexName.test(nameText)) {
    bookmarkname.classList.remove("is-invalid");
    bookmarkname.classList.add("is-valid");
  } else {
    bookmarkname.classList.add("is-invalid");
    bookmarkname.classList.remove("is-valid");
  }
}

function urlvalidate() {
  var urlText = bookmarkURL.value;
  if (regexURL.test(urlText)) {
    bookmarkURL.classList.remove("is-invalid");
    bookmarkURL.classList.add("is-valid");
  } else {
    bookmarkURL.classList.add("is-invalid");
    bookmarkURL.classList.remove("is-valid");
  }
}
