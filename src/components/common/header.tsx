import AppConfig from "@/config/app.config"
import Link from "next/link"

const Header = () => {
  return (
    <header className='p-1 bg-indigo-600'>
      <nav className="flex items-center justify-center">
      <Link href="/" title="home link" className='text-3xl text-white'>{AppConfig.appName} Invoice</Link>
      </nav>
    </header>
  )
}

export default Header