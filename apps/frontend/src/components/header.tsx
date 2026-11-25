import Link from 'next/link';

export default function Header() {
  return (
    <header>
      <Link href={'/'}>Main</Link>
      <Link href={'/login'}>Login</Link>
    </header>
  );
}
