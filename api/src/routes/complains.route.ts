import { Router, Request, Response } from "express";
import prisma from "../utils/prisma";

const routes = Router();

routes
	.route("/")
	.get(async (req: Request, res: Response) => {
		let filter = {};
		let sortOptions = {};
		const { date, upvote, downvote, sort } = req.query;
		let userId = parseInt(req.query.userId1 as string);

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
			if (sort === "upvote") {
				sortOptions["upvote"] = "desc";
			}
			if (sort === "downvote") {
				sortOptions["downvote"] = "desc";
			}
			if (sort === "createdAt") {
				sortOptions["createdAt"] = "desc";
			}

			const complains = await prisma.complains.findMany({
				where: filter,
				orderBy: sortOptions,
				include: {
					author: true,
				},
			});

			return res
				.status(200)
				.json({ error: false, msg: "Success", data: complains });
		} catch (err: any) {
			return res.status(400).json({ error: true, msg: err?.message });
		}
	})
	.post(async (req: Request, res: Response) => {
		const { userId1, title, desc, session } = req.body;
		let userId = parseInt(userId1);

		try {
			if (!userId) throw new Error("Missing userId");
			if (!title) throw new Error("Missing title");
			if (!desc) throw new Error("Missing desc");
			if (!session) throw new Error("Missing session");

			const newComplain = await prisma.complains.create({
				data: {
					title: title,
					description: desc,
					session: session,
					authorId: userId,
				},
			});
			return res
				.status(200)
				.json({ error: false, msg: "Success", data: newComplain });
		} catch (err: any) {
			return res.status(400).json({ error: true, msg: err?.message });
		}
	})
	.put(async (req: Request, res: Response) => {
		const { vote, userId1, complainId1 } = req.body;
		let userId = parseInt(userId1);
		let complainId = parseInt(complainId1);

		try {
			if (!vote) throw new Error("Missing vote");
			if (!userId) throw new Error("Missing userId");
			if (!complainId) throw new Error("Missing complainId");

			const alreadyVoted = await prisma.voteCalc.findFirst({
				where: {
					voterId: userId,
					complainId: complainId,
				},
			});
			console.log("Already Voted: ", alreadyVoted);

			let voted = false;
			let delVoteId = 0;
			if (alreadyVoted) {
				voted = true;
				delVoteId = alreadyVoted.id;
			}
			// console.log("Delete Vote Id: ",delVoteId);

			if (!voted) {
				const voterUpdate = await prisma.voteCalc.create({
					data: {
						voterId: userId,
						complainId: complainId,
						vote: vote,
					},
				});
			}

			let updateVal = {};
			const vo = await prisma.complains.findUnique({
				where: {
					id: complainId,
				},
				select: {
					upvote: true,
					downvote: true,
				},
			});
			if (vote == "up") {
				if (voted == true) {
					if (alreadyVoted.vote == "up") {
						throw new Error("Already upvoted");
					}
					updateVal["downvote"] = vo.downvote - 1;
				}
				updateVal["upvote"] = vo.upvote + 1;
			} else if (vote == "down") {
				if (voted == true) {
					if (alreadyVoted.vote == "down") {
						throw new Error("Already downvoted");
					}
					updateVal["upvote"] = vo.upvote - 1;
				}
				updateVal["downvote"] = vo.downvote + 1;
			}
			if (voted == true) {
				const deleteVote = await prisma.voteCalc.delete({
					where: { id: delVoteId },
				});
				const addVote = await prisma.voteCalc.create({
					data: {
						vote: vote,
						voterId: alreadyVoted.voterId,
						complainId: alreadyVoted.complainId,
					},
				});
			}

			console.log("Update Value: ", updateVal);

			const voteAdd = await prisma.complains.update({
				where: {
					id: complainId,
				},
				data: updateVal,
			});

			return res
				.status(200)
				.json({ error: false, msg: "Success", data: updateVal });
		} catch (err: any) {
			console.log(err);
			return res.status(400).json({ error: true, msg: err?.message });
		}
	});

routes.delete("/:complainId1", async (req: Request, res: Response) => {
	const { complainId1 } = req.params;
	let complainId = parseInt(complainId1);

	try {
		const findComplain = await prisma.complains.findUnique({
			where: { id: complainId },
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
			where: { id: complainId },
		});

		return res.status(200).json({
			error: false,
			msg: "Success",
			data: deleteFromComplain,
		});
	} catch (err: any) {
		return res.status(400).json({ error: true, msg: err?.message });
	}
});

routes.get("/who-voted", async (req: Request, res: Response) => {
	const { complainId } = req.query;

	try {
		const whoVoted = await prisma.voteCalc.findMany({
			where: {
				complainId: parseInt(complainId as string),
			},
		});
		console.log(whoVoted);

		const whoVotedUp: number[] = [];
		const whoVotedDown: number[] = [];
		for (let i = 0; i < whoVoted.length; i++) {
			if (whoVoted[i].vote == "up") {
				whoVotedUp.push(whoVoted[i].voterId);
			} else if (whoVoted[i].vote == "down") {
				whoVotedDown.push(whoVoted[i].voterId);
			}
		}
		return res.status(200).json({
			error: false,
			msg: "Success",
			data: { complainId, whoVotedUp, whoVotedDown },
		});
	} catch (error) {
		return res.status(400).json({ error: true, msg: error?.message });
	}
});

export default routes;
