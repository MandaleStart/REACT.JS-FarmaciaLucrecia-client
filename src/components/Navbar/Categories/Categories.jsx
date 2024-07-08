import { Link } from 'react-router-dom';
const Categories = () => {
  const categories = [
    'cosmetica',
    'cuidado personal',
    'medicamentos',
    'maternidad',
    'productos naturales',
    'perfumeria',
    'proteccion solar',
    'joyeria'//,
    //'marcas destacadas'
  ];

  const formatCategory = (category) => {
    return category.replace(/\s+/g, '-');
  };

  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark w-100 ">
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCat"
          aria-controls="navbarCat" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarCat"></div>

        <ul className="navbar-nav justify-content-center">
          {categories.map((category, index) => (
            <li className="nav-item" key={index}>
              <Link className="nav-link text-capitalize" to={"/category/" + formatCategory(category)}>{category}</Link>
            </li>
          ))}
        </ul>
    </nav>
  );
};

export default Categories;
