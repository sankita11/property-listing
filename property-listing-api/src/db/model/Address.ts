import { Field, ObjectType } from "type-graphql";

@ObjectType({ description: "This is address model" })
export class Address {
    
    @Field(() => String, { description: "Flat/House number of the property" })
    flatNumber!: string ;
    
    @Field(() => String, { description: "Address line 1 of the property" })
    addressLine1!: string ;
   
    @Field(() => String, { description: "Optional address line 2 of the property" })
    addressLine2?: string | null = null;
}