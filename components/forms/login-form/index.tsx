"use client";

import { useActionState, useEffect } from "react";
import LoginAction from "./login-action";
import { redirect } from "next/navigation";

export default function LoginForm() {
	const [formState, formAction, pending] = useActionState(LoginAction, {});

	useEffect(function () {
		if (formState.success) redirect("/");
	}, [formState]);

	return (
		<form action={formAction}>
			<div>
				<label>
					<span>Password</span>
					<input type="password" name="password" />
				</label>
				{formState.success ? null : <span>{formState.errors?.join(", ")}</span>}
			</div>
			<button type="submit">Log in</button>
		</form>
	);
}