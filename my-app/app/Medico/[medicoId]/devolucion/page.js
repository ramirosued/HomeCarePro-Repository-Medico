"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";


export default function Caso() {
  const [medico, setMedico] = useState([]); // Inicializa con null o un objeto vacío
  const params = useParams();

  useEffect(() => {
    async function fetchCaso() {
      try {
        const response = await fetch(`http://localhost:5000/medico/${1}`); // Asegúrate de usar params.casoId si es necesario
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
        <>          
        {medico.map((medico)=>(
            
        <h1>sss</h1>
        ))}
        </>            
      </div>
    </main>
    
  );
}
