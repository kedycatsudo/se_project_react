import { useState, useEffect } from 'react';
import ModalWithForm from './ModalWithForm';

export default function LoginModal({ isOpen, onClose, onLogin, activeModal }) {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    if (activeModal === 'login') {
      setForm({ email: '', password: '' });
      setFormErrors({});
    }
  }, [activeModal]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const errors = {};
    if (!form.email.trim()) errors.email = 'Email is required';
    if (!form.password) errors.password = 'Password is required';
    setFormErrors(errors);
    if (Object.keys(errors).length > 0) return;
    onLogin(form);
  }

  return (
    <ModalWithForm
      title="Sign In"
      buttonText="Login"
      activeModal={activeModal}
      onSubmit={handleSubmit}
      onClose={onClose}
      isOpen={isOpen}
    >
      <label className="modal__label">
        Email
        <input
          type="email"
          className="modal__input"
          name="email"
          required
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />
        {formErrors.email && <span>{formErrors.email}</span>}
      </label>
      <label className="modal__label">
        Password
        <input
          type="password"
          className="modal__input"
          name="password"
          required
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
        />
        {formErrors.password && <span>{formErrors.password}</span>}
      </label>
    </ModalWithForm>
  );
}
