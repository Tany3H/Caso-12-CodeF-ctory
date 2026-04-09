let usuario = null;
let balance = 0;
let movimientos = [];

// VISTAS
function mostrarRegistro() {
  document.getElementById("login").classList.add("hidden");
  document.getElementById("registro").classList.remove("hidden");
}

function mostrarLogin() {
  document.getElementById("registro").classList.add("hidden");
  document.getElementById("login").classList.remove("hidden");
}

function mostrarDashboard() {
  ocultarTodo();
  document.getElementById("dashboard").classList.remove("hidden");
  actualizarUI();
}

function mostrarIngreso() {
  ocultarTodo();
  document.getElementById("ingreso").classList.remove("hidden");
}

function mostrarGasto() {
  ocultarTodo();
  document.getElementById("gasto").classList.remove("hidden");
}

function ocultarTodo() {
  document.querySelectorAll("section").forEach(sec => sec.classList.add("hidden"));
}

// REGISTRO
function registrar() {
  let correo = document.getElementById("correo").value;

  if (localStorage.getItem(correo)) {
    document.getElementById("registroMsg").innerText = "Correo ya registrado";
    return;
  }

  let user = {
    nombre: document.getElementById("nombre").value,
    password: document.getElementById("password").value
  };

  localStorage.setItem(correo, JSON.stringify(user));
  document.getElementById("registroMsg").innerText = "Registro exitoso";
}

// LOGIN
function login() {
  let correo = document.getElementById("loginCorreo").value;
  let password = document.getElementById("loginPassword").value;

  let user = JSON.parse(localStorage.getItem(correo));

  if (user && user.password === password) {
    usuario = correo;
    mostrarDashboard();
  } else {
    document.getElementById("loginMsg").innerText = "Datos incorrectos";
  }
}

// INGRESO
function guardarIngreso() {
  let monto = parseFloat(document.getElementById("montoIngreso").value);
  let desc = document.getElementById("descIngreso").value;

  balance += monto;
  movimientos.push("Ingreso: $" + monto + " - " + desc);

  document.getElementById("msgIngreso").innerText = "Ingreso guardado";
  mostrarDashboard();
}

// GASTO
function guardarGasto() {
  let monto = parseFloat(document.getElementById("montoGasto").value);
  let desc = document.getElementById("descGasto").value;

  balance -= monto;
  movimientos.push("Gasto: $" + monto + " - " + desc);

  document.getElementById("msgGasto").innerText = "Gasto guardado";
  mostrarDashboard();
}

// UI
function actualizarUI() {
  document.getElementById("balance").innerText = balance;

  let lista = document.getElementById("lista");
  lista.innerHTML = "";

  movimientos.forEach(m => {
    let li = document.createElement("li");
    li.innerText = m;
    lista.appendChild(li);
  });
}
