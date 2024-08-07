"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import styles from './medico.module.css'; // Asegúrate de importar el CSS Module


export default function Caso() {
  const [medico, setMedico] = useState([]); // Inicializa con null o un objeto vacío
  const params = useParams();

  useEffect(() => {
    async function fetchCaso() {
      try {
        const response = await fetch(`http://localhost:5000/medico/${2}`); // Asegúrate de usar params.casoId si es necesario
        if (!response.ok) {
          throw new Error("Error al obtener los datos");
        }
        const data = await response.json();
        console.log(data);

        setMedico(data);
      } catch (error) {
        console.error("Error al obtener el caso:", error);
      }
    }
    fetchCaso();
  }, []); 

  return (
    <main>
      <div>
        <h1>Bienvenido {medico.NombrePrestador}</h1>
            
        <>          
        {medico.map((medico)=>(
            <div key={medico.IdPaciente} className={styles.listaCasosActivos}>
                <h5>DNI Paciente: {medico.Dni}</h5>
                <h5>Nombre Paciente: {medico.Nombre}</h5>
                <h5>Apellido Paciente: {medico.Apellido}</h5>
                <h5>Direccion Paciente: {medico.Direccion}</h5>
                <h5>Localidad Paciente: {medico.Localidad}</h5>
                <h5>Telefono Paciente: {medico.Telefono}</h5>
                <h5>Fecha Nacimiento Paciente: {medico.FechaNacimiento}</h5>
                <h5>Diagnostico Paciente: {medico.Diagnostico}</h5>
                <h5>Cantidad de dias del caso: {medico.CantDias}</h5>
                <h5>Cantidad de horas por dia del caso: {medico.CantHorasDias}</h5>
                <Link href={`/Medico/${medico.IdCaso}/devolucion/`}>Dar Devolucion</Link>

            </div>
        ))}
        </>            
      </div>
    </main>
    
  );
}
