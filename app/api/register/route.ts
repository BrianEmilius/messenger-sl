import { prisma } from "@/lib/prisma";
import { PrismaClientValidationError } from "@prisma/client/runtime/client";
import { NextResponse } from "next/server";

let errors = 0;

export async function POST(request: Request) {
	const body = await request.json();

	const agents = body.map((agent: string) => ({
		key: agent
	}));

	agents.forEach(async (agent: { key: string }) => {
		try {
			const found = await prisma.agent.findUnique({ where: agent });
			if (found) return;
			const createdAgent = await prisma.agent.create({
				data: agent
			});
		} catch (error) {
			console.log("error", error);
			errors++;
		}
	});

	if (errors) return NextResponse.json({ success: false });
	return NextResponse.json({ success: true });
}