import { gql } from '@apollo/client';

export const CREATE_PROPERTY = gql`
  mutation PropertyCreateMutation( $propertyCreateData: PropertyInputType!) {
    propertyCreate(data: $propertyCreateData) {
      id
    }
  }
`;

export const GET_PROPERTY_TYPES = gql`
query{
  propertyTypes{
    id
    propertyType
  }
  features{
    id
    feature
  }
}
`;

export const GET_PROPERTY_LIST = gql`
query{
  properties{
    id
    propertyTypeID
    address{
      flatNumber
      addressLine1
    }
    numberOfBedrooms
    numberOfBathrooms
    monthlyRent
    moveInDate
    propertyDescription
    coverImageUrl
    createdAt
    updatedAt
  }

  propertyTypes{
    id
    propertyType
  }
  features{
    id
    feature
  }
}
`;
