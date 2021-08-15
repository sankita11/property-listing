import { InputType, Field, Int, ID } from "type-graphql";
import { Property } from "../../db/model/Property";
import { AddressInput } from "./AddressInput";
import { PropertyFeatureInput } from "./PropertyFeatureInput";

@InputType()
export class PropertyInputType implements Partial<Property> {

    @Field(()=> Int, {nullable: true})
    id?: number;
  
    @Field(() => Int)
    propertyTypeID: number | null = null;
  
    @Field(() => AddressInput)
    address!: AddressInput ;
  
    @Field(() => Int)
    numberOfBedrooms!: number;
  
    @Field(() => Int)
    numberOfBathrooms!: number;
  
    @Field(() => Int)
    monthlyRent!: number;
    
    @Field(() => Date)
    moveInDate!: Date;
  
    @Field(() => String)
    propertyDescription!: string;

    @Field(() => [PropertyFeatureInput])
    propertyFeatures!: PropertyFeatureInput[];
 
}