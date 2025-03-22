import Image from "next/image";
import Link from "next/link";
export const AsideRightHome = () => {
  return (
    <aside className="mr-8 p-4 h-[80vh] w-[20vw] border-2 rounded-md flex flex-col justify-between">
      <section>
        <h2 className="mb-2">New Topics: </h2>
        <ul className="space-y-4">
          {/* Hot topics area. Must only have 5 in the aside bar.
            there should be a **view more** button that will redirect a user to the /topics route. */}
          <li className="hover:text-blue-500 cursor-pointer flex items-center gap-2">
            <Image
              alt="profile"
              height={40}
              width={40}
              className="rounded-full object-cover"
              src="/rawprofile.svg"
            />
            <div>
              <span className="font-semibold">John Doe</span>
              <p className="text-sm">How to learn React?</p>
            </div>
          </li>
          <li className="hover:text-blue-500 cursor-pointer flex items-center gap-2">
            <Image
              alt="profile"
              height={40}
              width={40}
              className="rounded-full object-cover"
              src="/rawprofile.svg"
            />
            <div>
              <span className="font-semibold">Jane Smith</span>
              <p className="text-sm">Best practices for TypeScript</p>
            </div>
          </li>
          <li className="hover:text-blue-500 cursor-pointer flex items-center gap-2">
            <Image
              alt="profile"
              height={40}
              width={40}
              className="rounded-full object-cover"
              src="/rawprofile.svg"
            />
            <div>
              <span className="font-semibold">Alex Lee</span>
              <p className="text-sm">
                Deploying Next.js to Vercel asda sda dsad sada{" "}
              </p>
            </div>
          </li>
          <Link href="/home/topics" className="underline">
            &#8226; View More Topics
          </Link>
        </ul>
      </section>
      <footer className="mt-4 text-center text-sm text-gray-500">
        <Link href={"/home/rules"} className="hover:underline">
          DevHub Dos and Dont's
        </Link>
        <p className="hover:underline">
          {" "}
          &copy; DevHub 2025 All Rights Reserved.
        </p>
      </footer>
    </aside>
  );
};
