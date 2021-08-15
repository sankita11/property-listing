import { PropertyInputType } from "../types/PropertyInput";
import { Resolver, Mutation, Arg, Query,  FieldResolver, Root } from "type-graphql";
import { Property } from "../../db/model/Property";
import {getAllPropertyList, insertProperty, getPropertyByID, updateProperty} from '../../db/repositories/property.repository';
import { ErrorMessage } from "../../db/model/Error";
  
@Resolver(_of => Property)
export class PropertyResolver {
    @Query(() => [Property])
    async properties(){
      try{
        return await getAllPropertyList();
      }catch(e) {
        return {
          message: "Error getting list of propeties"
        } as ErrorMessage
      }
      
    };

    @Query(() => [Property])
    async property(@Arg("id") id: number){
      try{
        return await getPropertyByID(id)
      } catch(e) {
        return {
          message: `Error get property for id: ${id}`
        } as ErrorMessage
      }
     
    };
  
    @Mutation(() => Property)
    async propertyCreate(@Arg("data") propertyInput: PropertyInputType): Promise<Property | undefined | ErrorMessage> { 
      try{
        const property = (await insertProperty(propertyInput))
        return property;
      }catch(e) {
        return {
          message: "Error creating property"
        } as ErrorMessage
      }
      
    };

    @Mutation(() => Property)
    async propertyUpdate(@Arg("data") propertyInput: PropertyInputType): Promise<Property | undefined | ErrorMessage> { 
      try{
        const property = (await updateProperty(propertyInput))
        return property;
      }catch(e) {
        return {
          message: "Error updating property"
        } as ErrorMessage
      }
      
    };
}