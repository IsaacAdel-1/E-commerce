import { useState } from 'react';
import { Set_Address } from '../../../Services/constants';

const INITIAL_STATE = {
  fullName: "",
  phone: "",
  address1: "",
  address2: "",
  city: "",
  state: "",
  postal: "",
  country: "",
  notes: "",
  defaultAddress: false,
};

export const AddressForm = ({ display, close, onSave }) => {
  // ✅ الـ hooks فوق الـ early return دايمًا
  const [addressData, setAddressData] = useState(INITIAL_STATE);
  const [loading, setLoading]         = useState(false);
  const [error, setError]             = useState("");

  if (!display) return null;

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setAddressData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleReset = () => {
    setAddressData(INITIAL_STATE);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // ✅ أول سطر دايمًا
    setLoading(true);
    setError("");

    try {
      // ✅ لو عندك auth token فعّل السطر ده
      // const token = localStorage.getItem('token');

      const response = await fetch(Set_Address, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(addressData),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.message || `Server error: ${response.status}`);
      }

      handleReset();   // نضّف الفورم
      onSave?.();      // ✅ يعمل refresh للـ list في الـ parent
      close();         // ✅ يقفل الـ modal
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="AddressFormContainer" onClick={close}>
      <form
        className="address-card"
        autoComplete="on"
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
      >
        <h2>Address Information</h2>
        <h4>Please enter your complete address details</h4>

        {/* ✅ عرض الـ error للـ user */}
        {error && <p className="form-error" role="alert">{error}</p>}

        <div className="form-grid">

          <div className="form-group fullName">
            <label htmlFor="fullName">Full name</label>
            <input
              id="fullName" name="fullName" type="text"
              placeholder="John Doe" required
              value={addressData.fullName}
              onChange={handleChange}
            />
          </div>

          <div className="form-group phoneNumber">
            <label htmlFor="phone">Phone number</label>
            <input
              id="phone" name="phone" type="tel"
              placeholder="+1 555 555 555" required
              value={addressData.phone}
              onChange={handleChange}
            />
          </div>

          <div className="form-group full-width">
            <label htmlFor="address1">Address line 1</label>
            <input
              id="address1" name="address1" type="text"
              placeholder="Street address, P.O. box, company name" required
              value={addressData.address1}
              onChange={handleChange}
            />
          </div>

          <div className="form-group full-width">
            <label htmlFor="address2">Address line 2</label>
            <input
              id="address2" name="address2" type="text"
              placeholder="Apartment, suite, unit (optional)"
              value={addressData.address2}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="city">City</label>
            <input
              id="city" name="city" type="text"
              placeholder="Cairo" required
              value={addressData.city}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="state">State / Province / Region</label>
            <input
              id="state" name="state" type="text"
              placeholder="Giza"
              value={addressData.state}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="postal">ZIP / Postal code</label>
            <input
              id="postal" name="postal" type="text"
              placeholder="12345" required
              value={addressData.postal}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="country">Country</label>
            <select
              id="country" name="country" required
              value={addressData.country}
              onChange={handleChange}
            >
              <option value="">Select country</option>
              <option value="Egypt">Egypt</option>
              <option value="United States">United States</option>
              <option value="United Kingdom">United Kingdom</option>
              <option value="Saudi Arabia">Saudi Arabia</option>
              <option value="United Arab Emirates">United Arab Emirates</option>
            </select>
          </div>

          <div className="form-group full-width">
            <label htmlFor="notes">Delivery notes</label>
            <textarea
              id="notes" name="notes"
              placeholder="Leave gate code, delivery instructions, etc. (optional)"
              value={addressData.notes}
              onChange={handleChange}
            />
          </div>

        </div>

        <div className="actions">
          <label style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
            <input
              type="checkbox" name="defaultAddress"
              checked={addressData.defaultAddress}
              onChange={handleChange}
            />
            Set as default address
          </label>

          <div>
            {/* ✅ type="button" عشان ميعملش submit */}
            <button type="button" className="btn secondary" onClick={handleReset}>
              Reset
            </button>
            <button type="submit" className="btn" disabled={loading}>
              {loading ? "Saving..." : "Save Address"}
            </button>
          </div>
        </div>

      </form>
    </div>
  );
};
