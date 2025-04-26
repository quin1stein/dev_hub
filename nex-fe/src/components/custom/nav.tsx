import Image from "next/image";
import Link from "next/link";

export default function Nav({ position = "static" }: { position?: string }) {
  return (
    <nav
      className={`w-full flex justify-between items-center px-6 py-4 shadow-md ${position}`}
    >
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

      {/* Middle section */}
      <section>
        <ul className="flex space-x-6 font-medium">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/create">Create Post</Link>
          </li>
          <li>
            <Link href="/profile">Profile</Link>
          </li>
        </ul>
      </section>

      {/* Sign in button */}
      <section className="space-x-1">
        <Link
          href="/login"
          className="px-4 py-2 rounded-lg border-2 border-black transition"
        >
          Log In
        </Link>
        <Link
          href="/signup"
          className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition"
        >
          Sign In
        </Link>
      </section>
    </nav>
  );
}
