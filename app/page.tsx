import { prisma } from "@/lib/prisma";

export default async function Home() {
  const agents = await prisma.agent.findMany();
  console.log("agents on home page", agents);
  return (
    <>
      <h1>Home</h1>

    </>
  );
}
