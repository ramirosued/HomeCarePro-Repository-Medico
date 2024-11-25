'use client'
import { useRouter, useParams } from "next/navigation";

export default function Codigo() {

    const router = useRouter(); 
    const params = useParams();

    const handleSubmit = async (e) => {
        e.preventDefault()

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
            router.push(`/Medico/${params.medicoId}/devolucion/`)

        } else {
            console.error('Error en la solicitud:', response.statusText);
        }
    };
    return (
        <div>
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
        </div>
    );
}
