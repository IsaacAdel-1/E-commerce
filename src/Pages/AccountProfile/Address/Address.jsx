import './Address.css';
import { useEffect, useState, useCallback } from 'react';
import { Get_Address } from '../../../Services/constants';
import { AddressForm } from './AddressForm';
import { AddressCard } from './AddressCard';

const Address = () => {
  const [displayForm, setDisplayForm] = useState(false);
  const [addresses, setAddresses]     = useState([]);
  const [error, setError]             = useState("");
  const [loading, setLoading]         = useState(true);

  // ✅ useCallback عشان مش يتعمل recreate في كل render
  const fetchAddresses = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      // ✅ لو عندك auth token فعّل السطر ده
      // const token = localStorage.getItem('token');

      const response = await fetch(Get_Address, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error(`Server error: ${response.status}`);

      const data = await response.json();

      if (Array.isArray(data)) {
        setAddresses(data);
      } else {
        setAddresses([]);
        setError(data?.error || "Failed to load addresses.");
      }
    } catch (err) {
      console.error("fetchAddresses error:", err.message);
      setAddresses([]);
      setError("Could not load addresses. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAddresses();
  }, [fetchAddresses]);

  return (
    <>
      {/* ✅ onSave بيعمل refresh للـ list أوتوماتيك بعد الحفظ */}
      <AddressForm
        display={displayForm}
        close={() => setDisplayForm(false)}
        onSave={fetchAddresses}
      />

      <div className="AddressContainer">
        <header>
          <h3>My Addresses</h3>
          <button className="+Address" onClick={() => setDisplayForm(true)}>
            + Add New Address
          </button>
        </header>

        <div className="AddressesDetails">
          {loading && <p>Loading addresses...</p>}

          {!loading && error && <h2 className="error-msg">{error}</h2>}

          {!loading && !error && addresses.length === 0 && (
            <p>No addresses yet. Add your first address!</p>
          )}

          {/* ✅ key prop موجود — ✅ اسم الفيلد postal متطابق */}
          {!loading && addresses.map((address) => (
            <AddressCard
              key={address._id}
              address={address}
              onSetDefault={(id) => {
                // TODO: اربط بـ API لتعيين العنوان الافتراضي
                console.log("Set default:", id);
              }}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Address;
