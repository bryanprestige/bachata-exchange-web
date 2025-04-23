import { useState,useRef } from 'react';
import emailjs from '@emailjs/browser';

export default function VolunteerForm() {
  const formRef = useRef();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    acceptedTerms: false,
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Required';
    if (!formData.email) newErrors.email = 'Required';
    if (!formData.phoneNumber) newErrors.phoneNumber = 'To be added to the whatsapp group'
    if (!formData.message) newErrors.message = 'Please tell us why you want to help';
    if (!formData.acceptedTerms) newErrors.acceptedTerms = 'You must accept the terms';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
  
    emailjs.sendForm(`${import.meta.env.VITE_SERVICE_ID}`, `${import.meta.env.VITE_TEMPLATE_ID_VOLUNTEER}`, formRef.current, `${import.meta.env.VITE_PUBLIC_KEY_EMAILJS}`)
      .then(() => {
        alert('Form sent successfully!');
        setFormData({
          name: '',
          email: '',
          phoneNumber: '',
          message: '',
          acceptedTerms: false,
        });
        formRef.current.reset();
      })
      .catch((error) => {
        console.error('EmailJS Error:', error);
        alert('There was an error sending the form.');
      });
  };

  return (
    <>
      <p className="text-sm text-yellow-300 mb-4">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Volunteering helps us make this community stronger and more inclusive.
      </p>
      <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-4" encType="multipart/form-data">
        <input
          name="name"
          type="text"
          placeholder="Full Name"
          className="@apply p-3 rounded bg-gray-800 text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        {errors.name && <span className="text-red-400 text-sm">{errors.name}</span>}

        <input
          name="email"
          type="email"
          placeholder="Email"
          className="@apply p-3 rounded bg-gray-800 text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        {errors.email && <span className="text-red-400 text-sm">{errors.email}</span>}
        <input
        name="phoneNumber"
        type='tel'
        placeholder='Phone Number with prefix'
        className="@apply p-3 rounded bg-gray-800 text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
        value={formData.phoneNumber}
        onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
        ></input>
        <textarea
          name="message"
          placeholder="Why do you want to volunteer? Any skills that could help BE?"
          className="@apply p-3 rounded bg-gray-800 text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
        />
        {errors.message && <span className="text-red-400 text-sm">{errors.message}</span>}

        <label className="flex items-center gap-2 text-sm">
          <input
            name="acceptedTerms"
            type="checkbox"
            checked={formData.acceptedTerms}
            onChange={(e) => setFormData({ ...formData, acceptedTerms: e.target.checked })}
          />
          I have read and accept the conditions above.
        </label>
        {errors.acceptedTerms && <span className="text-red-400 text-sm">{errors.acceptedTerms}</span>}

        <button type="submit" className="bg-yellow-500 text-gray-800 px-4 py-2 rounded hover:bg-yellow-300">
          Submit Application
        </button>
      </form>
    </>
  );
}
