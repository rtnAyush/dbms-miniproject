import { Router, Request, Response } from "express";
import prisma from "../utils/prisma";

const routes = Router();

routes
	.route("/")
	.get(async (req: Request, res: Response) => {
		const { day, session } = req.query;

		try {
			if (!day) throw new Error("Missing Day");
			if (!session) throw new Error("Missing session");

			// dbms logic for saving into items table or fetching saved ids and then into messMenu table

			return res.status(200).json({ error: false, msg: "Success" });
		} catch (err: any) {
			return res.status(400).json({ error: true, msg: err?.message });
		}
	})
	.post(async (req: Request, res: Response) => {
		const { day, session, name } = req.body;

		try {
			if (!day) throw new Error("Missing Day");
			if (!name) throw new Error("Missing Name");
			if (!session) throw new Error("Missing Session");

			// dbms logic for saving into items table or fetching saved ids and then into messMenu table

			return res.status(200).json({ error: false, msg: "Success" });
		} catch (err: any) {
			return res.status(400).json({ error: true, msg: err?.message });
		}
	});

export default routes;
