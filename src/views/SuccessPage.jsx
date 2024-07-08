import { Link } from "react-router-dom";
const SuccessPage = () => {
    return (
        <main className="container mt-5">
        <div className="row justify-content-center">
            <div className="col-md-6">
                <div className="text-center wb">
                    <h1>¡Gracias por tu compra!</h1>
                    <p>Estamos muy agradecidos de que hayas realizado tu compra con nosotros.</p>
                    <p>Tu pedido ha sido confirmado y pronto será procesado y enviado.</p>
                    <p>Si tienes alguna pregunta o inquietud acerca de tu pedido, no dudes en contactarnos.</p>
                    <Link to="/" className="btn btn-primary">Volver a la página principal</Link>
                </div>
            </div>
        </div>
    </main>
    );
};

export default SuccessPage;