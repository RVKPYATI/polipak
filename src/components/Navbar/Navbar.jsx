import Auth from '../Auth/Auth';
import { Logo } from "../Logo/Logo";

const Navbar = () => {
  return (
    <div className='flex w-full h-12 bg-zinc-800/90 justify-between items-center fixed'>
      <Logo/>
      <div className='text-slate-200'>От каждого по способностям, каждому по труду!</div>
      <Auth/>
    </div>
  )
}

export default Navbar