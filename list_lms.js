var searchInput = document.getElementById('searchInput');
var categoryFilter = document.getElementById('categoryFilter');
var bookList = document.getElementById('bookList');
var paginationContainer = document.getElementById('pagination');

var booksPerPage = 5;
var currentPage = 1;
var filteredBooks = [];

var books = generateBookList(30);
populateBookList(books);

searchInput.addEventListener('input', filterBooks);
categoryFilter.addEventListener('change', filterBooks);

function generateBookList(count) {
  var categories = ['programming', 'web', 'data', 'ai'];
  var books = [];

  for (var i = 1; i <= count; i++) {
    var category = categories[Math.floor(Math.random() * categories.length)];
    var book = {
      title: generateRandomTitle(),
      author: generateRandomAuthor(),
      category: category
    };

    books.push(book);
  }

  return books;
}

function populateBookList(books) {
  filteredBooks = applyFilters(books);

  var totalPages = Math.ceil(filteredBooks.length / booksPerPage);
  if (currentPage > totalPages) {
    currentPage = 1;
  }

  var startIndex = (currentPage - 1) * booksPerPage;
  var endIndex = startIndex + booksPerPage;
  var booksToDisplay = filteredBooks.slice(startIndex, endIndex);

  bookList.innerHTML = '';

  booksToDisplay.forEach(function(book) {
    var li = document.createElement('li');
    li.textContent = book.title + ' - ' + book.author + ' - ' + book.category;
    bookList.appendChild(li);
  });

  generatePaginationLinks(totalPages);
}

function generateRandomTitle() {
  var titles = [
    "JavaScript: The Good Parts",
    "Clean Code",
    "Python Crash Course",
    "HTML and CSS: Design and Build Websites",
    "Introduction to Data Science",
    "Artificial Intelligence: A Modern Approach",
    "Ruby on Rails Tutorial",
    "Node.js in Action",
    "Data Structures and Algorithms in Java",
    "Eloquent JavaScript"
  ];

  return titles[Math.floor(Math.random() * titles.length)];
}

function generateRandomAuthor() {
  var authors = [
    "Douglas Crockford",
    "Robert C. Martin",
    "Eric Matthes",
    "Jon Duckett",
    "Joel Grus",
    "Stuart Russell, Peter Norvig",
    "Michael Hartl",
    "Mike Cantelon",
    "Robert Lafore",
    "Marijn Haverbeke"
  ];

  return authors[Math.floor(Math.random() * authors.length)];
}

function filterBooks() {
  currentPage = 1;
  populateBookList(books);
}

function applyFilters(books) {
  var searchText = searchInput.value.toLowerCase();
  var category = categoryFilter.value;

  return books.filter(function(book) {
    var titleMatch = book.title.toLowerCase().includes(searchText);
    var categoryMatch = category === 'all' || book.category === category;

    return titleMatch && categoryMatch;
  });
}

function generatePaginationLinks(totalPages) {
  paginationContainer.innerHTML = '';

  for (var i = 1; i <= totalPages; i++) {
    var pageLink = document.createElement('a');
    pageLink.href = '#';
    pageLink.classList.add('page-link');
    pageLink.textContent = i;

    if (i === currentPage) {
      pageLink.classList.add('active');
    }

    pageLink.addEventListener('click', function() {
      currentPage = parseInt(this.textContent);
      populateBookList(books);
    });

    paginationContainer.appendChild(pageLink);
  }
}
