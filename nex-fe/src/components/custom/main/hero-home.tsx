import Image from "next/image";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

export const HeroHome = () => {
  return (
    <main className="flex-grow h-[90vh] p-4">
      <section className="h-full overflow-y-auto space-y-4">
        {/* Example Post */}
        {Array(100)
          .fill(null)
          .map((_, index) => (
            <article
              key={index}
              className="flex items-start p-4 border-2 rounded-lg gap-4"
            >
              <Image
                src="/rawprofile.svg"
                alt="Profile Image"
                width={50}
                height={50}
                className="rounded-full"
              />
              <div className="flex-grow">
                <h2 className="font-semibold">John Doe</h2>
                <p className="text-lg">
                  How to learn React effectively? Post #{index + 1}
                </p>
                <div className="flex items-center justify-start gap-2 mt-2">
                  <FaArrowUp className="cursor-pointer hover:text-green-500" />
                  <span>12</span>
                  <FaArrowDown className="cursor-pointer hover:text-red-500" />
                  <span>14</span>
                </div>
              </div>
            </article>
          ))}
      </section>
    </main>
  );
};
