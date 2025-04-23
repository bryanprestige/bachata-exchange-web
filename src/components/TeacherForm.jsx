import { useState,useRef } from 'react';
import emailjs from '@emailjs/browser';

export default function TeacherForm() {
    const formRef = useRef();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    experience: '',
    level: '',
    customTopic: '',
    image: null,
    acceptedTerms: false,
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Required';
    if (!formData.email) newErrors.email = 'Required';
    if (!formData.experience) newErrors.experience = 'Required';
    if (!formData.level) newErrors.level = 'Required';
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
  
    emailjs.sendForm(`${import.meta.env.VITE_SERVICE_ID}` , `${import.meta.env.VITE_TEMPLATE_ID_TEACHER}`, formRef.current, `${import.meta.env.VITE_PUBLIC_KEY_EMAILJS}`)
      .then(() => {
        alert('Form sent successfully!');
        setFormData({
          name: '',
          email: '',
          experience: '',
          level: '',
          customTopic: '',
          image: null,
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
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
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
          name="experience"
          type="number"
          placeholder="Years of Experience"
          className="@apply p-3 rounded bg-gray-800 text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          value={formData.experience}
          onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
        />
        {errors.experience && <span className="text-red-400 text-sm">{errors.experience}</span>}

        <select
          name="level"
          className="@apply p-3 rounded bg-gray-800 text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          value={formData.level}
          onChange={(e) => setFormData({ ...formData, level: e.target.value })}
        >
          <option value="">Select Preferred Level</option>
          <option value="beginner">Beginner</option>
          <option value="improver">Improver</option>
          <option value="intermediate">Intermediate</option>
        </select>
        {errors.level && <span className="text-red-400 text-sm">{errors.level}</span>}

        <input
          name="customTopic"
          type="text"
          placeholder="Custom Class Name (optional)"
          className="@apply p-3 rounded bg-gray-800 text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          value={formData.customTopic}
          onChange={(e) => setFormData({ ...formData, customTopic: e.target.value })}
        />

        <input
          name="image"
          type="file"
          accept="image/*"
          className="@apply p-3 rounded bg-gray-800 text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
        />

        <label className="flex items-center gap-2 text-sm">
          <input
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
