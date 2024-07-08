import { useState } from 'react';
import { AiOutlineSend } from 'react-icons/ai';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [formErrors, setFormErrors] = useState({
    name: false,
    email: false,
    subject: false,
    message: false,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let errors = {};
    let hasErrors = false;

    if (!formData.name) {
      errors.name = true;
      hasErrors = true;
    }
    if (!formData.email) {
      errors.email = true;
      hasErrors = true;
    }
    if (!formData.subject) {
      errors.subject = true;
      hasErrors = true;
    }
    if (!formData.message) {
      errors.message = true;
      hasErrors = true;
    }

    setFormErrors(errors);

    return !hasErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Submit the form using Formspree or any other method you prefer
      console.log(formData);
    }
  };

  return (
    <main className="container">
      <div className="row justify-content-center align-items-center vh-100">
        <form onSubmit={handleSubmit}>
          <h1 className="mb-4">Zona de contacto</h1>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Nombre:
            </label>
            <input
              className={`form-control${formErrors.name ? ' is-invalid' : ''}`}
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            {formErrors.name && (
              <div className="invalid-feedback">Por favor, ingrese su nombre.</div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Correo electrónico:
            </label>
            <input
              className={`form-control${formErrors.email ? ' is-invalid' : ''}`}
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            {formErrors.email && (
              <div className="invalid-feedback">Por favor, ingrese su correo electrónico.</div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="subject" className="form-label">
              Motivo:
            </label>
            <select
              className={`form-select${formErrors.subject ? ' is-invalid' : ''}`}
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
            >
              <option value="" disabled>
                Seleccione una opción
              </option>
              <option value="consulta">Consultas</option>
              <option value="reclamos">Reclamos</option>
              <option value="sugerencia">Sugerencias</option>
            </select>
            {formErrors.subject && (
              <div className="invalid-feedback">Por favor, seleccione un motivo.</div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="message" className="form-label">
              Mensaje:
            </label>
            <textarea
              className={`form-control${formErrors.message ? ' is-invalid' : ''}`}
              id="message"
              name="message"
              rows="9"
              value={formData.message}
              onChange={handleChange}
            />
            {formErrors.message && (
              <div className="invalid-feedback">Por favor, ingrese su mensaje.</div>
            )}
          </div>
          <button type="submit" className="btn btn-primary">
            Enviar <AiOutlineSend className="ml-2" />
          </button>
        </form>
      </div>
    </main>
  );
};

export default ContactPage;
