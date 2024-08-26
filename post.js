document.getElementById("form-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const formBookData = {
    name: document.getElementById("name").value,
    author: document.getElementById("author").value,
    genre: document.getElementById("genre").value,
    date: document.getElementById("date").value,
    comment: document.getElementById("comment").value,
  };

  fetch("https://9fec009db0d7891f.mokky.dev/traits", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formBookData),
  })
    .then((res) => {
      if (!res.ok) throw new Error(`${errorMsg} (${res.status})`);
      return res.json();
    })
    .then((data) => console.log("SUCCESS", data))
    .catch((error) => console.error("Error:", error));
});
