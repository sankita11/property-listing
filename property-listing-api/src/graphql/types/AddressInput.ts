import { Address } from "../../db/model/Address";
import { Field, InputType } from "type-graphql";

@InputType()
export class AddressInput implements Partial<Address> {
    
    @Field(() => String)
    flatNumber!: string ;
    
    @Field(() => String)
    addressLine1!: string ;
   
    @Field(() => String)
    addressLine2?: string | null = null;
}