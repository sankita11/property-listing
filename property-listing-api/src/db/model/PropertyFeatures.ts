import { Field, ID, Int, ObjectType } from "type-graphql";
import {Entity, PrimaryGeneratedColumn, Column,CreateDateColumn, ManyToOne} from "typeorm";
import { Property } from "./Property";


@Entity({ name: 'property_feature' })
@ObjectType({ description: "Property and property feature relationships" })
export class PropertyFeature {

  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number = 0;

  @Field(() => Int, { description: "ID of property" })
  @Column({type: 'int'})
  propertyId: number | null = null;

  @Field(() => Int, { description: "ID of feature" })
  @Column({type: 'int'})
  propertyFeatureID: number | null = null;

  @Field(() => Date, { description: "Relationship created on this date" })
  @CreateDateColumn()
  createdAt: Date = new Date();

  @ManyToOne(type => Property, property => property.id)
  property!: Property;

}