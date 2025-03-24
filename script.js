const API_URL = "http://127.0.0.1:5000/reportes";
let editId = null;  // Variable para almacenar el ID del reporte que se está editando

// Cargar reportes
async function cargarReportes() {
    try {
        const response = await fetch(API_URL);
        const reportes = await response.json();
        const table = document.getElementById("reporteTable");
        table.innerHTML = "";
        reportes.forEach(reporte => {
            table.innerHTML += `
                <tr>
                    <td>${reporte.fecha_reporte}</td>
                    <td>${reporte.nombre_alumno}</td>
                    <td>${reporte.grado}</td>
                    <td>${reporte.curso}</td>
                    <td>${reporte.tipo_reporte}</td>
                    <td>${reporte.profesor}</td>
                    <td>${reporte.comentarios}</td>
                    <td>
                        <button onclick="editarReporte(${reporte.id})">Editar</button>
                        <button onclick="eliminarReporte(${reporte.id})">Eliminar</button>
                    </td>
                </tr>`;
        });
    } catch (error) {
        console.error("Error al cargar reportes:", error);
    }
}

// Lógica para agregar un nuevo reporte
document.getElementById("reporteForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    // Si estamos en modo edición, se ignora este evento (la actualización se maneja en el otro botón)
    if (editId) return;

    const data = {
        fecha_reporte: document.getElementById("fecha").value,
        nombre_alumno: document.getElementById("nombre").value,
        grado: document.getElementById("grado").value,
        curso: document.getElementById("curso").value,
        tipo_reporte: document.getElementById("tipo").value,
        profesor: document.getElementById("profesor").value,
        comentarios: document.getElementById("comentarios").value,
    };

    try {
        await fetch(API_URL, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data)
        });

        // Enviar por WhatsApp: se abre la URL de WhatsApp con el mensaje
        const mensaje = `Nuevo reporte de ${data.nombre_alumno}:\nFecha: ${data.fecha_reporte}\nGrado: ${data.grado}\nCurso: ${data.curso}\nTipo: ${data.tipo_reporte}\nProfesor: ${data.profesor}\nComentarios: ${data.comentarios}`;
        window.open(`https://wa.me/?text=${encodeURIComponent(mensaje)}`, "_blank");

        document.getElementById("reporteForm").reset();
        cargarReportes();
    } catch (error) {
        console.error("Error al agregar reporte:", error);
    }
});

// Lógica para guardar cambios en un reporte existente
document.getElementById("guardarCambios").addEventListener("click", async () => {
    if (!editId) return; // Si no hay un ID en edición, no hace nada

    const data = {
        fecha_reporte: document.getElementById("fecha").value,
        nombre_alumno: document.getElementById("nombre").value,
        grado: document.getElementById("grado").value,
        curso: document.getElementById("curso").value,
        tipo_reporte: document.getElementById("tipo").value,
        profesor: document.getElementById("profesor").value,
        comentarios: document.getElementById("comentarios").value,
    };

    try {
        await fetch(`${API_URL}/${editId}`, {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data)
        });

        // Enviar por WhatsApp con los datos actualizados
        const mensaje = `Reporte actualizado de ${data.nombre_alumno}:\nFecha: ${data.fecha_reporte}\nGrado: ${data.grado}\nCurso: ${data.curso}\nTipo: ${data.tipo_reporte}\nProfesor: ${data.profesor}\nComentarios: ${data.comentarios}`;
        window.open(`https://wa.me/?text=${encodeURIComponent(mensaje)}`, "_blank");

        // Resetear formulario y volver al modo "Agregar"
        document.getElementById("reporteForm").reset();
        document.getElementById("guardarCambios").style.display = "none";
        document.querySelector("button[type='submit']").style.display = "inline-block";
        editId = null;
        cargarReportes();
    } catch (error) {
        console.error("Error al actualizar reporte:", error);
    }
});

// Función para editar reporte: carga los datos en el formulario y activa el modo edición
async function editarReporte(id) {
    try {
        // Se llama a la ruta GET para obtener el registro por id
        const response = await fetch(`${API_URL}/${id}`);
        if (!response.ok) {
            console.error("Error al obtener el reporte", response.statusText);
            return;
        }
        const reporte = await response.json();
        console.log("Reporte a editar:", reporte);

        document.getElementById("fecha").value = reporte.fecha_reporte;
        document.getElementById("nombre").value = reporte.nombre_alumno;
        document.getElementById("grado").value = reporte.grado;
        document.getElementById("curso").value = reporte.curso;
        document.getElementById("tipo").value = reporte.tipo_reporte;
        document.getElementById("profesor").value = reporte.profesor;
        document.getElementById("comentarios").value = reporte.comentarios;

        // Mostrar el botón "Guardar Cambios" y ocultar el de "Agregar Reporte"
        document.getElementById("guardarCambios").style.display = "inline-block";
        document.querySelector("button[type='submit']").style.display = "none";

        // Guardar el ID del reporte en edición
        editId = id;
    } catch (error) {
        console.error("Error en editarReporte:", error);
    }
}

// Función para eliminar reporte
async function eliminarReporte(id) {
    try {
        await fetch(`${API_URL}/${id}`, { method: "DELETE" });
        cargarReportes();
    } catch (error) {
        console.error("Error al eliminar reporte:", error);
    }
}

// Función para filtrar reportes por búsqueda
function filtrarReportes() {
    const searchText = document.getElementById("search").value.toLowerCase();
    const rows = document.getElementById("reporteTable").getElementsByTagName("tr");
    Array.from(rows).forEach(row => {
        const nombreAlumno = row.cells[1].textContent.toLowerCase();
        row.style.display = nombreAlumno.includes(searchText) ? "" : "none";
    });
}

cargarReportes();
