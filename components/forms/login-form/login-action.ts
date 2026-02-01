"use server";

import { cookies } from "next/headers";

type FormState = {
	success?: boolean;
	errors?: string[];
}

export default async function LoginAction(prevState: any, formData: FormData): Promise<FormState> {
	const password = formData.get("password") as string;

	if (password !== process.env.PASSWORD) {
		return {
			success: false,
			errors: ["Wrong password"]
		}
	}

	const cookieStore = await cookies();

	cookieStore.set("slmauth", Buffer.from(process.env.PASSWORD as string + process.env.APP_SECRET as string).toString("base64"), { maxAge: 3600 });
	return {
		success: true
	}
}