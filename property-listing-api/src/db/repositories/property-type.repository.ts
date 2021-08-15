import { getRepository } from "typeorm";
import { PropertyType } from "../model/PropertyType";

export const getPropertyTypeList = async (): Promise<PropertyType[]> => {
  const features = await getRepository(PropertyType)
    .createQueryBuilder("propertyTypeList")
    .getMany();

  return features;
};
