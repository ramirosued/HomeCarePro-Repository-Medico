'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; 
import "./sesion.css";

export default function App() {
    const [mensaje, setMensaje] = useState(''); 
    const router = useRouter(); 

    const handleSubmit = async (e) => {
        e.preventDefault(); // Previene el comportamiento por defecto del formulario

        const contraseña = e.target.contraseña.value;
        const email = e.target.email.value; 

        try {
            // Verifica si el correo electrónico es válido
            const response = await fetch(`http://localhost:5000/medicoo/login?mail=${encodeURIComponent(email)}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const result = await response.json();
                console.log("Resultado del servidor:", result);

                if (result.length === 0) {
                    console.log("No se encontraron resultados.");
                    setMensaje("Mail incorrecto, ingrésalo nuevamente");
                } else {
                    // Si el correo es válido, intenta cambiar la contraseña
                    const updateResponse = await fetch('http://localhost:5000/medicooo/contrasena', {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ contraseña, email }), 
                    });

                    if (updateResponse.ok) {
                        const updateResult = await updateResponse.json();
                        console.log(updateResult);
                        const { IdPrestador } = updateResult[0] || {};
                        setMensaje('Contraseña cambiada correctamente');
                        
                        setTimeout(() => {
                            router.push(`/Medico/${IdPrestador || 'default'}`); 
                        }, 2000); // 2000 milisegundos = 2 segundos
                    } else {
                        console.error('Error en la solicitud:', updateResponse.statusText);
                        setMensaje('Error al cambiar la contraseña'); 
                    }
                }
            } else {
                console.error('Error en la solicitud de validación:', response.statusText);
                setMensaje('Error al verificar el correo electrónico');
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
            setMensaje('Error al cambiar la contraseña'); 
        }
    };

    return (
        <div className='bodyRecuperar'>
        <div className='divRecuperar'>
            <h1 className='titulo'>Recuperar Contraseña</h1>
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
            {mensaje && <p className='mensaje'>{mensaje}</p>}
        </div>
        </div>
    );
}
