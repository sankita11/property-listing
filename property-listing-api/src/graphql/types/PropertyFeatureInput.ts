import { Field, ID, InputType } from "type-graphql";
import { Feature } from "../../db/model/Feature";

@InputType()
export class PropertyFeatureInput implements Partial<Feature> {
    
    @Field(() => ID)
    id!: number;

    @Field({nullable: true})
    feature?: string;
    
}