"use client";
import { useParams,useRouter  } from "next/navigation";
import { useState, useEffect } from "react";

export default function Devolucion() {
    const params = useParams();
    const router = useRouter(); // Importa useRouter para la redirección

    const [devoluciones, setDevoluciones] = useState([]);
    console.log(params);

    useEffect(() => {
        async function fetchDevoluciones() {
            try {
                const response = await fetch(`http://localhost:5000/casos/${params.medicoId}/devolucion`);
                if (!response.ok) {
                    throw new Error("Error al obtener los datos");
                }
                const data = await response.json();
                setDevoluciones(data);
            } catch (error) {
                console.error("Error al obtener los casos:", error);
            }
        }
        fetchDevoluciones();
    }, [params.medicoId]);

    const handleSubmit = async (e) => {
    
        const descripcion = e.target.descripcion.value; // Obtener el valor de la descripción
    
        const response = await fetch(`http://localhost:5000/medico/${params.medicoId}/devolucionn`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ descripcion }) // Enviar la descripción en el cuerpo de la solicitud
        });
    
        if (response.ok) {
            const result = await response.json();
            console.log(result);
        } else {
            console.error('Error en la solicitud:', response.statusText);
        }
    };
    

    return (
        <>
            <h1>Devoluciones anteriores</h1>
            <table>
                <thead>
                    <tr>
                        <th>Devolución</th>
                        <th>Fecha</th>
                    </tr>
                </thead>
                <tbody>
                    {devoluciones.map((devolucion) => (
                        <tr key={devolucion.id}>
                            <td>{devolucion.Descripcion}</td>
                            <td>{devolucion.Fecha}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <form id="devolucionForm" onSubmit={handleSubmit}>
                <label htmlFor="descripcion">Descripción:</label>
                <input
                    type="text"
                    id="descripcion"
                    name="descripcion"
                    required
                />
                <input type="submit" value="Agregar Devolución" />
            </form>
        </>
    );
}
