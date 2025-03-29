import { prisma } from "@/utils/prisma";
import slugify from "slugify";
async function main() {
  // none
}

main()
  .catch((e) => {
    console.error("Seeding failed", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
