export const AddressCard = ({ address, onSetDefault }) => {
  return (
    <div className="w-full max-w-sm rounded-lg border border-blue-500 shadow-sm mb-3">

      {/* Header */}
      <div className="bg-blue-600 text-white px-4 py-3 rounded-t-lg flex items-center justify-between">
        <span className="font-medium">{address.fullName}</span>
        <button className="bg-white text-blue-600 text-sm px-3 py-1 rounded hover:bg-gray-100 transition">
          Edit
        </button>
      </div>

      {/* Body */}
      <div className="p-4">
        <div><strong>Phone:</strong> {address.phone}</div>
        <hr className="my-2" />
        <div>{address.address1}</div>
        {address.address2 && <div>{address.address2}</div>}
        <div>{address.city}{address.state ? `, ${address.state}` : ""}</div>
        <div>{address.postal}, {address.country}</div>
        {address.notes && (
          <div className="mt-2 text-gray-500 text-sm">📝 {address.notes}</div>
        )}

        {!address.defaultAddress && (
          <button
            className="mt-3 w-full border border-blue-500 text-blue-600 py-2 rounded hover:bg-blue-50 transition"
            onClick={() => onSetDefault?.(address._id)}
          >
            Set as Default
          </button>
        )}

        {address.defaultAddress && (
          <div className="mt-3 text-center text-green-600 text-sm">
            ✅ Default Address
          </div>
        )}
      </div>

    </div>
  );
};
