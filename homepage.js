const email = localStorage.getItem("email");

if (email) {
  const nameData = document.querySelector(".name-data");
  nameData.innerHTML = `Hello ${email}!`;
}

const data = [
  { name: "John", age: 25, email: "john@example.com" },
  { name: "Jane", age: 30, email: "jane@example.com" },
  { name: "Bob", age: 35, email: "bob@example.com" },
];

const tableBody = document.querySelector("#dataTable tbody");

function showData() {
  const rows = data
    .map(({ name, age, email }, index) => {
      return `
        <tr>
          <td>${name}</td>
          <td>${age}</td>
          <td>${email}</td>
          <td>
            <button class="edit-btn" type="button" data-index="${index}">
              Edit
            </button>
            <button class="delete-btn" type="button" data-index="${index}">
              Delete
            </button>
          </td>
        </tr>
      `;
    })
    .join("");

  tableBody.innerHTML = rows;
}

function addData() {
  const name = document.querySelector("#inputName").value.trim();
  const age = document.querySelector("#inputAge").value.trim();
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
  const newNameAgeEmail = prompt(
    "Enter new name, age, and email separated by commas:",
    `${name},${age},${email}`
  )
    .split(",")
    .map((input) => input.trim());

  if (newNameAgeEmail.some((input) => !input)) {
    alert("Please enter all fields.");
    return;
  }

  data[index] = {
    name: newNameAgeEmail[0],
    age: newNameAgeEmail[1],
    email: newNameAgeEmail[2],
  };
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
    const index = target.dataset.index;
    editData(index);
  } else if (target.classList.contains("delete-btn")) {
    const index = target.dataset.index;
    deleteData(index);
  }
});

window.addEventListener("load", () => {
  showData();
});
