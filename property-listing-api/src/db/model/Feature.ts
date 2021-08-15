import { Field, ID, ObjectType } from "type-graphql";
import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";


@Entity({ name: 'feature' })
@ObjectType({ description: "This is feature model" })
export class Feature {

  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number = 0;

  @Field(() => String, { description: "Feature Name" })
  @Column('varchar', { length: 100 })
  feature!: string ;
}