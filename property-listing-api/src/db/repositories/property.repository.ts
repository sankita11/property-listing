import { PropertyInputType } from "../../graphql/types/PropertyInput";
import { getConnection, getRepository } from "typeorm";
import { Property } from "../model/Property";
import { PropertyFeature } from "../model/PropertyFeatures";
import { deleteByPropertyID, insertPropertyFeature } from "./property-feature.repository";
import { ErrorMessage } from "../model/Error";

export const getAllPropertyList = async (): Promise<Property[]> => {
  const properties = await getRepository(Property)
    .createQueryBuilder("propertyList")
    .leftJoinAndMapMany("propertyList.propertyFeature", PropertyFeature, "propertyFeature", "propertyFeature.propertyId = propertyList.id")
    .orderBy("propertyList.createdAt", "ASC")
    .getMany();

  return properties;
};

export const getPropertyByID = async (id: number): Promise<Property | undefined> => {
    const property = await getRepository(Property)
      .createQueryBuilder("prop")
      .where("prop.id = :id", {id})
      .getOne();
  
    return property;
};

export const insertProperty = async ( propertyInput: PropertyInputType): Promise<Property | undefined | ErrorMessage> => {

    try {
        const newProperty =  await getConnection()
        .createQueryBuilder()
        .insert()
        .into(Property)
        .values(propertyInput)
        .execute();
    
        const propertyID: number = newProperty.identifiers[0].id
    
        await insertPropertyFeature(propertyID, propertyInput.propertyFeatures)
        
        return getPropertyByID(propertyID)
    }catch(e) {
        return {
            message: e.message
        } as ErrorMessage
    }
   
}

export const updateProperty = 
async( propertyInput: PropertyInputType): Promise<Property | undefined | ErrorMessage> => {

    if( propertyInput.id == null ){
        return {
            message: "No ID found in input object"
        } as ErrorMessage
    }

    try{
        const propertyID = propertyInput.id;
 
        await getConnection()
        .createQueryBuilder()
        .update(Property)
        .set(propertyInput)
        .where("id = :id", { id: propertyID })
        .execute();
    
        await deleteByPropertyID(propertyID)
        await insertPropertyFeature(propertyID, propertyInput.propertyFeatures)
    
        return getPropertyByID(propertyID)
    }catch(e) {
        return {
            message: e.message
        } as ErrorMessage
    }
   
}
