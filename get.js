const booksContainer = document.querySelector(".books");

const renderBook = function (data) {
  const html = `<div class="book">
            <p class="book-name">
              ${data.name}<button class="edit-btn">
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
              </button>
            </p>
            <p class="book-author">by ${data.author}</p>
            <button class="book-genre">${data.genre}</button>
            <p class="book-date">${data.date}</p>
            <p class="book-comment">
              ${data.comment}
            </p>
          </div>
          <div class="book">`;
  booksContainer.insertAdjacentHTML("afterbegin", html);
};

// GET /traits
const getBookData = function () {
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
      // console.log(res.json());
      return res.json();
    })
    .then((data) => renderBook(data[0]));
};

getBookData();
