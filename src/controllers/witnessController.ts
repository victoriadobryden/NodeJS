import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Witness from '../model/witness';
import Sprava from '../model/sprava';

export const createWitness = async (req: Request, res: Response): Promise<void> => {
  try {
    const { spravaId, value } = req.body;

    const sprava = await Sprava.findById(spravaId);
    if (!sprava) {
      res.status(400).json({ message: 'Invalid Sprava ID' });
      return;
    }

    const witness = new Witness({ spravaId, value });
    const savedWitness = await witness.save();
    res.status(201).json(savedWitness);
  } catch (error) {
    const errorMessage = (error instanceof Error) ? error.message : 'Unknown error';
    res.status(400).json({ message: errorMessage });
  }
};

export const getWitnessBySpravaId = async (req: Request, res: Response): Promise<void> => {
  try {
    const { spravaId, size, from } = req.query;

    if (typeof spravaId !== 'string' || typeof size !== 'string' || typeof from !== 'string') {
      res.status(400).json({ message: 'Invalid query parameters' });
      return;
    }

    const witnessList = await Witness.find({ spravaId })
      .sort({ timestamp: -1 })
      .skip(Number(from))
      .limit(Number(size));
    res.status(200).json(witnessList);
  } catch (error) {
    const errorMessage = (error instanceof Error) ? error.message : 'Unknown error';
    res.status(400).json({ message: errorMessage });
  }
};

export const countWitnessBySpravaIds = async (req: Request, res: Response): Promise<void> => {
  try {
    const { spravaIds } = req.body;

    if (!Array.isArray(spravaIds)) {
      res.status(400).json({ message: 'Invalid body format' });
      return;
    }

    const counts = await Witness.aggregate([
      { $match: { spravaId: { $in: spravaIds.map(id => new mongoose.Types.ObjectId(id)) } } },
      { $group: { _id: "$spravaId", count: { $sum: 1 } } },
    ]);

    const result: { [key: string]: number } = {};
    counts.forEach(count => {
      result[count._id.toString()] = count.count;
    });

    res.status(200).json(result);
  } catch (error) {
    const errorMessage = (error instanceof Error) ? error.message : 'Unknown error';
    res.status(400).json({ message: errorMessage });
  }
};
