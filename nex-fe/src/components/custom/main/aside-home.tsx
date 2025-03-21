"use client";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { RiCommunityFill } from "react-icons/ri";
import { MdTopic } from "react-icons/md";

type searchTitle = {
  title: string;
};
export default function AsideHome() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<searchTitle>();
  const searchTitle = async () => {};
  return (
    <aside className="overflow-y-auto no-scrollbar p-4 h-[90vh] w-1/6 border-r-2 border-black/20">
      <form onSubmit={handleSubmit(searchTitle)}>
        <label htmlFor="titleSearch">Search for a post: </label>
        <input
          placeholder="Search"
          className="h-[2.6em] rounded-md border-black/20 focus:border-black border-2"
          type="text"
          {...register("title")}
        />
      </form>

      {/* communities */}
      <br />
      <hr />
      <h2 className="mt-2">COMMUNITIES: </h2>
      <section className="space-y-4 w-full min-h-[5px] border-2 rounded-lg p-1">
        <Communities name="Aish" />
        <Communities name="EYY" />
        <Communities name="Coders United" />
      </section>

      {/* lower section with navigations */}
      <section className="flex flex-col items-center justify-between mt-2">
        <article className="w-full h-[3.5em] space-x-2 flex items-center border-b border-gray-300">
          <RiCommunityFill aria-label="Communities Icon" />
          <Link href="/home/communities" className="hover:text-blue-500">
            Communities
          </Link>
        </article>
        <article className="flex items-center w-full space-x-2 h-[3.5em] border-b border-gray-300">
          <MdTopic aria-label="Topics Icon" />
          <Link href="/home/topics" className="hover:text-blue-500">
            Topics
          </Link>
        </article>
      </section>
    </aside>
  );
}

function Communities({ name }: { name?: string }) {
  return (
    <>
      <article className="cursor-pointer transition-all duration-300 hover:bg-black/50 hover:text-white py-1 rounded-md h-[3.5em] w-full flex justify-start items-center gap-2">
        <Image
          className="h-full w-[4em] object-cover"
          src="/rawprofile.svg"
          alt="Profile Image"
          width={90}
          height={90}
        />
        <h2 className="truncate">{name ? name : "Undefined Name"}</h2>
      </article>
    </>
  );
}
