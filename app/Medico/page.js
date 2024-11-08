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
  useEffect(() => {
    emailjs.init('7ewRQYRYjTKceGRiu');  // Reemplaza '7ewRQYRYjTKceGRiu' con tu propio User ID
  }, []);

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

  const enviarCodigo = async (e) => {
    e.preventDefault(); // Prevenir comportamiento por defecto del formulario

    const emailInput = document.getElementById('emailInput').value;
    console.log(emailInput)
    const btn = document.getElementById('button');
    btn.textContent = 'Enviando...';

    try {
        // Solicitar un código desde el servidor
        const response = await fetch('http://localhost:5000/medicoooo/codigo', { method: 'POST' });
        console.log(response)
        console.log("hola")
        // Verificar si la respuesta no es OK
        if (!response.ok) {
          throw new Error(`Error al obtener el código: ${response.statusText}`);
        }
    
        // Inspeccionar el contenido de la respuesta antes de convertirla a JSON
        const textResponse = await response.text(); // Lee la respuesta como texto
        console.log('Respuesta del servidor:', textResponse); // Muestra la respuesta en consola
    
        try {
          const data = JSON.parse(textResponse); // Intenta convertir el texto en JSON
          const generatedCode = parseInt(data.code, 10);          // Parámetros para el correo (con el código generado)
          const templateParams = {
            reply_to: emailInput,
            message: generatedCode,
          };
    
          // Enviar el correo con EmailJS
          await emailjs.send('service_axtr669', 'template_lzzu62l', templateParams); // Aquí ya se usa la inicialización previa
    
          // Si todo salió bien
          btn.textContent = 'Enviar Código';
          alert('El código ha sido enviado a tu correo.');
        } catch (jsonError) {
          console.error('Error al parsear la respuesta JSON:', jsonError);
          alert('Hubo un error al procesar la respuesta del servidor.');
        }
    
      } catch (error) {
        // Manejo de errores
        btn.textContent = 'Enviar Código';
        console.error('Error al enviar el código:', error);
        alert('Error al enviar el código: ' + error.message);
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

        <form id="emailForm" onSubmit={enviarCodigo}>
          <input
            type="email"
            id="emailInput"
            placeholder="Introduce tu correo"
            required
          />
          <button type="submit" id="button">Enviar Código</button>
        </form>
      </div>
    </div>
  );
}
