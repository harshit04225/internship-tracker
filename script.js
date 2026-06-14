let data = JSON.parse(localStorage.getItem("internships")) || [];
let currentFilter = "All";

function addInternship() {
  let company = document.getElementById("company").value;
  let role = document.getElementById("role").value;
  let status = document.getElementById("status").value;

  if (!company || !role) {
    alert("Please fill all fields");
    return;
  }

  data.push({
    id: Date.now(),
    company,
    role,
    status
  });

  save();
  render();
}

function deleteItem(id) {
  data = data.filter(item => item.id !== id);
  save();
  render();
}

function filterData(status) {
  currentFilter = status;
  render();
}

function clearAll() {
  data = [];
  localStorage.removeItem("internships");
  render();
}

function save() {
  localStorage.setItem("internships", JSON.stringify(data));
}

function render() {
  let list = document.getElementById("list");
  list.innerHTML = "";

  let filtered = currentFilter === "All"
    ? data
    : data.filter(i => i.status === currentFilter);

  filtered.forEach(item => {
    list.innerHTML += `
      <div class="item">
        <div>
          <h3>${item.company}</h3>
          <p>${item.role}</p>
          <span class="status ${item.status}">${item.status}</span>
        </div>

        <button class="delete" onclick="deleteItem(${item.id})">Delete</button>
      </div>
    `;
  });

  document.getElementById("total").innerText = data.length;
  document.getElementById("applied").innerText = data.filter(i => i.status === "Applied").length;
  document.getElementById("interview").innerText = data.filter(i => i.status === "Interview").length;
  document.getElementById("selected").innerText = data.filter(i => i.status === "Selected").length;
}

render();