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


			const menuToday = await prisma.Menu.findMany({
				where: { session: session },
			})

			return res.status(200).json({ error: false, msg: "Success", data: menuToday });

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


			const foodExists = await prisma.FoodItem.findUnique({
				select: { id },
				where: { name: name },
			})

			if(foodExists == null)
			{
				const foodId = await prisma.FoodItem.create({
					data: {
						name: name
					},
					select: { id },
				})

				const addMenu = await prisma.Menu.create({
					data: {
						day: day,
						session: session,
						foodId: foodId
					},
				})
			}
			else {
				const addMenu = await prisma.Menu.create({
					data: {
						day: day,
						session: session,
						foodId: foodId
					},
				})
			}

			return res.status(200).json({ error: false, msg: "Success" });
		} catch (err: any) {
			return res.status(400).json({ error: true, msg: err?.message });
		}
	});

export default routes;
