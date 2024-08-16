'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; 

export default function App() {
    const [mensaje, setMensaje] = useState(''); 
    const router = useRouter(); 

    const handleSubmit = async (e) => {
        e.preventDefault(); // Previene el comportamiento por defecto del formulario

        const contraseña = e.target.contraseña.value;
        const email = e.target.email.value; 

        try {
            const response = await fetch('http://localhost:5000/medicooo/contrasena', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ contraseña, email }), 
            });

            if (response.ok) {
                const result = await response.json();
                console.log(result);
                const { IdPrestador } = result[0] || {}
                setMensaje('Contraseña cambiada correctamente');
                
                setTimeout(() => {
                    router.push(`/Medico/${IdPrestador || 'default'}`); 
                }, 2000); // 2000 milisegundos = 2 segundos
            } else {
                console.error('Error en la solicitud:', response.statusText);
                setMensaje('Error al cambiar la contraseña'); 
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
            setMensaje('Error al cambiar la contraseña'); 
        }
    };

    return (
        <div>
            <h1>Recuperar Contraseña</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Introduce tu correo electrónico"
                    required
                />
                <input
                    type="text"
                    id="contraseña"
                    name="contraseña"
                    placeholder="Introduce la nueva contraseña"
                    required
                />
                <button type="submit">Cambiar contraseña</button>
            </form>
            {mensaje && <p>{mensaje}</p>} {}
        </div>
    );
}
