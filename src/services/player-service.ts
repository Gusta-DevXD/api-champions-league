import { PlayerModel } from "../models/player-model";
import { StatisticsModel } from "../models/statistic-model";
import * as PlayerRepostory from "../repository/players-repo";
import * as HttpResponse from "../utils/helper";

export const getPlayerService = async () => {
  const data = await PlayerRepostory.findAll();
  let response = null;

  if (data) {
    response = await HttpResponse.ok(data);
  } else {
    response = await HttpResponse.noContent();
  }

  return response;
};

export const getPlayerByIdService = async (id: number) => {
  //pedir pro repisotório de dados
  const data = await PlayerRepostory.findPlayerById(id);
  let response = null;

  if (data) {
    response = await HttpResponse.ok(data);
  } else {
    response = await HttpResponse.noContent();
  }

  return response;
};

export const createPlayerService = async (player: PlayerModel) => {
  let response = null;

  //verifica se está vazio
  if (Object.keys(player).length !== 0) {
    await PlayerRepostory.insertPlayer(player);
    response = await HttpResponse.created();
  } else {
    response = await HttpResponse.badRequest();
  }

  return response;
};

export const deletePlayerService = async (id: number) => {
  let response = null;
  const isDeleted = await PlayerRepostory.deleteOnePlayer(id);

  if (isDeleted) {
    response = await HttpResponse.ok({ message: "deleted" });
  } else {
    response = await HttpResponse.badRequest();
  }

  return response;
};

export const updatePlayerService = async (
  id: number,
  statistics: StatisticsModel
) => {
  const data = await PlayerRepostory.findAndModifyPlayer(id, statistics);

  if (!data) {
    return await HttpResponse.badRequest();
  }

  return await HttpResponse.ok(data);
};