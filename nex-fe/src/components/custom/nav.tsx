import Image from "next/image";
import Link from "next/link";

export default function Nav() {
  return (
    <nav className="flex justify-between items-center px-6 py-4 shadow-md bg-white">
      <section className="flex items-center space-x-3">
        <Image
          src="/brain-cog.png"
          alt="DevHub Logo"
          width={40}
          height={40}
          className="h-10 w-10"
        />
        <h3 className="font-bold text-xl">DevHub</h3>
      </section>

      {/*middle section */}
      <section>
        <ul className="flex space-x-6 font-medium">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/explore">Explore</Link>
          </li>
          <li>
            <Link href="/create">Create Post</Link>
          </li>
          <li>
            <Link href="/messages">Messages</Link>
          </li>
          <li>
            <Link href="/profile">Profile</Link>
          </li>
        </ul>
      </section>

      {/*sign in user*/}
      <section>
        <Link
          href="/auth"
          className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition"
        >
          Sign In
        </Link>
      </section>
    </nav>
  );
}
