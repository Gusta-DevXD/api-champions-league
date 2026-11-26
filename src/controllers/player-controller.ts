
import { Request, Response } from "express";
import * as service from "../services/player-service";
import { StatisticsModel } from "../models/statistic-model";

export const getPlayer = async (req: Request, res: Response) => {
  const httpResponse = await service.getPlayerService();
  res.status(httpResponse.statusCode).json(httpResponse.body);
};

export const getPlayerById = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    res.status(400).json({ message: "Invalid player ID" });
    return;
  }

  const httpResponse = await service.getPlayerByIdService(id);
  res.status(httpResponse.statusCode).json(httpResponse.body);
};

export const postPlayer = async (req: Request, res: Response) => {
  const bodyValue = req.body;
  const httpResponse = await service.createPlayerService(bodyValue);
  res.status(httpResponse.statusCode).json(httpResponse.body);
};

export const deletePlayer = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    res.status(400).json({ message: "Invalid player ID" });
    return;
  }
  const httpResponse = await service.deletePlayerService(id);
  res.status(httpResponse.statusCode).json(httpResponse.body);
};

export const updatePlayer = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const bodyValue: StatisticsModel = req.body;
  const httpResponse = await service.updatePlayerService(id, bodyValue);
  res.status(httpResponse.statusCode).json(httpResponse.body);
};
