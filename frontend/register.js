document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM completamente cargado y analizado."); // Mensaje de depuración
    
    const registerForm = document.getElementById('register-form');
    
    // Verificar que el formulario existe
    if (!registerForm) {
        console.error("Formulario no encontrado");
        return;
    }
    
    // Manejar el envío del formulario
    registerForm.addEventListener('submit', async (event) => {
        event.preventDefault();  // Evitar el comportamiento por defecto del formulario

        const cedula = document.getElementById('cedula').value;
        const name = document.getElementById('name').value;
        const lastName = document.getElementById('lastName').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const sedeCarrera = document.getElementById('sede-carrera').value;

        // Verificación de la confirmación de contraseña
        if (password !== confirmPassword) {
            alert("Las contraseñas no coinciden");
            return;
        }

        console.log("Datos a enviar:", {
            cedula,
            name,
            lastName,
            email,
            password,
            sedeCarrera
        });

        try {
            // Cambio la URL a la ruta correcta
            const response = await fetch('http://localhost:5000/api/auth/register', {  // Asegúrate que la URL sea correcta
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    cedula,
                    name,
                    lastName,
                    email,
                    password,
                    sedeCarrera
                })
            });

            const data = await response.json();
            console.log("Respuesta del servidor:", data);  // Mensaje de depuración

            if (response.ok) {
                console.log('Usuario registrado exitosamente');
                window.location.href = 'index.html';  // Redirigir al index.html (página de inicio)
            } else {
                console.error('Error al registrar el usuario:', data.message);
            }
        } catch (error) {
            console.error('Error al registrar el usuario:', error);
            alert('Hubo un problema al conectar con el servidor');
        }
    });
});
