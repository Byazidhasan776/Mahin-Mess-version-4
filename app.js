let tapCount = 0;
let isAdmin = false;

const ADMIN_PASSWORD = "MAHINMESSADMIN99";

const messageBox = document.getElementById("admin-message");
const notificationBox = document.getElementById("admin-notification");
const noticeBox = document.getElementById("noticeText");

document.getElementById("welcomeTitle").addEventListener("click", () => {
  tapCount++;
  if (tapCount === 3) {
    const input = prompt("Enter Admin Password:");
    if (input === ADMIN_PASSWORD) {
      isAdmin = true;
      alert("Admin Mode Activated!");
      enableEditing();
    } else {
      alert("Wrong password!");
    }
    tapCount = 0;
  }
});

function enableEditing() {
  messageBox.removeAttribute("readonly");
  const cells = document.querySelectorAll("td[contenteditable='false']");
  cells.forEach(cell => cell.setAttribute("contenteditable", "true"));
  noticeBox.setAttribute("contenteditable", "true");
}

function loadMembers() {
  const table = document.getElementById("member-table");
  for (let i = 1; i <= 14; i++) {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td><input type="file" onchange="previewImage(event, ${i})"><img class="photo" id="img${i}" /></td>
      <td contenteditable="false">Member ${i}</td>
      <td contenteditable="false">0</td>
      <td contenteditable="false">0</td>
      <td contenteditable="false">0</td>
      <td contenteditable="false">0</td>
      <td contenteditable="false">0</td>
      <td contenteditable="false">0</td>
      <td contenteditable="false">01XXXXXXXXX</td>
      <td contenteditable="false">Details</td>
    `;
    table.appendChild(tr);
  }
}

function previewImage(event, index) {
  const reader = new FileReader();
  reader.onload = function () {
    document.getElementById("img" + index).src = reader.result;
    localStorage.setItem("img" + index, reader.result);
  };
  reader.readAsDataURL(event.target.files[0]);
}

document.addEventListener("DOMContentLoaded", () => {
  loadMembers();

  for (let i = 1; i <= 14; i++) {
    const saved = localStorage.getItem("img" + i);
    if (saved) {
      document.getElementById("img" + i).src = saved;
    }
  }

  const msg = localStorage.getItem("admin_msg");
  if (msg) {
    messageBox.value = msg;
    notificationBox.innerText = msg;
  }

  messageBox.addEventListener("input", () => {
    if (isAdmin) {
      localStorage.setItem("admin_msg", messageBox.value);
      notificationBox.innerText = messageBox.value;
    }
  });
});
