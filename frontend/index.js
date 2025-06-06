document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM completamente cargado y analizado."); // Mensaje de depuración

    const loginForm = document.getElementById('loginForm');
    if (!loginForm) {
        console.error("Formulario de login no encontrado.");
        return;
    }

    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        console.log("Email:", email);
        console.log("Contraseña:", password);

        if (!email || !password) {
            alert('Por favor, ingresa ambos campos: correo y contraseña.');
            return;
        }

        try {
            // ✅ CORREGIDO: URL correcta del endpoint de login
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                // ✅ CORREGIDO: usa 'email' en lugar de 'username'
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            console.log("Respuesta del servidor:", data);

            if (response.ok && data.message === 'Login exitoso') {
                // Puedes almacenar el usuario en localStorage si quieres usarlo en home
                localStorage.setItem('usuario', JSON.stringify(data.user));
                window.location.href = '/home.html';
            } else {
                alert('Login fallido, por favor verifica tus credenciales.');
            }
        } catch (error) {
            console.error('Error al enviar la solicitud de login:', error);
            alert('Hubo un problema al intentar iniciar sesión. Intenta nuevamente.');
        }
    });
});
