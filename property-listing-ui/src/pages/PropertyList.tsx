import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import { GET_PROPERTY_LIST } from '../graphql/Queries';
import { Property, PropertyType } from '../interfaces/Property';
import PropertyComponent from '../components/Property';

const PropertyListComponent: React.FC = () => {
  const [propertyList, setPropertyList] = useState<Property[]>();
  const [propertyTypes, setPropertyTypes] = useState<PropertyType[]>();

  const { loading, data } = useQuery(GET_PROPERTY_LIST);
  useEffect(() => {
    if (!loading) {
      setPropertyList(data.properties);
      setPropertyTypes(data.propertyTypes);
    }
  }, [data, loading]);

  if (!propertyList || propertyList?.length === 0) {
    return (
      <div className="d-flex flex-column justify-content-center align-items-center flex-grow-1">
        <div className="d-flex flex-column">
          <h4>GET STARTED</h4>
          <p>Your are click away to creating your rental property</p>
          <Link to="/new">
            <div className="mb-2">
              <button type="button" className="btn btn-primary">Create Certificate</button>
            </div>
          </Link>

        </div>
      </div>
    );
  }

  const properties = propertyList?.map((eachProperty) => (
    <PropertyComponent
      key={eachProperty.id}
      propertyItem={eachProperty}
      propertyTypes={propertyTypes}
    />
  ));

  return (
    <div className="d-flex flex-column mt-5">
      <Link to="/new">
        <div className="m-2">
          <button type="button" className="btn btn-primary">Create Property</button>
        </div>
      </Link>
      <div className="d-flex flex-row flex-wrap flex-shrink">
        {properties}
      </div>
    </div>

  );
};

export default PropertyListComponent;
