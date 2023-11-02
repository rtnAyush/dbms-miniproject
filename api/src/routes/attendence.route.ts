import { Router, Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

import {
	getDistance,
	getMessCategory,
	isMessTime,
} from "../controller/routes.controller";
import prisma from "../utils/prisma";

const routes = Router();

routes.post("/mark", async (req: Request, res: Response) => {
	const { lat, lon } = req.body;
	const userId = parseInt(req.body.userId) as number;
	try {
		if (!lat || !lon) throw new Error("Missing lat or lon");
		if (!userId) throw new Error("Missing userId");
		// if (!isMessTime()) throw new Error("Not Mess Time");


		const dist = getDistance({
			lat1: parseFloat(process.env.MESS_LAT) as number,
			lon1: parseFloat(process.env.MESS_LON) as number,
			lat2: lat,
			lon2: lon,
		});

		if (dist > 1000)
			throw new Error(
				"Not in range of mess, you are away " + dist + " meters"
			);

		const markedTime = await prisma.users.findUnique({
			where: {
				id: userId,
			},
		});

		const isAlreadyMarked = getMessCategory(markedTime?.lastAttendence);

		if (isAlreadyMarked) throw new Error("Already marked");

		const date = new Date();

		const markedTimeUpdate = await prisma.users.update({
			where: { id: userId },
			data: { lastAttendence: date.toISOString() },
		});

		return res.status(200).json({
			error: false,
			msg: "Success",
			dist,
			data: markedTimeUpdate,
		});
	} catch (err: any) {
		console.log(err?.message);
		return res.status(400).json({ error: true, msg: err?.message });
	}
});

export default routes;
