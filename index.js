import Link from 'next/link';
export default function Home(){
  return (
    <div style={{padding:24,fontFamily:'Inter, Arial'}}>
      <h1>Gacor FX — Trading Journal</h1>
      <nav>
        <ul>
          <li><Link href='/journal'>Journal</Link></li>
          <li><Link href='/dashboard'>Dashboard</Link></li>
        </ul>
      </nav>
    </div>
  )
}
