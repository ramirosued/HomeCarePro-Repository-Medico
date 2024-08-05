"use client";
import { useParams } from "next/navigation";
import { useState,useEffect } from "react";

export default function Devolucion(){
    const params = useParams();
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
    }, []);
    
return(
    <>
    <h1>Devoluciones anteriores</h1>
    <ul>
    {devoluciones.map((devolucion)=>(
    <li> {devolucion.Descripcion} / {devolucion.Fecha}</li>

    )
    )}
    </ul>
    <form id="devolucionForm" >
                <label >Descripción:</label>
                <input
                    type="text"
                    id="descripcion"
                    name="descripcion"
                    required
                />
                
                <input type="submit" value="Agregar Devolución" />
    </form>
    </>
)
}