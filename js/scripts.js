const nameInput = document.querySelector("#site"), //* site name
  urlInput = document.querySelector("#url"), //* site url
  myForm = document.querySelector("#myForm"), //* todo form
  list = document.querySelector("#tableBody"), //* table body
  addBtn = document.querySelector("#add"), //* add button
  updateBtn = document.querySelector("#update"); //* update button

const renderTodos = () => {
  list.innerHTML = "";
  todos.forEach((todo, index) => {
    const { name, url } = todo;
    const tr = `
          <tr>
                <td>${index + 1}</td>
                <td>${name}</td>
                <td>
                  <a
                    href="${url}"
                    target="_blank"
                    class="btn btn-success"
                    ><i class="fa-solid fa-eye"></i> Visit</a
                  >
                </td>
                <td>
                  <button class="btn btn-danger" onclick="deleteTodo(${index})">
                    <i class="fa-solid fa-trash"></i> Delete
                  </button>
                </td>
              </tr>
          `;
    list.innerHTML += tr;
  });
};

let todos;
if (localStorage.getItem("todos")) {
  todos = JSON.parse(localStorage.getItem("todos"));
  renderTodos();
} else {
  todos = [];
}
let isValidUrl = false;

const saveToLocalStorage = () => {
  localStorage.removeItem("todos");
  localStorage.setItem("todos", JSON.stringify(todos));
};

const clearInputs = () => {
  nameInput.value = "";
  urlInput.value = "";
};
const addTodo = () => {
  if (isValidUrl) {
    const name = nameInput.value;
    const url = urlInput.value;
    const todo = {
      name,
      url,
    };
    todos.push(todo);
    saveToLocalStorage();
    renderTodos();
    clearInputs();
    isValidUrl = false;
    nameInput.focus();
  } else {
    swal.fire({
      icon: "error",
      title: "Oops...",
      text: "URL must be like https://www.example.com",
    });
  }
};

const validateUrl = (url) => {
  const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;
  urlPattern.test(url) ? (isValidUrl = true) : (isValidUrl = false);
  return isValidUrl;
};

const deleteTodo = (index) => {
  todos.splice(index, 1);
  saveToLocalStorage();
  renderTodos();
};

myForm.addEventListener("submit", (e) => {
  e.preventDefault();
  addTodo();
});

urlInput.addEventListener("keyup", (e) => {
  if (validateUrl(urlInput.value)) {
    isValidUrl = true;
    urlInput.classList.remove("is-invalid");
    urlInput.classList.add("is-valid");
  } else {
    isValidUrl = false;
    urlInput.classList.add("is-invalid");
  }
});

nameInput.addEventListener("keyup", (e) => {
  if (nameInput.value.length > 2) {
    nameInput.classList.remove("is-invalid");
    nameInput.classList.add("is-valid");
  } else {
    nameInput.classList.remove("is-valid");
    nameInput.classList.add("is-invalid");
  }
});
