import Link from "next/link";
import { FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa";
import { format } from "date-fns";
export default function Footer() {
  return (
    <footer className="translate-y-7 w-full bg-black text-white m-0 py-6 px-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        
        {/*left section*/}
        <div className="text-center md:text-left">
          <h3 className="text-xl font-bold">DevHub.org</h3>
          <p className="text-sm text-gray-400">Connecting Developers, Building the Future.</p>
        </div>

        {/* navigation */}
        <nav className="my-4 md:my-0">
          <ul className="flex space-x-6">
            <li><Link href="/" className="hover:text-gray-400">Home</Link></li>
            <li><Link href="/projects" className="hover:text-gray-400">Projects</Link></li>
            <li><Link href="/about" className="hover:text-gray-400">About</Link></li>
            <li><Link href="/contact" className="hover:text-gray-400">Contact</Link></li>
          </ul>
        </nav>

        {/* socmed links */}
        <div className="flex space-x-4">
          <Link href="https://github.com/quin1stein"><FaGithub className="w-6 h-6 hover:text-gray-400" /></Link>
          <Link href="https://twitter.com/your-profile"><FaTwitter className="w-6 h-6 hover:text-gray-400" /></Link>
          <Link href="https://linkedin.com/in/your-profile"><FaLinkedin className="w-6 h-6 hover:text-gray-400" /></Link>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-sm text-gray-500 mt-4">
        © {format(new Date(), "yyyy")} DevHub.org - All Rights Reserved.
      </div>
    </footer>
  );
}
