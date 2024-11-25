'use client';
import "./medico.css";
import { useState, useEffect } from "react"; // Agregar useEffect
import { useRouter } from 'next/navigation';
import Link from "next/link";
import emailjs from "emailjs-com";

export default function Medico() {
  const router = useRouter(); // Hook para redirección en Next.js
  const [devolver, setDevolver] = useState("");

  // Inicializar EmailJS con tu userID (coloca tu userID aquí)


  const verificar = async (e) => {
    e.preventDefault(); // Prevenir el comportamiento por defecto del formulario

    const mail = e.target.mail.value; // Obtener el valor del correo electrónico
    const contraseña = e.target.contraseña.value; // Obtener el valor de la contraseña
    console.log(contraseña);

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
          setDevolver("Mail incorrecto, ingresalo nuevamente");
        } else {
          const { Contraseña, IdPrestador } = result[0]; // Extraemos la contraseña e IdPrestador
          console.log(IdPrestador);
          console.log(Contraseña);

          if (Contraseña === contraseña) {
            console.log("Contraseña correcta");
            setDevolver("Contraseña correcta");
            router.push(`/Medico/${IdPrestador}`); // Redirige a la página correspondiente
          } else {
            console.log("Contraseña incorrecta");
            setDevolver("Contraseña incorrecta, intenta nuevamente");
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
    <div className="bodyprincipal">
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
        <h5 className="mensaje">{devolver}</h5>

        
      </div>
    </div>
  );
}
