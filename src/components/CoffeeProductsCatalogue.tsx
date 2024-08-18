import { Coffee } from "../lib/data-fetch/coffee";
import CoffeeProductCard from "./CoffeeProductCard";
import React, { useState } from 'react';

import Select from 'react-select';

const MultiValueDropdown = ({ options, defaultValue, onChange }) => (
  <Select
    isMulti
    options={options}
    defaultValue={defaultValue}
    onChange={onChange}
  />
);
const CoffeeProductsCatalogue = ({ coffees }) => {
  const [selectedCountries, setSelectedCountries] = useState([{ value: 'all', label: 'All' }]);
  const [selectedAttributesBrightness, setSelectedAttributesBrightness] = useState([{ value: 'all', label: 'All' }]);
  const [selectedAttributesBody, setselectedAttributesBody] = useState([{ value: 'all', label: 'All' }]);
  const [selectedAttributesAroma, setselectedAttributesAroma] = useState([{ value: 'Attributes_Aroma', label: 'Aroma' }]);
  const [selectedAttributesComplexity, setselectedAttributesComplexity] = useState([{ value: 'Attributes_Complexity', label: 'Complexity' }]);
  const [selectedAttributesSweetness, setselectedAttributesSweetness] = useState([{ value: 'Attributes_Sweetness', label: 'Sweetness' }]);
  const [selectedAttributesBalance, setselectedAttributesBalance] = useState([  { value: 'Attributes_Balance', label: 'Balance' }]);
  // Extract unique countries and attributes brightness levels for dropdown options
  const countries = Array.from(new Set(coffees.map(coffee => coffee.Country)));
  const attributeLevels = Array.from({ length: 7 }, (_, index) => (index + 1).toString());

  const options_country = [
    { value: 'all', label: 'All' },
    ...countries.map(country => ({ value: country, label: country })),
  ];
  const options_levels = [
    { value: 'all', label: 'All' },
    ...attributeLevels.map(level => ({ value: level, label: level })),
  ];

  // Handle dropdown selection changes for countries
  const handleCountryChange = (selectedOptions) => {
    setSelectedCountries(selectedOptions);
  };

  // Handle dropdown selection changes for attributes brightness levels
  const handleAttributesBrightnessChange = (selectedOptions) => {
    setSelectedAttributesBrightness(selectedOptions);
  };

  const handleAttributes_Body = (selectedOptions) => {
    setselectedAttributesBody(selectedOptions);
  };

  const handleAttributes_Aroma = (selectedOptions) => {
    setselectedAttributesBody(selectedOptions);
  };




  // Filter function based on selected countries and attributes brightness levels
  const filterCoffees = (coffees, countries, attributesBrightness, attributesBody,aroma ) => {
    return coffees.filter(coffee =>
      (countries.some(option => option.value === 'all') || countries.some(option => option.value === coffee.Country)) 
      && (attributesBrightness.some(option => option.value === 'all') || attributesBrightness.some(option => option.value === coffee.Attributes_Brightness.toString()))
      && (attributesBody.some(option => option.value === 'all') || attributesBody.some(option => option.value === coffee.Attributes_Body.toString()))
    );
  };

  // Get filtered coffees
  const filteredCoffees = filterCoffees(coffees, selectedCountries, selectedAttributesBrightness, selectedAttributesBody );

  return (
    <div>
      {/* Dropdowns for filtering */}
      <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
        <MultiValueDropdown
          options={options_country}
          defaultValue={selectedCountries}
          onChange={handleCountryChange}
        />
        <MultiValueDropdown
          options={options_levels}
          defaultValue={selectedAttributesBrightness}
          onChange={handleAttributesBrightnessChange}
        />
        <MultiValueDropdown
          options={options_levels}
          defaultValue={selectedAttributesBody}
          onChange={handleAttributes_Body}
        />
      </div>
      {/* Display filtered coffees */}
      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
        {filteredCoffees.map((coffee) => (
          <CoffeeProductCard key={coffee.name} coffee={coffee} />
        ))}
      </div>
    </div>
  );
};

export default CoffeeProductsCatalogue;