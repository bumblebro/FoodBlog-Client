import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";

// const prisma = new PrismaClient().$extends(withAccelerate());
const prisma = new PrismaClient();

export default async function BLOGCOMPLETE() {
  const blogs = await prisma.foodBlogs.findMany({
    select: {
      section: true,
      subsection: true,
      subsubsection: true,
      title: true,
      creationDate: true,
    },

    // cacheStrategy: { ttl: 86400 },
  });
  return blogs;
}
