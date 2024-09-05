"use strict";
// Fetch & display all books from API ==================================================

let totalBookCounter = 0;
const searchInput = document.querySelector(".search-input");
const btnSearch = document.querySelector(".btn-search");
const booksContainer = document.querySelector(".books");
const sortingList = document.querySelector(".select-list");

const renderBook = function (book) {
  const mediaQuery3 = window.matchMedia("(max-width: 29em)");
  const mediaQuery4 = window.matchMedia("(min-width: 29em)");

  const changeComment = function (book, mediaQuery3, mediaQuery4) {
    if (mediaQuery3.matches) return book.comment.slice(0, 50) + "...";
    if (!mediaQuery3.matches) return book.comment;
    if (mediaQuery4.matches) return book.comment;
    if (!mediaQuery4.matches) return book.comment.slice(0, 50) + "...";
  };

  const booksContainer = document.querySelector(".books");
  const html = `<div class="book">
    <p class="book-name">
      ${book.name} <a href="#form" class="edit-btn">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="edit-icon"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
          />
        </svg>
      </a>
    </p>
    <p class="book-author">by ${book.author}</p>
    <button class="book-genre">${book.genre}</button>
    <p class="book-date">${book.date}</p>
    <p class="book-comment">
      ${changeComment(book, mediaQuery3, mediaQuery4)}
    </p>
    <p class="book-rating">${book.rating}</p>
  </div>`;

  booksContainer.insertAdjacentHTML("afterbegin", html);

  // Find the specific comment element for this book (now captures the specific .book-comment element for the book that is currently being rendered)
  const commentEl = booksContainer.querySelector(".book-comment");

  mediaQuery3.addEventListener("change", () => {
    if (commentEl) {
      commentEl.textContent = changeComment(book, mediaQuery3, mediaQuery4);
    }
  });

  mediaQuery4.addEventListener("change", () => {
    if (commentEl) {
      commentEl.textContent = changeComment(book, mediaQuery3, mediaQuery4);
    }
  });
};

// Filter ==========================================================

const genreSet = new Set();
const authorSet = new Set();
const yearSet = new Set();

let booksData = [];

const renderFilterByGenre = () => {
  genreSet.forEach((g) => {
    const filterByGenre = document.querySelector(".filter-by-genre");
    const html = `
    <div class="filter filter-genre">
      <input type="checkbox" class="filter-btn genre-filter" id="genre-${g}" data-genre="${g}" />
      <label for="genre-${g}">${g}</label>
    </div>`;
    filterByGenre.insertAdjacentHTML("beforeend", html);
  });
};

const renderFilterByAuthor = () => {
  authorSet.forEach((a) => {
    const filterByAuthor = document.querySelector(".filter-by-author");
    const html = `
      <div class="filter filter-author">
        <input type="checkbox" class="filter-btn author-filter" id="author-${a}" data-author="${a}" />
        <label for="author-${a}">${a}</label>
      </div>`;
    filterByAuthor.insertAdjacentHTML("beforeend", html);
  });
};

const renderFilterByYear = () => {
  yearSet.forEach((y) => {
    const filterByYear = document.querySelector(".filter-by-year");
    const html = `
        <div class="filter filter-year">
          <input type="checkbox" class="filter-btn year-filter" id="year-${y}" data-year="${y}" />
          <label for="year-${y}">${y}</label>
        </div>`;
    filterByYear.insertAdjacentHTML("beforeend", html);
  });
};

const filterBooks = () => {
  const selectedGenres = Array.from(
    document.querySelectorAll(".genre-filter:checked")
  ).map((cb) => cb.dataset.genre);
  const selectedAuthors = Array.from(
    document.querySelectorAll(".author-filter:checked")
  ).map((cb) => cb.dataset.author);
  const selectedYears = Array.from(
    document.querySelectorAll(".year-filter:checked")
  ).map((cb) => cb.dataset.year);

  const filteredBooks = booksData.filter((book) => {
    const matchesGenre = selectedGenres.length
      ? selectedGenres.includes(book.genre)
      : true;
    const matchesAuthor = selectedAuthors.length
      ? selectedAuthors.includes(book.author)
      : true;
    const matchesYear = selectedYears.length
      ? selectedYears.includes(book.date.slice(-4))
      : true;

    return matchesGenre && matchesAuthor && matchesYear;
  });
  booksContainer.innerHTML = `<div class="books"></div>`;

  filteredBooks.forEach(renderBook);
};

const setupFilterListeners = () => {
  const filterBtns = document.querySelectorAll(".filter-btn");
  filterBtns.forEach((btn) => {
    btn.addEventListener("change", filterBooks);
  });
};

// -------------------------------
const functionChunk = () => {
  renderFilterByGenre();
  renderFilterByAuthor();
  renderFilterByYear();
};

