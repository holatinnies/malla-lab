const malla = [
  {
    nombre: "1° Semestre",
    ramos: [
      { id: "1", nombre: "Gestión e Investigación en Salud I", prerreq: [] },
      { id: "2", nombre: "Morfología I", prerreq: [] },
      { id: "3", nombre: "Fundamentos Moleculares I", prerreq: [] },
      { id: "4", nombre: "Química", prerreq: [] },
      { id: "5", nombre: "Matemáticas", prerreq: [] },
      { id: "6", nombre: "Introducción a Tecnología Médica", prerreq: [] }
    ]
  },
  {
    nombre: "2° Semestre",
    ramos: [
      { id: "7", nombre: "Gestión e Investigación en Salud II", prerreq: ["1"] },
      { id: "8", nombre: "Morfología II", prerreq: ["2"] },
      { id: "9", nombre: "Fundamentos Moleculares II", prerreq: ["3"] },
      { id: "10", nombre: "Física General", prerreq: [] }
    ]
  },
  {
    nombre: "3° Semestre",
    ramos: [
      { id: "11", nombre: "Gestión e Investigación en Salud III", prerreq: ["7"] },
      { id: "12", nombre: "Electivo Formación General", prerreq: [] },
      { id: "13", nombre: "Fundamentos Biológicos y Modulación Farmacológica", prerreq: ["8", "9"] },
      { id: "14", nombre: "Instrumentación", prerreq: ["10"] }
    ]
  },
  {
    nombre: "4° Semestre",
    ramos: [
      { id: "15", nombre: "Gestión e Investigación en Salud IV", prerreq: ["11"] },
      { id: "16", nombre: "Módulo Genito Urinario", prerreq: [] },
      { id: "17", nombre: "Bioquímica Clínica I", prerreq: ["13"] },
      { id: "18", nombre: "Parasitología I", prerreq: ["13"] },
      { id: "19", nombre: "Inmunología", prerreq: ["9"] }
    ]
  },
  {
    nombre: "5° Semestre",
    ramos: [
      { id: "20", nombre: "Sistema Digestivo", prerreq: [] },
      { id: "21", nombre: "Bioquímica Clínica II", prerreq: ["17"] },
      { id: "22", nombre: "Hematología I", prerreq: ["19"] },
      { id: "23", nombre: "Electivo Formación Profesional", prerreq: [] }
    ]
  },
  {
    nombre: "6° Semestre",
    ramos: [
      { id: "24", nombre: "Sistema Cardiovascular", prerreq: [] },
      { id: "25", nombre: "Investigación I", prerreq: ["15"] },
      { id: "26", nombre: "Bioquímica Clínica III", prerreq: ["21"] },
      { id: "27", nombre: "Hematología II", prerreq: ["22"] }
    ]
  },
  {
    nombre: "7° Semestre",
    ramos: [
      { id: "28", nombre: "Sistema Endocrino y Reproductor", prerreq: [] },
      { id: "29", nombre: "Investigación II", prerreq: ["25"] },
      { id: "30", nombre: "Parasitología II", prerreq: ["18"] },
      { id: "31", nombre: "Microbiología I", prerreq: ["9"] }
    ]
  },
  {
    nombre: "8° Semestre",
    ramos: [
      { id: "32", nombre: "Sistema Inmune", prerreq: [] },
      { id: "33", nombre: "Seminario Gestión o Investigación I", prerreq: ["29"] },
      { id: "34", nombre: "Banco de Sangre I", prerreq: ["27"] },
      { id: "35", nombre: "Microbiología II", prerreq: ["31"] }
    ]
  },
  {
    nombre: "9° Semestre",
    ramos: [
      { id: "36", nombre: "Seminario Gestión o Investigación II", prerreq: ["33"] },
      { id: "37", nombre: "Banco de Sangre II", prerreq: ["34"] },
      { id: "38", nombre: "Módulo Integrado de Enfermedades y Aspectos Legales", prerreq: ["16", "20", "24", "28", "32"] }
    ]
  },
  {
    nombre: "10° Semestre",
    ramos: [
      { id: "39", nombre: "Práctica Profesional Controlada", prerreq: ["36", "37", "38"] }
    ]
  }
];

let completados = JSON.parse(localStorage.getItem("completados") || "[]");

function render() {
  const contenedor = document.getElementById("malla");
  contenedor.innerHTML = "";

  malla.forEach(nivel => {
    const div = document.createElement("div");
    div.className = "semestre";
    div.innerHTML = `<h2>${nivel.nombre}</h2>`;

    nivel.ramos.forEach(ramo => {
      const elem = document.createElement("div");
      elem.className = "ramo";
      elem.textContent = ramo.nombre;

      const habilitado = ramo.prerreq.every(id => completados.includes(id));

      if (completados.includes(ramo.id)) {
        elem.classList.add("completado");
      } else if (!habilitado) {
        elem.classList.add("bloqueado");
      }

      elem.onclick = () => {
        if (!habilitado) return;
        if (completados.includes(ramo.id)) {
          completados = completados.filter(id => id !== ramo.id);
        } else {
          completados.push(ramo.id);
        }
        localStorage.setItem("completados", JSON.stringify(completados));
        render();
      };

      div.appendChild(elem);
    });

    contenedor.appendChild(div);
  });
}

render();
