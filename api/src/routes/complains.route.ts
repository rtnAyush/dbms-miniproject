import { Router, Request, Response } from "express";
import prisma from "../utils/prisma";

const routes = Router();

routes
	.route("/")
	.get(async (req: Request, res: Response) => {
		let filter = {};
		let sortOptions = {};
		const { userId, date, upvote, downvote } = req.body;

		try {
			if (userId) {
				filter["id"] = userId;
			}
			if (date) {
				filter["createdAt"] = date;
			}

			if (upvote && downvote) {
				throw new Error("Application of multiple sorting options.");
			}
			if (upvote) {
				sortOptions["upvote"] = "desc";
			}
			if (downvote) {
				sortOptions["downvote"] = "desc";
			}

			const complains = await prisma.complains.findMany({
				where: filter,
				select: {
					title: true,
					description: true,
				},
				orderBy: sortOptions,
			});

			return res
				.status(200)
				.json({ error: false, msg: "Success", data: complains });
		} catch (err: any) {
			return res.status(400).json({ error: true, msg: err?.message });
		}
	})
	.post(async (req: Request, res: Response) => {
		const { userId, title, desc, session } = req.body;
		const newComplain = await prisma.complains.create({
			data: {
				title: title,
				description: desc,
				session: session,
				authorId: userId,
			},
		});
	})
	.put(async (req: Request, res: Response) => {
		const { vote, userId, complainId } = req.body;

		const voterUpdate = await prisma.voteCalc.create({
			data: {
				voterId: userId,
				complainId: complainId,
				vote: vote,
			},
		});

		let updateVal = {};
		if (vote == "up") {
			const vo = await prisma.complains.findUnique({
				where: {
					id: complainId,
				},
				select: {
					upvote: true,
				},
			});
			updateVal["upvote"] = vo.upvote + 1;
		} else if (vote == "down") {
			const vo = await prisma.complains.findUnique({
				where: {
					id: complainId,
				},
				select: {
					downvote: true,
				},
			});
			updateVal["downvote"] = vo.downvote + 1;
		}

		const voteAdd = await prisma.complains.update({
			where: {
				id: complainId,
			},
			data: updateVal,
		});

		return res
			.status(200)
			.json({ error: false, msg: "Success", data: updateVal });
	})
	.delete(async (req: Request, res: Response) => {
		const { complainId } = req.params;

		const findComplain = await prisma.complains.findUnique({
			where: { id: parseInt(complainId) },
		});

		const updateInDeletedComplain = await prisma.complainsDeleted.create({
			data: {
				createdAt: findComplain.createdAt,
				session: findComplain.session,
				title: findComplain.title,
				description: findComplain.description,
				upvote: findComplain.upvote,
				downvote: findComplain.downvote,
			},
		});

		const deleteFromComplain = await prisma.complains.delete({
			where: { id: parseInt(complainId) },
		});
	});

export default routes;
