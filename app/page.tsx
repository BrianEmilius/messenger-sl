import AgentListItem from "@/components/ui/agent-list-item";
import { Agent } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";

export default async function Home() {
  const agents = await prisma.agent.findMany();
  return (
    <>
      <h1>Home</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Recorded since</th>
            <th>Key</th>
          </tr>
        </thead>
        <tbody>
          {agents.map((agent: Agent) => <AgentListItem key={agent.id} agent={agent} />)}
        </tbody>
      </table>
    </>
  );
}
