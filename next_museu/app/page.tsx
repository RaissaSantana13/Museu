import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <div className="flex justify-center text-4xl text-[#A020F0]">Dashboard</div>
      <ul>
        <li>
          <Link href="/usuario" className="flex justify-center text-xl hover:text-[#1a73e8]">
            Usuarios
          </Link>
          <Link href="/contato" className="flex justify-center text-xl hover:text-[#1a73e8]">
            Contatos
          </Link>
        </li>
      </ul>
    </div>
  );
}
