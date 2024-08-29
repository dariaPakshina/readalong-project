"use strict";

// Delete / add searchbar placeholder (phone)==========================================================

const changePlaceholder = function (mediaQuery) {
  if (mediaQuery.matches) {
    document.querySelector(".search-input").removeAttribute("placeholder");
  } else return;
};
const mediaQuery = window.matchMedia("(max-width: 34em)");
changePlaceholder(mediaQuery);

mediaQuery.addEventListener("change", () => changePlaceholder(mediaQuery));

//-----------------------

const changePlaceholder2 = function (mediaQuery2) {
  if (mediaQuery2.matches) {
    document
      .querySelector(".search-input")
      .setAttribute("placeholder", "Find a book or an author...");
  } else return;
};
const mediaQuery2 = window.matchMedia("(min-width: 34em)");
changePlaceholder2(mediaQuery2);

mediaQuery2.addEventListener("change", () => changePlaceholder2(mediaQuery2));

// Show / hide book comment==========================================================================

// let bookCommentsArr = [...document.querySelectorAll(".book-comment")];
// console.log(bookCommentsArr);
// let stringArr = [];

// const changeComment = function (mediaQuery3) {
//   if (mediaQuery3.matches) {
//     bookCommentsArr.forEach((com) =>
//       stringArr.push(com.innerText.slice(0, 40))
//     );
//     for (let i = 0; i < bookCommentsArr.length; i++) {
//       bookCommentsArr[i].innerHTML = stringArr[i] + "...";
//     }
//   }
// };

//----------------------

// const changeComment2 = function (mediaQuery4) {
//   if (mediaQuery4.matches) {
//     bookComment = initialBookComment;
//   }
// };

// const mediaQuery4 = window.matchMedia("(min-width: 29em)");
// changeComment2(mediaQuery4);

// mediaQuery4.addEventListener("change", () => changeComment2(mediaQuery4));

// Add book========================================================================

const allLinks = document.querySelectorAll("a:link");

allLinks.forEach(function (link) {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const href = link.getAttribute("href");

    // Scroll back to top
    if (href === "#")
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

    // Scroll to other links
    if (href !== "#" && href.startsWith("#")) {
      const sectionEl = document.querySelector(href);
      sectionEl.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// Sticky navigation =============================================

const selectList = document.querySelector(".select-list");

const obs = new IntersectionObserver(
  function (entries) {
    const ent = entries[0];

    if (ent.isIntersecting === false) {
      document.body.classList.add("sticky");
    }

    if (ent.isIntersecting === true) {
      document.body.classList.remove("sticky");
    }
  },
  {
    // In the viewport
    root: null,
    threshold: 0,
    rootMargin: "-1px",
  }
);
obs.observe(selectList);
