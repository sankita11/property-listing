import { Resolver, Query } from "type-graphql";
import {getAllFeaturesList} from '../../db/repositories/feature.repository';
import { Feature } from "../../db/model/Feature";
  
@Resolver(_of => Feature)
export class FeatureResolver {
    @Query(() => [Feature])
    async features(){
      return await getAllFeaturesList();
    };
}