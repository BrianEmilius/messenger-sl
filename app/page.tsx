import { Agent } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";

export default async function Home() {
  const agents = await prisma.agent.findMany();
  return (
    <>
      <h1>Home</h1>
      {agents.map((agent: Agent) => <p key={agent.id}>{agent.key}</p>)}
    </>
  );
}
