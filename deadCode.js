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
