import { getAllActor } from "../../utils/allApi";

export const actorResolvers = {
  Query: {
    getAllActor: getAllActor
  }
}