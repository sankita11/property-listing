export interface PropertyType {
  id: number,
  propertyType: string;
}

export interface Feature {
  id: number,
  feature: string
}

export interface Address {
  flatNumber: string,
  addressLine1: string,
  addressLine2: string
}

export interface Property {
  id?: number,
  propertyTypeID: number,
  address: Address,
  numberOfBedrooms: number,
  numberOfBathrooms: number,
  monthlyRent: number,
  moveInDate: Date,
  propertyDescription: string,
  coverImageUrl: string,
  propertyFeatures: Feature[],
}
