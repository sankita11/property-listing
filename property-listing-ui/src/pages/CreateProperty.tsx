/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

import { useMutation, useQuery } from '@apollo/client';
import { Link, useHistory, withRouter } from 'react-router-dom';
import {
  Address, Feature, Property, PropertyType,
} from '../interfaces/Property';
import { CREATE_PROPERTY, GET_PROPERTY_TYPES } from '../graphql/Queries';

const CreateProperty: React.FC = () => {
  const history = useHistory();

  const [errorMessage, setErrorMessage] = useState('');

  const [createProperty] = useMutation(CREATE_PROPERTY);
  const [moveInDate, setMoveInDate] = useState(new Date());
  const [propertyTypes, setPropertyTypes] = useState<PropertyType[]>();
  const [features, setFeatures] = useState<Feature[]>();

  const [propertyTypeID, setPropertyTypeID] = useState('');
  const handlePropertyTypeID = (event:React.ChangeEvent<HTMLSelectElement>) => setPropertyTypeID(event.currentTarget.value);

  const [numberOfBedrooms, setNumberOfBedrooms] = useState('');
  const handleNumberOfBedrooms = (event: React.FormEvent<HTMLInputElement>) => setNumberOfBedrooms(event.currentTarget.value);

  const [numberOfBathrooms, setNumberOfBathrooms] = useState('');
  const handleNumberOfBathrooms = (event: React.FormEvent<HTMLInputElement>) => setNumberOfBathrooms(event.currentTarget.value);

  const [flatNumber, setFlatNumber] = useState('');
  const handleFlatNumber = (event: React.FormEvent<HTMLInputElement>) => setFlatNumber(event.currentTarget.value);

  const [addressLine1, setAddressLine1] = useState('');
  const handleAddressLine1 = (event: React.FormEvent<HTMLInputElement>) => setAddressLine1(event.currentTarget.value);

  const [addressLine2, setAddressLine2] = useState('');
  const handleAddressLine2 = (event: React.FormEvent<HTMLInputElement>) => setAddressLine2(event.currentTarget.value);

  const [propertyDescription, setPropertyDescription] = useState('');
  const handlePropertyDescription = (event: React.ChangeEvent<HTMLTextAreaElement>) => setPropertyDescription(event.currentTarget.value);

  const [monthlyRent, setMonthlyRent] = useState('');
  const handleMonthlyRent = (event: React.FormEvent<HTMLInputElement>) => setMonthlyRent(event.currentTarget.value);

  const [coverImageUrl, setCoverImageUrl] = useState('');
  const handleCoverImageUrl = (event: React.FormEvent<HTMLInputElement>) => setCoverImageUrl(event.currentTarget.value);

  const [selectedFeatures, setSelectedFeatures] = useState<boolean[]>([]);

  const { loading, data } = useQuery(GET_PROPERTY_TYPES);
  useEffect(() => {
    if (!loading) {
      // eslint-disable-next-line no-console
      console.log(data);
      setPropertyTypes(data.propertyTypes);
      setFeatures(data.features);
      setSelectedFeatures(
        new Array(features?.length).fill(false),
      );
      setPropertyTypeID(data.propertyTypes[0].id);
    }
  }, [data, loading]);

  const handleFeatureSelect = (position: number) => {
    const updatedCheckedState = selectedFeatures.map((item, index) => (index === position ? !item : item));
    setSelectedFeatures(updatedCheckedState);
  };

  const saveProperty = useCallback(async (e) => {
    e.preventDefault();
    const featureSelected: Feature[] = [];
    features?.forEach((eachElem, index) => {
      if (selectedFeatures[index] === true) {
        featureSelected.push({
          id: eachElem.id,
          feature: eachElem.feature,
        });
      }
      return null;
    });
    const input = {
      propertyTypeID: parseInt(propertyTypeID, 10),
      numberOfBathrooms: parseInt(numberOfBathrooms, 10),
      numberOfBedrooms: parseInt(numberOfBedrooms, 10),
      propertyDescription,
      monthlyRent: parseInt(monthlyRent, 10),
      moveInDate,
      coverImageUrl,
      address: {
        flatNumber,
        addressLine1,
        addressLine2,
      } as Address,
      propertyFeatures: featureSelected,
    } as Property;
    // eslint-disable-next-line no-console
    console.log(input);
    await createProperty({ variables: { propertyCreateData: input } }).then(() => {
      history.push('/');
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    }).catch((error) => {
      setErrorMessage('Error creating property, please check your inputs');
    });
  }, [propertyTypeID, numberOfBathrooms, numberOfBedrooms, monthlyRent]);

  return (
    <div className="d-flex flex-column">
      <h2 className="m-4">Create Property</h2>
      <form className="p-2" onSubmit={saveProperty}>
        <div className="d-flex flex-column flex-md-row">

          <div className="m-3 flex-fill">
            <div className="mb-3">
              <label htmlFor="propertyType" className="form-label">Property type</label>
              <select
                className="form-control"
                id="propertyType"
                name="propertyType"
                onChange={handlePropertyTypeID}
                value={propertyTypeID}
              >
                {
                  propertyTypes && (
                    propertyTypes.map((eachElem: PropertyType) => (
                      <option value={eachElem.id} key={eachElem.id}>{eachElem.propertyType}</option>
                    ))
                  )
                }
              </select>
            </div>
            <div className="mb-3">
              <div className="d-flex flex-row">
                <div className="flex-column mr-1">
                  <label htmlFor="numberOfBedrooms" className="form-label">Number of bedrooms</label>
                  <input
                    name="numberOfBedrooms"
                    onChange={handleNumberOfBedrooms}
                    type="text"
                    className="form-control"
                    placeholder="Number of bedrooms"
                    value={numberOfBedrooms}
                  />
                </div>
                <div className="flex-column">
                  <label htmlFor="numberOfBathrooms" className="form-label">Number of bathrooms</label>
                  <input
                    name="numberOfBathrooms"
                    onChange={handleNumberOfBathrooms}
                    type="text"
                    className="form-control ml-1"
                    id="numberOfBathrooms"
                    placeholder="Number of bathrooms"
                    value={numberOfBathrooms}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="m-3 flex-fill">

            <div className="mb-3">
              <label htmlFor="flatNumber" className="form-label">Flat number</label>
              <input
                name="flatNumber"
                onChange={(value) => handleFlatNumber(value)}
                type="text"
                className="form-control flex-fill"
                id="address"
                placeholder="Flat number"
                value={flatNumber}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="addressLine1" className="form-label">Address Line 1</label>
              <input
                name="addressLine1"
                onChange={handleAddressLine1}
                type="text"
                className="form-control flex-fill"
                id="address"
                placeholder="Address Line 1"
                value={addressLine1}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="addressLine2" className="form-label">Address Line 2</label>
              <input
                name="addressLine2"
                onChange={handleAddressLine2}
                type="text"
                className="form-control flex-fill"
                id="address"
                placeholder="Address Line 2"
                value={addressLine2}
              />
            </div>

          </div>

        </div>

        <div className="d-flex flex-column">
          <div className="mb-3">
            <label htmlFor="propertyDescription" className="form-label">Property description</label>
            <textarea
              name="propertyDescription"
              onChange={handlePropertyDescription}
              className="form-control"
              id="propertyDescription"
              rows={3}
              value={propertyDescription}
            />
          </div>

          <div className="mb-3">
            {
              features && (
                features.map((eachElem: Feature, index) => (
                  <div className="mb-3" key={eachElem.id}>
                    <input
                      name={eachElem.id.toString()}
                      type="checkbox"
                      className="form-check-input"
                      id={eachElem.id.toString()}
                      value={eachElem.feature}
                      checked={selectedFeatures[index]}
                      onChange={() => handleFeatureSelect(index)}
                    />
                    <label htmlFor="features" className="form-check-label">{eachElem.feature}</label>
                  </div>
                ))
              )
            }
          </div>

          <div className="d-flex flex-row justify-content-between">
            <div className="mb-3 flex-column">
              <label htmlFor="monthlyRent" className="form-label">Monthly rent(£)</label>
              <input
                name="monthlyRent"
                onChange={handleMonthlyRent}
                type="text"
                className="form-control flex-fill"
                id="monthlyRent"
                placeholder="Monthly rent"
                value={monthlyRent}
              />
            </div>

            <div className="mb-3 flex-column">
              <label htmlFor="moveInDate" className="form-label">Move in date</label>
              <DatePicker selected={moveInDate} onChange={(date: Date) => setMoveInDate(date)} />
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="coverImageUrl" className="form-label">Cover Image Url</label>
            <input
              name="coverImageUrl"
              onChange={handleCoverImageUrl}
              className="form-control"
              value={coverImageUrl}
            />
          </div>
        </div>

        {errorMessage && <div className="alert alert-danger mt-2">{errorMessage}</div>}
        <div className="d-flex flex-row justify-content-end">
          <button type="submit" className="btn btn-primary m-1">Save</button>
          <Link to="/"><button type="button" className="btn btn-secondary m-1">Cancel</button></Link>
        </div>
      </form>
    </div>
  );
};

export default withRouter(CreateProperty);
