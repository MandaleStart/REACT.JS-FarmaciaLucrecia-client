import { useState } from 'react';

const PriceFilter = () => {
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');

    const handleMinPriceChange = (event) => {
        setMinPrice(event.target.value);
    };

    const handleMaxPriceChange = (event) => {
        setMaxPrice(event.target.value);
    };

    const handleFilterClick = () => {
        console.log('Min Price:', minPrice);
        console.log('Max Price:', maxPrice);
    };

    return (
        <div>
            <label htmlFor="minPrice">Precio mínimo:</label>
            <input
                type="number"
                id="minPrice"
                value={minPrice}
                onChange={handleMinPriceChange}
            />
            -
            <label htmlFor="maxPrice">Precio máximo:</label>
            <input
                type="number"
                id="maxPrice"
                value={maxPrice}
                onChange={handleMaxPriceChange}
            />

            <button onClick={handleFilterClick}>Filtrar</button>
        </div>
    );
};

export default PriceFilter;