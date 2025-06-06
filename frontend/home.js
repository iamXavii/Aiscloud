document.addEventListener("DOMContentLoaded", async () => {
    const usuario = localStorage.getItem('usuario');
    if (!usuario) return window.location.href = 'index.html';
    document.getElementById("username").textContent = JSON.parse(usuario).name;
    await cargarTesis();
});

async function cargarTesis() {
    try {
        const response = await fetch("http://localhost:5000/api/tesis");
        const tesis = await response.json();
        mostrarTesis(tesis);
    } catch (err) {
        console.error("Error al obtener tesis:", err);
    }
}

function mostrarTesis(lista) {
    const tbody = document.getElementById("contenidoTabla");
    tbody.innerHTML = "";
    lista.forEach(tesis => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${tesis.titulo}</td>
            <td>${tesis.autor}</td>
            <td>${tesis.carrera}</td>
            <td>${tesis.anio}</td>
            <td>${tesis.palabrasClave.join(", ")}</td>
            <td>${tesis.descripcion}</td>
            <td>
                <a href="${tesis.archivo}" target="_blank">Ver</a> |
                <a href="${tesis.archivo}" download>Descargar</a>
            </td>
        `;
        tbody.appendChild(row);
    });
}

async function buscarTesis() {
    const query = document.getElementById("searchInput").value.toLowerCase();
    const facultad = document.getElementById("filterFacultad").value;
    try {
        const response = await fetch("http://localhost:5000/api/tesis");
        let tesis = await response.json();

        if (query) {
            tesis = tesis.filter(t =>
                t.titulo.toLowerCase().includes(query) ||
                t.autor.toLowerCase().includes(query) ||
                t.anio.toString().includes(query) ||
                t.palabrasClave.join(" ").toLowerCase().includes(query)
            );
        }

        if (facultad) {
            tesis = tesis.filter(t => t.carrera === facultad);
        }

        mostrarTesis(tesis);
    } catch (err) {
        console.error("Error al filtrar tesis:", err);
    }
}

function cerrarSesion() {
    localStorage.removeItem('usuario');
    window.location.href = 'index.html';
}