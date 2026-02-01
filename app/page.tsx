import AgentListItem from "@/components/ui/agent-list-item";
import { Agent } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";

export default async function Home() {
  const agents = await prisma.agent.findMany({
    orderBy: {
      createdAt: "desc"
    }
  });
  return (
    <>
      <h1>Home</h1>
      <table className="border-separate border-spacing-4">
        <thead>
          <tr>
            <th></th>
            <th className="text-left">Name</th>
            <th className="text-left">Recorded since</th>
          </tr>
        </thead>
        <tbody>
          {agents.map((agent: Agent) => <AgentListItem key={agent.id} agent={agent} />)}
        </tbody>
      </table>
    </>
  );
}
