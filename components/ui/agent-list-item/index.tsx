import { Agent } from "@/lib/generated/prisma/client";
import { parse } from "node-html-parser";
import { CgProfile } from "react-icons/cg";

export default async function AgentListItem({ agent }: { agent: Agent }) {
	const response = await fetch(`https://world.secondlife.com/resident/${agent.key}`, {});
	const body = parse(await response.text());

	const name = (body.getElementsByTagName("title")[0]).innerHTML;

	const date = Intl.DateTimeFormat("da-DK", { dateStyle: "short" }).format(agent.createdAt);

	return (
		<tr>
			<td><a href={`secondlife:///app/agent/${agent.key}/about`}><CgProfile /></a></td>
			<td>{name}</td>
			<td>{date}</td>
		</tr>
	);
}