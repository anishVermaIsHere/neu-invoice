import Image from "next/image"
import Link from "next/link"

const Header = () => {
  return (
    <header className='p-2 bg-white'>
      <nav className="flex items-center justify-center">
      <Link href="/" title="home link" className='text-3xl font-bold text-indigo-600'>
      <Image src="/neu-invoice.png" alt="logo" width={180} height={100}/>
      </Link>
      </nav>
    </header>
  )
}

export default Header