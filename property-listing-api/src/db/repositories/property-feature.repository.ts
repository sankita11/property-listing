import { PropertyFeatureInput } from "../../graphql/types/PropertyFeatureInput";
import { getConnection, getRepository } from "typeorm";
import { PropertyFeature } from "../model/PropertyFeatures";


export const getPropertyFeature = async( propertyID: number, propertyFeatureID: number ): Promise<PropertyFeature | undefined> => {

    const propertieFeatures = await getRepository(PropertyFeature)
    .createQueryBuilder("propertyFeature")
    .where("propertyFeature.proppertyId =  :propertyID", {propertyID})
    .andWhere("propertyFeature = :propertyFeatureID", {propertyFeatureID})
    .getOne()
    
    return propertieFeatures;
}


export const insertPropertyFeature = async( propertyID: number, propertyFeatureInput: PropertyFeatureInput[] ) => {

    const propertyFeatureToSave: PropertyFeature[] = [];
    propertyFeatureInput.forEach((eachElem: PropertyFeatureInput) => {
        propertyFeatureToSave.push(
            {
                propertyId: propertyID,
                propertyFeatureID: eachElem.id
            } as PropertyFeature
        )
    })

    await getConnection()
    .createQueryBuilder()
    .insert()
    .into(PropertyFeature)
    .values(propertyFeatureToSave)
    .execute();
}

export const deleteByPropertyID = async( propertyID: number ) => {
    await getConnection()
    .createQueryBuilder()
    .delete()
    .from(PropertyFeature)
    .where("propertId = :propertyID", {propertyID})
    .execute();
}