import { useState } from 'react';

const BrandsFilter = () => {
  const [selectedBrands, setSelectedBrands] = useState([]);

  const handleBrandSelection = (brand) => {
    const isSelected = selectedBrands.includes(brand);
    if (isSelected) {
      setSelectedBrands(selectedBrands.filter((item) => item !== brand));
    } else {
      setSelectedBrands([...selectedBrands, brand]);
    }
  };

  return (
    <div>
      <ul>
        <li>
          <label>
            <input
              type="checkbox"
              checked={selectedBrands.includes('Brand1')}
              onChange={() => handleBrandSelection('Brand1')}
            />
            Marca 1
          </label>
        </li>
        <li>
          <label>
            <input
              type="checkbox"
              checked={selectedBrands.includes('Brand2')}
              onChange={() => handleBrandSelection('Brand2')}
            />
            Marca 2
          </label>
        </li>
        <li>
          <label>
            <input
              type="checkbox"
              checked={selectedBrands.includes('Brand3')}
              onChange={() => handleBrandSelection('Brand3')}
            />
            Marca 3
          </label>
        </li>
      </ul>
      <p>Marcas Seleccionadas: {selectedBrands.join(', ')}</p>
    </div>
  );
};

export default BrandsFilter;