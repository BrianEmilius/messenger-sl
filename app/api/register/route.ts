import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
	const body = await request.json();
	console.log("Register request recevied");

	const agents = body.map((agent: string) => ({
		key: agent
	}));

	console.log("creating DB entries");

	try {
		const createdAgents = prisma.agent.createMany({
			data: agents
		});

		console.log("Created agents", createdAgents);

		return NextResponse.json({ success: true });
	} catch (error) {
		console.log("error", error);
		return NextResponse.json({ success: false });
	}
}