import { Resolver, Query } from "type-graphql";
import { PropertyType } from "../../db/model/PropertyType";
import { getPropertyTypeList } from "../../db/repositories/property-type.repository";
  
@Resolver(_of => PropertyType)
export class PropertyTypesResolver {
    @Query(() => [PropertyType])
    async propertyTypes(){
      return await getPropertyTypeList();
    };
}