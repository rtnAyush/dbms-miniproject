import { Router, Request, Response } from "express";
import prisma from "../utils/prisma";

const routes = Router();

routes.get("/", async (req: Request, res: Response) => {
	try {
		const users = await prisma.users.findMany();

		return res
			.status(200)
			.json({ error: false, msg: "Success", data: users });
	} catch (err: any) {
		return res.status(400).json({ error: true, msg: err?.message });
	}
});

routes.post("/create", async (req: Request, res: Response) => {
	const { name, email } = req.body;
	const rollNumber = req.body.rollNumber as string;
	try {
		if (!name) throw new Error("name is Missing");
		if (!rollNumber) throw new Error("rollNumber is Missing");
		if (!email) throw new Error("email is Missing");

		const user = await prisma.users.create({
			data: {
				name: name as string,
				rollNumber: parseInt(rollNumber) as number,
				email: email as string,
			},
		});

		return res
			.status(200)
			.json({ error: false, msg: "Success", data: user });
	} catch (err: any) {
		return res.status(400).json({ error: true, msg: err?.message });
	}
});

export default routes;
