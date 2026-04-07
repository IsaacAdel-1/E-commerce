import { useState, useEffect } from 'react';

const INITIAL_STATE = {
  label: 'Home',
  fullName: '',
  streetAddress: '',
  city: '',
  state: '',
  zipCode: '',
  country: '',
  phone: '',
  isDefault: false,
};

export const AddressForm = ({ display, close, onSave }) => {
  const [formData, setFormData] = useState(INITIAL_STATE);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const handleEsc = (e) => { if (e.keyCode === 27) close(); };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [close]);

  if (!display) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
  };

  const validate = () => {
    let newErrors = {};
    if (!formData.fullName.trim())      newErrors.fullName      = "Name is required";
    if (!formData.streetAddress.trim()) newErrors.streetAddress = "Address is required";
    if (!formData.phone.trim())         newErrors.phone         = "Phone is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    if (validate()) {
      onSave?.(formData);
      setFormData(INITIAL_STATE);
      close();
      
    }
  };

  const inputClass = (field) =>
    `w-full bg-gray-50 border rounded-lg px-4 py-3 text-sm outline-none transition-all ${
      errors[field] ? 'border-red-400' : 'border-gray-200 focus:border-blue-600'
    }`;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center p-4 z-50"
      style={{ background: 'rgba(0,0,0,0.4)' }}
      onClick={close}
    >
      <div
        className="bg-white w-full max-w-lg rounded-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center px-8 pt-8 pb-4">
          <h2 className="text-xl font-bold text-gray-800">Add Address</h2>
          <button onClick={close} className="text-gray-400 hover:text-gray-600 text-2xl leading-none">&times;</button>
        </div>

        <form className="px-8 pb-8 space-y-4" onSubmit={handleSubmit}>

          <div className="space-y-2">
            <label className="block text-xs font-bold text-gray-400 tracking-widest uppercase">Label</label>
            <div className="flex gap-2">
              {['Home', 'Work', 'Other'].map((l) => (
                <button
                  key={l}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, label: l }))}
                  className={`px-5 py-2 rounded-lg text-sm font-medium border transition-all ${
                    formData.label === l
                      ? 'bg-blue-700 border-blue-700 text-white'
                      : 'bg-white border-gray-200 text-gray-500 hover:border-blue-400'
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-bold text-gray-400 tracking-widest uppercase">Full Name</label>
            <input name="fullName" value={formData.fullName} onChange={handleChange} type="text" placeholder="John Doe" className={inputClass('fullName')} />
            {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-bold text-gray-400 tracking-widest uppercase">Street Address</label>
            <input name="streetAddress" value={formData.streetAddress} onChange={handleChange} type="text" placeholder="123 Main St, Apt 4B" className={inputClass('streetAddress')} />
            {errors.streetAddress && <p className="text-red-500 text-xs mt-1">{errors.streetAddress}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="block text-xs font-bold text-gray-400 tracking-widest uppercase">City</label>
              <input name="city" value={formData.city} onChange={handleChange} type="text" placeholder="Cairo" className={inputClass('city')} />
            </div>
            <div className="space-y-1">
              <label className="block text-xs font-bold text-gray-400 tracking-widest uppercase">State</label>
              <input name="state" value={formData.state} onChange={handleChange} type="text" placeholder="Giza" className={inputClass('state')} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="block text-xs font-bold text-gray-400 tracking-widest uppercase">Zip Code</label>
              <input name="zipCode" value={formData.zipCode} onChange={handleChange} type="text" placeholder="12345" className={inputClass('zipCode')} />
            </div>
            <div className="space-y-1">
              <label className="block text-xs font-bold text-gray-400 tracking-widest uppercase">Country</label>
              <input name="country" value={formData.country} onChange={handleChange} type="text" placeholder="Egypt" className={inputClass('country')} />
            </div>
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-bold text-gray-400 tracking-widest uppercase">Phone</label>
            <input name="phone" value={formData.phone} onChange={handleChange} type="tel" placeholder="+20 101 234 5678" className={inputClass('phone')} />
            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
          </div>

          <div className="flex items-center gap-3 py-1">
            <input name="isDefault" checked={formData.isDefault} onChange={handleChange} type="checkbox" id="isDefault" className="w-5 h-5 rounded border-gray-300 cursor-pointer accent-blue-700" />
            <label htmlFor="isDefault" className="text-sm text-gray-500 cursor-pointer select-none">Set as default address</label>
          </div>

          <div className="flex gap-4 pt-2">
            <button type="button" onClick={close} className="flex-1 py-3 border border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors text-sm">Cancel</button>
            <button type="submit" className="flex-1 py-3 bg-blue-700 text-white font-semibold rounded-xl hover:bg-blue-800 transition-all text-sm">Save Address</button>
          </div>

        </form>
      </div>
    </div>
  );
};
