import './Address.css';
import { useEffect, useState, useCallback } from 'react';
import { Get_Address } from '../../../Services/constants';
import  {AddressForm}  from './AddressForm';
import AddressCard  from './AddressCard';

const Address = () => {
  const [displayForm, setDisplayForm] = useState(false);
  const [addresses, setAddresses] = useState([
  {
    _id: "1",
    fullName: "Isaac Adel",
    phone: "+20 101 234 5678",
    address1: "123 Tahrir Square",
    address2: "Apt 4B",
    city: "Cairo",
    state: "Cairo Governorate",
    postal: "11511",
    country: "Egypt",
    notes: "Ring the bell twice",
    defaultAddress: true,
  },
  {
    _id: "2",
    fullName: "Isaac Adel",
    phone: "+20 112 345 6789",
    address1: "45 Corniche El Nil",
    address2: "",
    city: "Giza",
    state: "Giza Governorate",
    postal: "12511",
    country: "Egypt",
    notes: "",
    defaultAddress: false,
  },
  {
    _id: "3",
    fullName: "Isaac Adel",
    phone: "+20 100 987 6543",
    address1: "78 Alexandria Desert Road",
    address2: "Villa 12",
    city: "Alexandria",
    state: "Alexandria Governorate",
    postal: "21500",
    country: "Egypt",
    notes: "Call before delivery",
    defaultAddress: false,
  },
]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

 
const addNewAddress = (newAddressData) => {
    const finalAddress = {
      ...newAddressData,
      _id: Date.now().toString(), // توليد ID مؤقت
      defaultAddress: addresses.length === 0 // لو أول عنوان خليه default
    };
    
    setAddresses((prev) => [...prev, finalAddress]);
    setDisplayForm(false); // اقفل الفورم بعد الحفظ
  };

  return (
    <>
     
      <AddressForm
        display={displayForm}
        close={() => setDisplayForm(false)}
        onSave={addNewAddress}
      />

      <div className="AddressContainer">
        <header className='mb-6'>
          <h3 className='text-2xl font-semibold'>My Addresses</h3>
          <button className=" bg-[#1447e6]" onClick={() => setDisplayForm(true)}>
            + Add New Address
          </button>
        </header>

        <div className="AddressesDetails">
      

         
          { addresses.map((address) => (
            <AddressCard
                key={address._id}
                address={address}
                onSetDefault={(id) => {
                  setAddresses(prev => prev.map(addr => ({
                    ...addr,
                    defaultAddress: addr._id === id
                  })));
                }}
              
                onDelete={(id) => {
                  if(window.confirm("Are you sure you want to delete this address?")) {
                    setAddresses(prev => prev.filter(addr => addr._id !== id));
                  }
                }}
             
              />
          ))}
        </div>
      </div>
    </>
  );
};

export default Address;
