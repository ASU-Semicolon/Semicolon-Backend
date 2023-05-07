import { Request, Response } from 'express';
import { participant as ParticipantType } from '../types/participant';

import {
	dbGetAllParticipants,
	dbAddParticipant,
	dbUpsertParticipant,
	dbDeleteParticipantByEmail,
	dbUpdateUserByEmail,
} from '../models/participant/participant.model';
import ErrorWithStatusCode from '../util/classes/ErrorWithStatusCode';
import { dbAddNewLog } from '../models/log/log.model';

export async function getAllParticipants(req: Request, res: Response) {
	try {
		const participants = await dbGetAllParticipants();
		res.status(200).json({ status: 'success', data: participants });
	} catch (error: ErrorWithStatusCode | any) {
		res.status(error.statusCode || 500).json({
			status: 'failure',
			data: error.message,
		});
	}
}

export async function addParticipant(req: Request, res: Response) {
	try {
		const { participant }: { participant: ParticipantType } = req.body;
		const newParticipant = await dbUpsertParticipant(participant);
		res.status(200).json({ status: 'success', data: newParticipant });
	} catch (error: ErrorWithStatusCode | any) {
		res.status(error.statusCode || 500).json({
			status: 'failure',
			data: error.message,
		});
	}
}

export async function deleteParticipantByEmail(req: Request, res: Response) {
	try {
		const { email } = req.body;
		const deletedParticipant = await dbDeleteParticipantByEmail(email);
		await dbAddNewLog({
			adminPhone: req.user?.phone as string,
			adminId: req.user?._id as string,
			action: 'delete',
			participantId: deletedParticipant._id as string,
		});
		res.status(200).json({ status: 'success', data: deletedParticipant });
	} catch (error: ErrorWithStatusCode | any) {
		res.status(error.statusCode || 500).json({
			status: 'failure',
			data: error.message,
		});
	}
}

export async function updateParticipant(req: Request, res: Response) {
	try {
		const {
			update,
			email,
		}: { update: Partial<ParticipantType>; email: string } = req.body;
		const updatedParticipant = await dbUpdateUserByEmail(update, email);
		res.status(200).json({ status: 'success', data: updatedParticipant });
	} catch (error: ErrorWithStatusCode | any) {
		res.status(error.statusCode || 500).json({
			status: 'failure',
			data: error.message,
		});
	}
}
