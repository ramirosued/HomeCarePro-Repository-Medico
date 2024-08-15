import styles from "./page.module.css";
import Link from "next/link";


export default function Home() {
  return (
    <div className="paginaInicio">
      <h1 className="titulo">Bienvenido </h1>
      <Link href={`/Medico`}>Iniciar sesion</Link>
    </div>
   
  );
}
