import { getRepository } from "typeorm";
import { Feature } from "../model/Feature";

export const getAllFeaturesList = async (): Promise<Feature[]> => {
  const features = await getRepository(Feature)
    .createQueryBuilder("featureList")
    .getMany();

  return features;
};
