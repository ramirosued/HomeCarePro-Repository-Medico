'use client';
import "./medico.css";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation'; // Si estás usando Next.js
import Link from "next/link";

export default function Medico() {
  const router = useRouter(); // Hook para redirección en Next.js

  const [devolver, setDevolver] = useState("");
  const verificar = async (e) => {
        e.preventDefault(); // Prevenir el comportamiento por defecto del formulario

        const mail = e.target.mail.value; // Obtener el valor del correo electrónico
        const contraseña = e.target.contraseña.value; // Obtener el valor de la contraseña
        console.log(contraseña)
        try {
            const response = await fetch(`http://localhost:5000/medicoo/login?mail=${encodeURIComponent(mail)}`, {
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
                    setDevolver("Mail incorrecto, ingresalo nuevamente")
                } else {
                    // Asumimos que el resultado es una lista con un solo objeto
                    const { Contraseña } = result[0] || {}; // Extraemos la contraseña
                    const { IdPrestador } = result[0] || {}; // Extraemos la contraseña
                    console.log(IdPrestador)

                    console.log(Contraseña)
                    if (Contraseña === contraseña) {
                        console.log("Contraseña correcta");
                        setDevolver("Contraseña correcta")
                        router.push(`/Medico/${IdPrestador}`); // Esto redirige a /Medico/1
                      } else {
                        console.log("Contraseña incorrecta");
                        setDevolver("Contraseña incorrecta, intenta nuevamente")
                    }
                }
            } else {
                console.error('Error en la solicitud:', response.statusText);
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
        }
    };

    return (
        <div className="login-container">
            <h1 className="titulo">Iniciar sesión</h1>
            <form id="loginForm" className="login-form" onSubmit={verificar}>
                <label htmlFor="mail" className="form-label">Correo electrónico:</label>
                <input
                    type="text"
                    id="mail"
                    name="mail"
                    className="form-input"
                    required
                />
                <label htmlFor="contraseña" className="form-label">Contraseña:</label>
                <input
                    type="password"
                    id="contraseña"
                    name="contraseña"
                    className="form-input"
                    required
                />
                <input type="submit" value="Entrar" className="submit-button" />
            </form>
            <Link href={`/Medico/sesion`}>Recuperar contraseña</Link>
            <h5>{devolver}</h5>

        </div>
    );
}
