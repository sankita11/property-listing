import { Field, ID, ObjectType } from "type-graphql";
import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";


@Entity({ name: 'property_type' })
@ObjectType({ description: "This is property type model" })
export class PropertyType {

  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number = 0;

  @Field(() => String, { description: "Property type name" })
  @Column('varchar', { length: 100 })
  propertyType!: string ;
}