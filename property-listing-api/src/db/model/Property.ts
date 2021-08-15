import { ObjectType, Field, ID, Int } from "type-graphql";
import {Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn, OneToMany} from "typeorm";

import {Address} from './Address'
import { PropertyFeature } from "./PropertyFeatures";

@Entity({ name: 'property' })
@ObjectType({ description: "This is property model" })
export class Property {

  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number = 0;

  @Field(() => Int, { description: "This is selected property type ID" })
  @Column({type:'int' })
  propertyTypeID: number | null = null;

  @Field(() => Address, { description: "Address of the property" })
  @Column({type: 'jsonb', nullable: true})
  address!: Address ;

  @Field(() => Int, { description: "Number of bedrooms in the property" })
  @Column({type: 'integer' })
  numberOfBedrooms!: number;

  @Field(() => Int, { description: "Number of bathrooms in the property" })
  @Column({type: 'integer' })
  numberOfBathrooms!: number;

  @Field(() => Int, { description: "Monthly rent in £ of the property" })
  @Column({type: 'integer' })
  monthlyRent!: number;
  
  @Field(() => String, { description: "Rental property available from this date" })
  @Column({ type: "timestamptz" })
  moveInDate!: Date;

  @Field(() => String, { description: "Brief description of the property" })
  @Column({type: 'text'})
  propertyDescription!: string;

  @Field(() => String, { description: "Cover/Primary image url of the property" })
  @Column({type: 'varchar', length: 255, default: ""})
  coverImageUrl!: string;

  @Field(() => Date, { description: "Created property on this date" })
  @CreateDateColumn()
  createdAt: Date = new Date();

  @Field(() => String, { description: "Updated property on this date" })
  @UpdateDateColumn()
  updatedAt: Date = new Date();

  @Field(() => [PropertyFeature], { description: "Property and property feature relationships" })
  @OneToMany(type => PropertyFeature, propertyFeature => propertyFeature.propertyId)
  propertyFeature!: PropertyFeature[];
}