import { useState } from 'react';

import Box3D from "@/app/components/Box3D";

// Định nghĩa kiểu cho formData và errors
interface FormData {
  quantity: string;
  length: string;
  width: string;
  height: string;
  weight: string;
  date: string;
  yourName: string;
  businessName: string;
  address: string;
}

interface Errors {
  quantity: string;
  length: string;
  width: string;
  height: string;
  weight: string;
  date: string;
  yourName: string;
  businessName: string;
  address: string;
}

export default function OrderForm() {
  const [formData, setFormData] = useState<FormData>({
    quantity: '',
    length: '',
    width: '',
    height: '',
    weight: '',
    date: '',
    yourName: '',
    businessName: '',
    address: '',
  });

  const [errors, setErrors] = useState<Errors>({
    quantity: '',
    length: '',
    width: '',
    height: '',
    weight: '',
    date: '',
    yourName: '',
    businessName: '',
    address: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false); // State to track form submission

  const validate = (name: keyof FormData, value: string) => {
    let error = '';

    if (['quantity', 'length', 'width', 'height', 'weight', 'date'].includes(name) && !value) {
      error = `${name} is required.`;
    }

    if (name === 'length' && value && formData.width && parseInt(value) >= 1200 && parseInt(formData.width) >= 1200) {
      error = 'If the length is >= 1200mm, the width must be < 1200mm.';
    }

    if (name === 'width' && value && formData.length && parseInt(value) >= 1200 && parseInt(formData.length) >= 1200) {
      error = 'If the width is >= 1200mm, the length must be < 1200mm.';
    }

    if (name === 'height') {
      const length = parseInt(formData.length);
      const width = parseInt(formData.width);
      const height = parseInt(value);

      if ((length >= 1200 || width >= 1200) && height > 1200) {
        error = 'If either the length or width is >= 1200mm, the height must be <= 1200mm.';
      } else if (length <= 1200 && width <= 1200 && height > 2400) {
        error = 'If both the length and width are <= 1200mm, the height must be <= 2400mm.';
      }
    }

    return error;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newValue = ['weight', 'quantity'].includes(name) ? parseInt(value) || '' : value;

    const error = validate(name as keyof FormData, newValue.toString());

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: newValue,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Errors = { quantity: '', length: '', width: '', height: '', weight: '', date: '', yourName: '', businessName: '', address: '' };
    let hasError = false;

    Object.entries(formData).forEach(([name, value]) => {
      const error = validate(name as keyof FormData, value);
      if (error) hasError = true;
      newErrors[name as keyof FormData] = error;
    });

    setErrors(newErrors);

    if (!hasError) {
      setIsSubmitting(true); // Set submitting to true when form is submitted

      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ formData }),
      });

      setIsSubmitting(false); // Reset submitting state

      if (res.ok) {
        alert('Form submitted successfully!');
        setFormData({
          quantity: '',
          length: '',
          width: '',
          height: '',
          weight: '',
          date: '',
          yourName: '',
          businessName: '',
          address: '',
        });
      } else {
        alert('Failed to submit form.');
      }
    } else {
      alert('Please fix the validation errors before submitting.');
    }
  };

  return (
          <div className="flex justify-center items-center">
            <div className="flex w-full max-w-4xl bg-white p-8 rounded-lg shadow-md">
              <div className="flex-1 mb-8 lg:mb-0 lg:mr-8">
                <h3 className="text-xl font-semibold text-center mb-4">Demo Box</h3>
                <Box3D width={formData.width} height={formData.height} length={formData.length} />
              </div>

              <div className="w-1/3 p-4 border-l-2 border-gray-200">
                <h3 className="text-xl font-semibold text-center mb-4">Order Information</h3>
                <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                  {['quantity', 'length', 'width', 'height', 'weight', 'date'].map((field) => (
                          <div key={field}>
                            <label className="font-semibold capitalize">
                              {field.replace(/([A-Z])/g, ' $1')} *
                            </label>
                            <input
                                    type={field === 'date' ? 'date' : 'text'}
                                    name={field}
                                    value={formData[field as keyof FormData]}
                                    onChange={handleChange}
                                    className={`border p-2 rounded-md w-full ${errors[field as keyof Errors] ? 'border-red-500' : 'border-gray-300'}`}
                            />
                            {errors[field as keyof Errors] && <p className="text-red-500 text-sm">{errors[field as keyof Errors]}</p>}
                          </div>
                  ))}

                  <div>
                    <label className="font-semibold">Your Name</label>
                    <input
                            type="text"
                            name="yourName"
                            value={formData.yourName}
                            onChange={handleChange}
                            className={`border p-2 rounded-md w-full ${errors.yourName ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.yourName && <p className="text-red-500 text-sm">{errors.yourName}</p>}
                  </div>

                  <div>
                    <label className="font-semibold">Business Name</label>
                    <input
                            type="text"
                            name="businessName"
                            value={formData.businessName}
                            onChange={handleChange}
                            className={`border p-2 rounded-md w-full ${errors.businessName ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.businessName && <p className="text-red-500 text-sm">{errors.businessName}</p>}
                  </div>

                  <div>
                    <label className="font-semibold">Address</label>
                    <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            className={`border p-2 rounded-md w-full ${errors.address ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
                  </div>

                  <button
                          type="submit"
                          className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition"
                          disabled={Object.values(errors).some((err) => err) || isSubmitting}
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit'}
                  </button>
                </form>
              </div>
            </div>
          </div>
  );
}
