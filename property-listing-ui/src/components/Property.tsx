import React from 'react';
import { Property, PropertyType } from '../interfaces/Property';

export type PropertyProp = {
  propertyItem: Property,
  propertyTypes: PropertyType[] | undefined
}

const PropertyComponent: React.FC<PropertyProp> = ({
  propertyItem,
  propertyTypes,
}:PropertyProp) => {
  const selectedProperty: PropertyType[] | undefined = propertyTypes?.filter(
    (eachElem:PropertyType) => propertyItem.propertyTypeID.toString() === eachElem.id.toString(),
  );

  return (

    <div className="card m-2" style={{ width: '18rem' }}>
      <div className="d-flex flex-column p-3">
        <h4 className="my-2">
          <strong>
            <em>
              {propertyItem.address.flatNumber ? `${propertyItem.address.flatNumber} ` : '' }
              { propertyItem.address.addressLine1 ? propertyItem.address.addressLine1 : ''}
            </em>
          </strong>

        </h4>
        <p className="card-text my-0">
          {
              selectedProperty !== undefined && selectedProperty.length > 0 && (
              <span>{selectedProperty[0].propertyType}</span>
              )
            }

        </p>
        <p className="my-0"><em>{propertyItem.propertyDescription}</em></p>
        <p className="my-0">
          Rent PCM (Monthly):
          {' '}
          £
          {propertyItem.monthlyRent}

        </p>
        <p className="my-0">
          Move In Date:
          {' '}
          {propertyItem.moveInDate}
        </p>
      </div>
    </div>

  );
};

export default PropertyComponent;
