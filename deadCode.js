// let bookComment = document.querySelector(".book-comment");
// let string = bookComment.innerText;

// const changeComment = function (mediaQuery3) {
//   if (mediaQuery3.matches) {
//     bookComment.innerText = string.slice(0, 50);
//   } else return;
// };

// const cuttingString = function () {
//   let string = bookComment.innerText.slice(0, 20);
//   bookComment = string;
//   return bookComment;
// console.log(string);
// };

// const slicingString = function () {
//   let bookComment2 = [];
//   bookComment.forEach((com) => {
//     com.textContent.substring(0, 20);
//     bookComment2.push(com);
//   });

//   console.log(bookComment2);
//   return bookComment2;
// };

// bookComment.some((el) => el.classList.contains("bigText"))

// const textChecker = function () {
//   if (
//     bookComment.forEach((el) => {
//       el.classList.contains("bigText");
//     })
//   ) {
//     document.querySelector(".body").addEventListener("click", () => {
//       console.log("yea");
//       bookComment.forEach((com) => {
//         com.textContent = "(see comment)";
//       });
//     });
//   } else return;
// };

// const bookComment = [...document.querySelectorAll(".book-comment")];
// const bookSeeComment = [...document.querySelectorAll(".see-comment")];

// const changeComment = function (mediaQuery3) {
//   if (mediaQuery3.matches) {
//     bookComment.forEach((com) => {
//       com.style.display = "none";
//     });
//     bookSeeComment.forEach((com) => {
//       com.style.display = "block";
//       com.addEventListener("click", () => {
//         com.style.display = "none";
//       });
//     });
//     // if (bookSeeComment.some((com) => (com.style.display = "none"))) {
//     //   bookComment.style.display = "block";
//     }

//   bookComment.forEach((com) => {
//     com.textContent = "(see comment)";
//     com.addEventListener("click", () => {
//       com.textContent = `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab quod
//       asperiores assumenda sed nesciunt. Libero temporibus, cum, unde
//       modi, voluptatum quisquam exercitationem officia ad maiores animi
//       illo repudiandae!`;
//       com.style.border = "1px solid #999e7d";
//       com.style.borderRadius = "9px";
//       com.style.padding = "0.6rem";
//       com.style.zIndex = "999";
//       com.classList.add("bigText");
//     });
//   });
//   textChecker();
//   }
// };
// const mediaQuery3 = window.matchMedia("(max-width: 29em)");
// changeComment(mediaQuery3);

// mediaQuery3.addEventListener("change", () => changeComment(mediaQuery3));

// //-----------------------

// const changeComment2 = function (mediaQuery4) {
//   if (mediaQuery4.matches) {
//     document.querySelectorAll(".book-comment").forEach(
//       (com) =>
//         (com.textContent = `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab quod
//               asperiores assumenda sed nesciunt. Libero temporibus, cum, unde
//               modi, voluptatum quisquam exercitationem officia ad maiores animi
//               illo repudiandae!`)
//     );
//   }
// };
// const mediaQuery4 = window.matchMedia("(min-width: 29em)");
// changeComment2(mediaQuery4);

// mediaQuery4.addEventListener("change", () => changeComment2(mediaQuery4));

//-----------------------

// const booksContainer = document.querySelector(".books");

// const renderBook = function (data) {
//   const html = `<div class="book">
//             <p class="book-name">
//               ${data.name}<button class="edit-btn">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke-width="1.5"
//                   stroke="currentColor"
//                   class="edit-icon"
//                 >
//                   <path
//                     stroke-linecap="round"
//                     stroke-linejoin="round"
//                     d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
//                   />
//                 </svg>
//               </button>
//             </p>
//             <p class="book-author">by ${data.author}</p>
//             <button class="book-genre">${data.genre}</button>
//             <p class="book-date">${data.date}</p>
//             <p class="book-comment">
//               ${data.comment}
//             </p>
//           </div>
//           <div class="book">`;
//   booksContainer.insertAdjacentHTML("afterbegin", html);
// };

// const getBookData = function () {
//   fetch("https://9fec009db0d7891f.mokky.dev/traits", {
//     headers: {
//       accept: "application/json",
//     },
//     method: "GET",
//     mode: "cors",
//     credentials: "include",
//   })
//     .then((res) => {
//       if (!res.ok) throw new Error(`${errorMsg} (${res.status})`);
//       // console.log(res.json());
//       return res.json();
//     })
//     .then((data) => renderBook(data[0]));
// };

// getBookData();
