import { useState } from "react";

function useContactForm() {
  const [data, setData] = useState({
    name: "",
    lastname: "",
    email: "",
    message: "",
  });
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    const data = {
      name: formData.get("name"),
      lastname: formData.get("lastname"),
      email: formData.get("email"),
      message: formData.get("message"),
    };

    setData(data);
  };

  return { handleSubmit, data };
}

export default function Contact() {
  const { handleSubmit } = useContactForm();

  return (
    <>
      <title>DevJobs - Contacto</title>
      <main>
        <h1>Contact</h1>

        <form role="contact" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Nombre</label>
            <input type="text" name="name" id="name" />
          </div>
          <div className="form-group">
            <label htmlFor="lastname">Apellido</label>
            <input type="text" name="lastname" id="lastname" />
          </div>
          <div className="form-group">
            <label htmlFor="email">Correo</label>
            <input type="email" name="email" id="email" />
          </div>
          <div className="form-group">
            <label htmlFor="message">Mensaje</label>
            <textarea id="message" name="message"></textarea>
          </div>
          <div className="form-submit">
            <button type="submit">Enviar</button>
          </div>
        </form>
      </main>
    </>
  );
}
