import { Router, Request, Response } from "express";
import prisma from "../utils/prisma";
import { Sessions } from "@prisma/client";

const routes = Router();

routes
	.route("/")
	.get(async (req: Request, res: Response) => {
		const { day, session } = req.query;

		try {
			if (!day) throw new Error("Missing Day");
			if (!session) throw new Error("Missing session");

			const menuToday = await prisma.menu.findMany({
				where: { session: session as Sessions },
				include: {
					food: true,
				},
			});

			return res
				.status(200)
				.json({ error: false, msg: "Success", data: menuToday });
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

			const foodExists = await prisma.foodItems.findUnique({
				where: { name: name },
				select: { id: true },
			});

			if (foodExists == null) {
				const foodId = await prisma.foodItems.create({
					data: {
						name: name,
					},
					select: { id: true },
				});

				const addMenu = await prisma.menu.create({
					data: {
						day: day,
						session: session,
						foodId: foodId.id,
					},
				});
			} else {
				const addMenu = await prisma.menu.create({
					data: {
						day: day,
						session: session,
						foodId: foodExists.id,
					},
				});
			}

			return res.status(200).json({ error: false, msg: "Success" });
		} catch (err: any) {
			return res.status(400).json({ error: true, msg: err?.message });
		}
	})
	.delete(async (req: Request, res: Response) => {
		const { day, session, name } = req.params;
		try {
			if (!day) throw new Error("Missing Day");
			if (!name) throw new Error("Missing Name");
			if (!session) throw new Error("Missing Session");

			const foodExists = await prisma.foodItems.findUnique({
				where: { name: name },
			});

			if (foodExists.id == null) {
				throw new Error("No record with such name.");
			}

			const addToDeleted = await prisma.foodItemsDeleted.create({
				data: {
					name: foodExists.name,
				},
			});

			const removeFromFoodItems = await prisma.foodItems.delete({
				where: { id: foodExists.id },
			});

			return res
				.status(200)
				.json({ error: false, msg: "Success", data: foodExists });
		} catch (err: any) {
			return res.status(400).json({ error: true, msg: err?.message });
		}
	});

export default routes;
