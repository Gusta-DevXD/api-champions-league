import * as HttpResponse from "../utils/helper";
import * as repository from "../repository/clubs-repo";

export const getClubService = async () => {
  const data = await repository.findAllClubs();
  const response = HttpResponse.ok(data);
  return response;
};