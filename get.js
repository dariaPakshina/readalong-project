"use strict";
// Fetch & display all books from API ==================================================

let totalBookCounter = 0;

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

  // Event listener for mediaQuery3
  mediaQuery3.addEventListener("change", () => {
    if (commentEl) {
      commentEl.textContent = changeComment(book, mediaQuery3, mediaQuery4);
    }
  });

  // Event listener for mediaQuery4
  mediaQuery4.addEventListener("change", () => {
    if (commentEl) {
      commentEl.textContent = changeComment(book, mediaQuery3, mediaQuery4);
    }
  });
};

//-------------------

document.addEventListener("DOMContentLoaded", () => {
  fetch("https://9fec009db0d7891f.mokky.dev/traits", {
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
      books.forEach(renderBook);

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

      // Delete

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
});
