"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useRouter } from 'next/router';
import { useState, useEffect } from "react";
import styles from './medico.module.css'; // Asegúrate de importar el CSS Module

export default function Caso() {
  const [medico, setMedico] = useState([]); // Inicializa con un arreglo vacío
  const [selectedPatientId, setSelectedPatientId] = useState(null); // ID del paciente seleccionado

  const params = useParams();

  useEffect(() => {
    async function fetchCaso() {
      try {
        const response = await fetch(`http://localhost:5000/medicos/${params.medicoId}`); // Asegúrate de usar params.casoId si es necesario
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
  
  const toggleInfo = (id) => {
    setSelectedPatientId(prevId => (prevId === id ? null : id)); // Cambia el estado si el ID es diferente; oculta si es el mismo
  console.log(id)
  };

  const botonCerrarCaso = async(IdCaso) =>{
    console.log(IdCaso)
    const responde= await fetch(`http://localhost:5000/casos/solicitar/${IdCaso}`, {
    method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
          })
          async function fetchCaso() {
            try {
              const response = await fetch(`http://localhost:5000/medicos/${params.medicoId}`); // Asegúrate de usar params.casoId si es necesario
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

  }


  return (
    <main>
      <div>
        <h1 className={styles.titulo}>Casos</h1>
        <div>
          {medico.map((item) => (
            <div key={item.IdPaciente} className={styles.listaCasosActivos}>
                <h5>Nombre Paciente: {item.Nombre}</h5>
              <h5>Apellido Paciente: {item.Apellido}</h5>
              <h5>Direccion Paciente: {item.Direccion}</h5>
              {item.IdSituacion === 2 ? (
                <Link href={`/Medico/${item.IdCaso}/devolucion/`} className={styles.devolucionLink}>
                  Dar Devolución
                </Link>
              ) : (
                <button disabled className={styles.disabledButton}>
                  No se puede dar devolución
                </button>
              )}
              <Link href={`/Medico/${item.IdCaso}/devolucion/`}>Dar Devolución</Link>
              <button onClick={() => toggleInfo(item.IdPaciente)}>Más info</button>
              <button onClick={ () => botonCerrarCaso(item.IdCaso)}  >Solicitar cierre de caso</button> 
              
              {selectedPatientId === item.IdPaciente && (
                <div className={styles.masInfo}>
                  <h5>Localidad Paciente: {item.Localidad}</h5>
                  <h5>Telefono Paciente: {item.Telefono}</h5>
                  <h5>Fecha Nacimiento Paciente: {item.FechaNacimiento}</h5>
                  <h5>Diagnostico Paciente: {item.Diagnostico}</h5>
                  <h5>Cantidad de días del caso: {item.CantDias}</h5>
                  <h5>Cantidad de horas por día del caso: {item.CantHorasDias}</h5>
                </div>
              )}
            </div>
          ))}
        </div>            
      </div>
    </main>
  );
}
