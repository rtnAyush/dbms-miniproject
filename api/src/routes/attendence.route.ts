import { Router, Request, Response } from "express";
import { getDistance, getMessCategory } from "../controller/routes.controller";
import prisma from "../utils/prisma";
import moment from "moment";


const routes = Router();

routes.post("/mark", async (req: Request, res: Response) => {
	const { lat, lon, userId } = req.body;

	try {
		 if (!lat || !lon) throw new Error("Missing lat or lon");
		 if (!userId) throw new Error("Missing userId");

		const dist = getDistance({
			lat1: 23.810331,
			lon1: 90.412521,
			lat2: lat,
			lon2: lon,
		});
        
    const markedTime = await prisma.Users.findUnique({
    	where: {
    		id: userId,
    	},
    })
    
		const lastMarkedTime = moment(markedTime).format("HH:mm:ss");


		const isAlreadyMarked = getMessCategory(lastMarkedTime);

		if (isAlreadyMarked) throw new Error("Already marked");


		const date = new Date()
		
		const markedTimeUpdate = await prisma.Users.update({
			where: { id: userId },
			data: { lastAttendence: date.now() },
		})	

		return res
			.status(200)
			.json({ error: false, msg: "Hello World! test", dist });
	} catch (err: any) {
		return res.status(400).json({ error: true, msg: err?.message });
	}
});

export default routes;