const getFunction = (link) => {
  fetch(`${link}`, {
    headers: {
      accept: "application/json",
    },
    method: "GET",
    mode: "cors",
    credentials: "include",
  })
    .then((res) => {
      if (!res.ok) throw new Error(`${errorMsg} (${res.status})`);
      return res.json();
    })
    .then((books) => {
      booksData = books;
      books.forEach((book) => {
        genreSet.add(book.genre);
        authorSet.add(book.author);
        yearSet.add(book.date.slice(-4));
      });
      functionChunk();
      setupFilterListeners();
      books.forEach(renderBook);
      searchInput.value = null;

      // counter-------------

      totalBookCounter = books.length;
      document.querySelector(".total-num").textContent = totalBookCounter;

      // editing------------

      const editBtns = document.querySelectorAll(".edit-btn");
      let bookId;

      editBtns.forEach((btn) => {
        btn.addEventListener("click", (e) => {
          e.preventDefault();

          const href = btn.getAttribute("href");
          if (href !== "#" && href.startsWith("#")) {
            const sectionEl = document.querySelector(href);
            sectionEl.scrollIntoView({ behavior: "smooth" });
          }

          document.querySelector(".form-header").textContent = "edit a book:";
          document.querySelector(".submit-form-btn").textContent = "edit";

          books.forEach((book) => {
            if (btn.closest(".book").innerHTML.includes(book.name)) {
              document.getElementById("name").value = book.name;
            }
            if (btn.closest(".book").innerHTML.includes(book.author)) {
              document.getElementById("author").value = book.author;
            }
            if (btn.closest(".book").innerHTML.includes(book.genre)) {
              document.getElementById("genre").value = book.genre;
            }
            if (btn.closest(".book").innerHTML.includes(book.date)) {
              document.getElementById("date").value = book.date;
            }
            if (btn.closest(".book").innerHTML.includes(book.comment)) {
              document.getElementById("comment").value = book.comment;
            }
            if (btn.closest(".book").innerHTML.includes(book.rating)) {
              document.getElementById("rating").value = book.rating;
            }
          });

          if (
            document.querySelector(".form-header").textContent ===
            "edit a book:"
          ) {
            document
              .querySelector(".edit-form-btn")
              .addEventListener("click", function (e) {
                e.preventDefault();

                const formBookData = {
                  name: document.getElementById("name").value,
                  author: document.getElementById("author").value,
                  genre: document.getElementById("genre").value,
                  date: document.getElementById("date").value,
                  comment: document.getElementById("comment").value,
                  rating: document.getElementById("rating").value,
                };

                let bookId;

                books.forEach((book) => {
                  bookId = book.id;
                });

                fetch(`https://9fec009db0d7891f.mokky.dev/traits/${bookId}`, {
                  method: "PATCH",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(formBookData),
                })
                  .then((res) => {
                    if (!res.ok) throw new Error(`(${res.status})`);
                    return res.json();
                  })
                  .then((data) => console.log("EDITED", data))
                  .catch((error) => console.error("Error:", error));
                window.location.reload();
              });
          } else return;
        });
      });

      // Search---------------

      btnSearch.addEventListener("click", (e) => {
        e.preventDefault();
        fetch(
          `https://9fec009db0d7891f.mokky.dev/traits?name=*${searchInput.value}`,
          {
            headers: {
              accept: "application/json",
            },
            method: "GET",
            mode: "cors",
            credentials: "include",
          }
        )
          .then((res) => {
            if (!res.ok) throw new Error(`${errorMsg} (${res.status})`);
            return res.json();
          })
          .then((books) => {
            if (books.length === 0) {
              alert("there is no such book found!");
              window.location.reload();
            }
            booksContainer.innerHTML = `<div class="books"></div>`;
            books.forEach(renderBook);

            searchInput.value = null;
          });
      });

      // Delete---------------

      const htmlDelBtn = `<button class="submit-form-btn btn-delete" type='delete'>delete</button>`;
      document
        .querySelector(".form-btns")
        .insertAdjacentHTML("beforeend", htmlDelBtn);

      const delBtn = document.querySelector(".btn-delete");

      delBtn.addEventListener("click", (e) => {
        e.preventDefault();
        books.forEach((book) => {
          if ((document.getElementById("name").value = book.name))
            bookId = book.id;
        });

        fetch(`https://9fec009db0d7891f.mokky.dev/traits/${bookId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });
        window.location.reload();
      });
    });
};

// ---------------
document.addEventListener(
  "DOMContentLoaded",
  getFunction("https://9fec009db0d7891f.mokky.dev/traits")
);

// Filter show-hide ==========================================

const btnFilter = document.querySelector(".btn-filter");
const sectionAside = document.querySelector(".section-aside");
const sectionFilter = document.querySelector(".section-filter-all");

btnFilter.addEventListener("click", () => {
  sectionAside.classList.toggle("hidden");

  sectionAside.style.paddingLeft = "0";
  sectionAside.style.marginLeft = "0";
  sectionFilter.style.fontSize = "80%";
});
