import { Router, Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

import {
  getDistance,
  getMessCategory,
  isMessTime,
  whichMessCategory,
} from "../controller/routes.controller";
import prisma from "../utils/prisma";

const queue = [];

const routes = Router();

routes.get("/", async (req: Request, res: Response) => {
  try {
    const dailyCount = await prisma.dailyCount.findMany({});

    return res.status(200).json({
      error: false,
      msg: "Success",
      data: dailyCount,
    });
  } catch (err: any) {
    console.log(err?.message);
    return res.status(400).json({ error: true, msg: err?.message });
  }
});

routes.post("/mark", async (req: Request, res: Response) => {
  const { lat, lon } = req.body;
  const userId = parseInt(req.body.userId) as number;
  try {
    if (!lat || !lon) throw new Error("Missing lat or lon");
    if (!userId) throw new Error("Missing userId");
    if (!isMessTime()) throw new Error("Not Mess Time");

    const dist = getDistance({
      lat1: parseFloat(process.env.MESS_LAT) as number,
      lon1: parseFloat(process.env.MESS_LON) as number,
      lat2: lat,
      lon2: lon,
    });

    if (dist > 1000)
      throw new Error("Not in range of mess, you are away " + dist + " meters");

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

    const isAlreadyAdded = await prisma.dailyCount.findFirst({
      where: {
        date: date.toISOString(),
      },
    });

    let updateDailyVal = {};
    let session = whichMessCategory(date);

    if (isAlreadyAdded) {
      updateDailyVal[session] = isAlreadyAdded[session] + 1;
      const updateDailyCount = await prisma.dailyCount.update({
        where: { id: isAlreadyAdded.id },
        data: updateDailyVal,
      });
    } else {
      updateDailyVal[session] = 1;
      const createDailyCount = await prisma.dailyCount.create({
        data: updateDailyVal,
      });
    }

    queue.push({ userId, servingTime: new Date() });

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

routes.get("/queue", async (req: Request, res: Response) => {
  try {
    // Schedule meal serving at a regular interval (e.g., every 3 minutes)
    setInterval(serveMeal, 1 * 60 * 1000);
    res.status(200).json({
      error: false,
      msg: "Success",
      data: queue?.length,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: true, msg: error });
  }
});

const serveMeal = () => {
  if (queue.length === 0) return;
  const servedUser = queue.shift();
  console.log(`Serving user ${servedUser.userId}`);
};
export default routes;
