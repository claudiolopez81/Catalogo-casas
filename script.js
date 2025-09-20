let propiedades = [];

fetch("departamento.json")
  .then((response) => response.json())
  .then((data) => {
    propiedades = data;

    if (document.getElementById("lista-apartamentos")) {
      mostrarLista();
    }

    if (document.getElementById("detalle")) {
      mostrarDetalle();
    }
  })
  .catch((error) => {
    console.error("Error al cargar los datos:", error);
    if (document.getElementById("lista-apartamentos")) {
      document.getElementById("lista-apartamentos").innerHTML =
        "<p>Error cargando propiedades.</p>";
    }
  });

function mostrarLista() {
  const contenedor = document.getElementById("lista-apartamentos");
  contenedor.innerHTML = "";

  propiedades.forEach((prop) => {
    const div = document.createElement("div");
    div.className = "apartamento";
    div.innerHTML = `
      <img src="${prop.imagen}" alt="${prop.nombre}">
      <h3>${prop.nombre} - ${prop.ciudad}</h3>
      <p><strong>$${prop.precio_actual.toLocaleString("es-CO")}</strong></p>
      <p>${prop.area}, ${prop.habitaciones} hab, ${prop.baños} baños</p>
    `;
    div.onclick = () => {
      localStorage.setItem("propiedadID", prop.id);
      window.location.href = "detalle.html";
    };
    contenedor.appendChild(div);
  });
}

function mostrarDetalle() {
  const id = parseInt(localStorage.getItem("propiedadID"));
  const prop = propiedades.find((p) => p.id === id);
  const contenedor = document.getElementById("detalle");

  if (!prop) {
    contenedor.innerHTML = "<p>Propiedad no encontrada.</p>";
    return;
  }

  contenedor.innerHTML = `
    <img src="${prop.imagen}" alt="${prop.nombre}">
    <h2>${prop.nombre}</h2>
    <h3>${prop.ciudad} - ${prop.categoria}</h3>
    <p><strong>Precio actual:</strong> $${prop.precio_actual.toLocaleString(
      "es-CO"
    )}</p>
    <p><strong>Precio anterior:</strong> <s>$${prop.precio_anterior.toLocaleString(
      "es-CO"
    )}</s></p>
    <p><strong>Área:</strong> ${prop.area}</p>
    <p><strong>Habitaciones:</strong> ${prop.habitaciones}</p>
    <p><strong>Baños:</strong> ${prop.baños}</p>
    <p><strong>Parqueaderos:</strong> ${prop.parqueaderos}</p>
    <a href="index.html">← Volver al listado</a>
  `;
}
