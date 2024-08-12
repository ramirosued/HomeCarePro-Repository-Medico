import styles from "./page.module.css";
import Link from "next/link";


export default function Home() {
  return (
    <div className="paginaInicio">
      <h1 className="titulo">Bienvenido </h1>
      <Link className="linkInicio" href={`/Medico/${1}`}>Ver mis casos activos</Link>
    </div>
   
  );
}
