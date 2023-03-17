const email = localStorage.getItem("email");

if (email) {
  const nameData = document.querySelector(".name-data");
  nameData.innerHTML = `Hello ${email}!`;
}

let data = [
  { name: "John", age: 25, email: "john@example.com" },
  { name: "Jane", age: 30, email: "jane@example.com" },
  { name: "Bob", age: 35, email: "bob@example.com" },
];

const tableBody = document.querySelector("#dataTable tbody");

function showData() {
  tableBody.innerHTML = "";
  for (let i = 0; i < data.length; i++) {
    const { name, age, email } = data[i];
    const row = `
      <tr>
        <td>${name}</td>
        <td>${age}</td>
        <td>${email}</td>
        <td>
          <button class="edit-btn" type="button" data-index="${i}">
            Edit
          </button>
          <button class="delete-btn" type="button" data-index="${i}">
            Delete
          </button>
        </td>
      </tr>
    `;
    tableBody.insertAdjacentHTML("beforeend", row);
  }
}

function addData() {
  const name = document.querySelector("#inputName").value.trim();
  const age = parseInt(document.querySelector("#inputAge").value.trim());
  const email = document.querySelector("#inputEmail").value.trim();

  if (!name || !age || !email) {
    alert("Please enter all fields.");
    return;
  }

  data.push({ name, age, email });
  showData();
}

function editData(index) {
  const { name, age, email } = data[index];
  const newName = prompt("Enter new name:", name);
  if (newName === null) {
    return;
  }
  const newAge = parseInt(prompt("Enter new age:", age));
  if (isNaN(newAge)) {
    return;
  }
  const newEmail = prompt("Enter new email:", email);
  if (newEmail === null) {
    return;
  }

  data[index] = { name: newName, age: newAge, email: newEmail };
  showData();
}

function deleteData(index) {
  if (confirm("Are you sure you want to delete this data?")) {
    data.splice(index, 1);
    showData();
  }
}

tableBody.addEventListener("click", (event) => {
  const target = event.target;

  if (target.classList.contains("edit-btn")) {
    const index = parseInt(target.dataset.index);
    editData(index);
  } else if (target.classList.contains("delete-btn")) {
    const index = parseInt(target.dataset.index);
    deleteData(index);
  }
});

window.addEventListener("load", () => {
  showData();
});
