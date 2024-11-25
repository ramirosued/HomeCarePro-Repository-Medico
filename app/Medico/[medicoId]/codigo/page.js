'use client'
import "./codigo.css";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import emailjs from 'emailjs-com';

export default function Codigo() {
    const [codigoIngresado, setCodigoIngresado] = useState(""); 
    const [mensaje, setMensaje] = useState("");
    const [codigo, setCodigo] = useState(""); 
    const [enviando, setEnviando] = useState(false); 
    const router = useRouter(); 
    const params = useParams();

    useEffect(() => {
        localStorage.setItem('Token', null)

        emailjs.init('7ewRQYRYjTKceGRiu');
    }, []); 

    const handleInputChange = (e) => {
        setCodigoIngresado(e.target.value); 
        console.log(codigoIngresado)
    };

    const enviarCodigo = async (e) => {
        e.preventDefault();
        const btn = document.getElementById('button');
        setEnviando(true);
        btn.textContent = 'Enviando...';

        try {
            // Realiza la llamada para obtener los datos del servidor
            const response = await fetch(`http://localhost:5000/medicoooo/codigo/${params.medicoId}`);
            
            if (!response.ok) {
                throw new Error(`Error al obtener el código: ${response.statusText}`);
            }

            const data = await response.json();
            console.log(data);

            // Función para generar un código aleatorio de 6 dígitos
            const generarCodigoAleatorio = () => {
                return Math.floor(100000 + Math.random() * 900000);
            }

            // Generar el código aleatorio
            const generatedCode = generarCodigoAleatorio();
            setCodigo(generatedCode); // Actualiza el estado con el nuevo código generado
            console.log(generatedCode); // Muestra el código generado

            const emailFromServer = data;  // Aquí suponemos que el servidor nos devuelve el correo

            // Parámetros del template de EmailJS
            const templateParams = {
                reply_to: emailFromServer,  // Correo del servidor (asumido)
                message: generatedCode.toString(),  // Enviar el código generado como mensaje
            };

            // Enviar el correo a través de EmailJS
            await emailjs.send('service_axtr669', 'template_lzzu62l', templateParams);

            // Restablecer el estado del botón y mensaje
            btn.textContent = 'Enviar Código';
            setEnviando(false);
            alert('El código ha sido enviado a tu correo.');
        } catch (error) {
            btn.textContent = 'Enviar Código';
            setEnviando(false);
            console.error('Error al enviar el código:', error);
            alert('Error al enviar el código: ' + error.message);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Comparar el código ingresado con el generado
        if (codigoIngresado === codigo.toString()) {
            setTimeout(() => {
                router.push(`/Medico/${params.medicoId}/devolucion/ingresar`);
            }, 2000);
        } else {
            setMensaje("Código incorrecto. Intenta de nuevo.");
        }
    };

    return (
        <div>
            {/* Formulario para enviar el código */}
            <form onSubmit={enviarCodigo}>
                <button className="verificar" id="button" type="submit" disabled={enviando}>
                    {enviando ? 'Enviando...' : 'Enviar código'}
                </button>
            </form>

            {/* Formulario para ingresar y verificar el código */}
            <h1>Ingresa el código</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="codigo">Código:</label>
                <input
                    type="text"
                    id="codigo"
                    value={codigoIngresado}
                    onChange={handleInputChange}
                    required
                />
                <button className="verificar" type="submit">Verificar</button>
            </form>

            {/* Mostrar el mensaje de validación */}
            {mensaje && <p>{mensaje}</p>}
        </div>
    );
}
