import Link from "next/link";
import Image from "next/image";

const Hero = () => {
  return (
    <main className="h-[70vh] w-full px-8 flex flex-col-reverse md:flex-row items-center justify-between ">
      {/* left section texts and description */}
      <section className="md:w-1/2 w-full h-[60%] md:h-[80%] flex flex-col justify-center text-white space-y-6 p-8 bg-black/85 rounded-lg md:rounded-md">
        <h3 className="text-lg md:text-xl font-semibold">Welcome to</h3>
        <h1 className="text-4xl md:text-5xl font-bold">DevHub.org</h1>
        <h4 className="text-sm md:text-lg text-gray-300">
          A web application for developers to collaborate and discuss projects.
        </h4>
        <Link
          href="/signup"
          className="transition-all duration-300 w-[8em] h-[3em] flex items-center justify-center rounded-md border border-black hover:bg-black hover:text-white bg-white text-black font-medium"
        >
          Join Us
        </Link>
      </section>

      {/* right section (image) and the top one if screen is smaller */}
      <section className="md:w-1/2 w-full h-[60%] md:h-[80%] flex justify-center items-center mt-6 md:mt-0">
        <Image
          src="/undraw_collab.svg"
          alt="Collaboration Image"
          width={500}
          height={500}
          className="max-w-[90%] md:max-w-full"
        />
      </section>
    </main>
  );
};

export default Hero;
