import { prisma } from "@/utils/prisma";
import slugify from "slugify";
async function main() {
  console.log("Seeding data..");

  //   deletes the user and creates it again to evade prisma errors in the console.
  const refreshPost = await prisma.post.deleteMany({});
  const refreshUser = await prisma.user.deleteMany({});
  const refreshFocusAr = await prisma.focusArea.deleteMany({});
  // const createUser = await prisma.user.create({
  //   data: {
  //     profileSlug: `${slugged}-${Date.now().toString(36)}`,
  //     name: "KINOOOO",
  //     email: "sepriothofficial@gmail.com",
  //     id: "607be3b1-1edb-455f-bf02-5cdaf51fe1ec",
  //   },
  // });
  console.log("User created.");
  // const createUsers = await prisma.user.createMany({
  //   data: [
  //     { name: "Waffen Ampatua", email: "waffen@gmail.com", id: "1" },
  //     { name: "Sam Mugar", email: "sam@gmail.com", id: "2" },
  //     { name: "Alquin Suedad", email: "quin@gmail.com", id: "3" },
  //   ],
  // });
  // console.log("New users added!");

  // const createFocusAr = await prisma.focusArea.createMany({
  //   data: [
  //     { name: "AI", label: "Artificial Intelligence" },
  //     { name: "Web Development", label: "Web Development" },
  //   ],
  // });
  // console.log("Focus Areas created!");

  // const posts = [
  //   {
  //     title: "How to learn React effectively?",
  //     content: "Sample content",
  //     slug: "how-to-learn-react-effectively",
  //     userId: "1",
  //     focusAreas: [{ name: "Web Development" }, { name: "AI" }],
  //   },
  //   {
  //     title: "Understanding Next.js",
  //     content: "Another sample content",
  //     slug: "understanding-next-js",
  //     userId: "2",
  //     focusAreas: [{ name: "Web Development" }],
  //   },
  // ];

  // for (const post of posts) {
  //   await prisma.post.create({
  //     data: {
  //       title: post.title,
  //       content: post.content,
  //       slug: post.slug,
  //       user: { connect: { id: post.userId } },
  //       focusAreas: { connect: post.focusAreas },
  //     },
  //   });
  // }

  // console.log("Created posts");
}

main()
  .catch((e) => {
    console.error("Seeding failed", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
