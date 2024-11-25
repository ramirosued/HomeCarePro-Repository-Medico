"use client";
import "./devolucion.css";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function Devolucion() {
    const params = useParams();
    const router = useRouter(); // Importa useRouter para la redirección
    const [devoluciones, setDevoluciones] = useState([]);
    const [situacion, setSituacion] = useState(null); // Estado para guardar la situación actual

    console.log(params);

    useEffect(() => {
        async function fetchDevoluciones() {
            try {
                const response = await fetch(`http://localhost:5000/casos/${params.medicoId}/devolucion`);
                if (!response.ok) {
                    throw new Error("Error al obtener los datos");
                }
                const data = await response.json();
                console.log(data);

                setDevoluciones(data);

                // Suponiendo que la respuesta tiene una propiedad 'IdSituacion'
                if (data.length > 0) {
                    setSituacion(data[0].IdSituacion); // Guardar la primera situación
                }
            } catch (error) {
                console.error("Error al obtener los casos:", error);
            }
        }
        fetchDevoluciones();
    }, [params.medicoId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        router.push(`/Medico/${params.medicoId}/codigo`);
    };

    const volver = async (idPrestador) => {
        router.push(`/Medico/${idPrestador}`);
    };

    return (
        <div className="devolucion-container">
            <h1 className="devolucion-title">Devoluciones anteriores</h1>
            <table className="devolucion-table">
                <thead>
                    <tr>
                        <th className="devolucion-table-header">Devolución</th>
                        <th className="devolucion-table-header">Fecha</th>
                    </tr>
                </thead>
                <tbody>
                    {devoluciones.map((devolucion) => {
                        // Crear un objeto Date con la fecha
                        const fecha = new Date(devolucion.Fecha);

                        // Obtener el día, mes y año
                        const dia = fecha.getDate(); // Obtener el día del mes
                        const mes = fecha.getMonth() + 1; // Obtener el mes (sumar 1 porque enero es 0)
                        const año = fecha.getFullYear(); // Obtener el año completo

                        // Formatear la fecha: Día/Mes/Año
                        const fechaFormateada = `${dia}/${mes}/${año}`;

                        return (
                            <tr key={devolucion.id}>
                                <td className="devolucion-description">{devolucion.Descripcion}</td>
                                <td className="devolucion-date">{fechaFormateada}</td> {/* Mostrar la fecha en formato día/mes/año */}
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            {/* Verificar la situación y mostrar el formulario adecuado */}
            {situacion === 2 ? (
                <form className="devolucion-form" id="devolucionForm" onSubmit={handleSubmit}>
                    <input className="devolucion-submit" type="submit" value="Agregar Devolución" />
                </form>
            ) : situacion === 1 ? (
                <>
                    <form className="devolucion-form">
                        <input
                            className="devolucion-submit"
                            type="submit"
                            value="Agregar Devolución"
                            disabled={true} // Deshabilitar el botón
                        />
                    </form>
                    <p className="devolucion-status">Caso cerrado</p>
                </>
            ) : (
                <>
                    <form className="devolucion-form">
                        <input
                            className="devolucion-submit"
                            type="submit"
                            value="Agregar Devolución"
                            disabled={true} // Deshabilitar el botón
                        />
                    </form>
                    <p className="devolucion-status">Caso solicitado para el cierre</p>
                </>
            )}
            <button onClick={() => volver(devoluciones[0]?.IdPrestador)} className="devolucion-back-button">
                Volver
            </button>
        </div>
    );
}
