import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";


export default function Home() {
  return (
    <div>
      <h1>hola</h1>
      <Link href={`/Medico/${1}`}>Casos activos</Link>
    </div>
   
  );
}
