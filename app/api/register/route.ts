import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

let errors = 0;

export async function POST(request: Request) {
	const body = await request.json();

	const agents = body.map((agent: string) => ({
		key: agent
	}));

	console.log("body recieved", agents);

	agents.forEach(async (agent: { key: string }) => {
		try {
			const found = await prisma.agent.findUnique({ where: agent });
			if (found) return;
			const createdAgent = await prisma.agent.create({
				data: agent
			});
			console.log("inserted new agent", createdAgent);
		} catch (error) {
			console.log("error", error);
			errors++;
		}
	});

	if (errors) return NextResponse.json({ success: false });
	return NextResponse.json({ success: true });
}