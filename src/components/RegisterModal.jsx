import { useState, useEffect } from 'react';
import ModalWithForm from './ModalWithForm';

export default function RegisterModal({
  isOpen,
  onClose,
  onRegister,
  activeModal,
  onSwitchAuthModal,
}) {
  const [form, setForm] = useState({
    name: '',
    avatar: '',
    email: '',
    password: '',
  });
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    if (activeModal === 'register') {
      setForm({ name: '', avatar: '', email: '', password: '' });
      setFormErrors({});
    }
  }, [activeModal]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const errors = {};
    if (!form.name.trim()) errors.name = 'Name is required';
    if (!form.avatar.trim()) errors.avatar = 'Avatar URL is required';
    if (!form.email.trim()) errors.email = 'Email is required';
    if (!form.password) errors.password = 'Password is required';
    setFormErrors(errors);
    if (Object.keys(errors).length > 0) return;
    onRegister(form);
  }

  return (
    <ModalWithForm
      title="Sign Up"
      buttonText="Sign Up"
      activeModal={activeModal}
      onSubmit={handleSubmit}
      onClose={onClose}
      isOpen={isOpen}
    >
      <label className="modal__label">
        Name
        <input
          type="text"
          className="modal__input"
          name="name"
          required
          placeholder="Your name"
          value={form.name}
          onChange={handleChange}
        />
        {formErrors.name && <span>{formErrors.name}</span>}
      </label>
      <label className="modal__label">
        Avatar URL
        <input
          type="url"
          className="modal__input"
          name="avatar"
          required
          placeholder="Avatar URL"
          value={form.avatar}
          onChange={handleChange}
        />
        {formErrors.avatar && <span>{formErrors.avatar}</span>}
      </label>
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
      <button
        type="button"
        className="modal__switch-btn"
        onClick={() => onSwitchAuthModal('login')}
      >
        or Log in
      </button>
    </ModalWithForm>
  );
}
