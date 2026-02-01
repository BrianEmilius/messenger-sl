import { Agent } from "@/generated/prisma/client";
import { parse } from "node-html-parser";

export default async function AgentListItem({ agent }: { agent: Agent }) {
	const response = await fetch(`https://world.secondlife.com/resident/${agent.key}`, {});
	const body = parse(await response.text());

	const name = (body.getElementsByTagName("title")[0]).innerHTML;

	return (
		<tr>
			<td>{name}</td>
			<td>{new Date(agent.createdAt).toISOString()}</td>
			<td>{agent.key}</td>
		</tr>
	);
}