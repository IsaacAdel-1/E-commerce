import React from "react";
import { FiEdit2, FiTrash2, FiHome, FiBriefcase } from "react-icons/fi";

export const AddressCard = ({ address, onSetDefault, onEdit, onDelete }) => {
  const isHome = address.type === "home";

  return (
    <div className="bg-white rounded-[24px] border border-gray-100 shadow-[0_10px_30px_rgba(0,0,0,0.04)] p-6 font-['Segoe_UI',sans-serif] relative transition-all hover:shadow-[0_10px_40px_rgba(0,0,0,0.07)]">
      
      {/* Header Section */}
      <div className="flex items-start justify-between mb-5">
        <div className="flex items-center gap-4">
          {/* Icon Box */}
          <div className="w-14 h-14 bg-[#f0f4ff] rounded-[18px] flex items-center justify-center shrink-0">
            {isHome ? (
              <FiHome className="text-[#2041e3] text-2xl" />
            ) : (
              <FiBriefcase className="text-[#2041e3] text-2xl" />
            )}
          </div>
          
          {/* Tags & Name */}
          <div className="flex flex-col gap-1">
            <div className="flex gap-2">
              <span className="text-[10px] font-bold text-[#2041e3] bg-[#f0f4ff] px-3 py-1 rounded-full uppercase tracking-wider">
                {address.type || "Home"}
              </span>
              {address.defaultAddress && (
                <span className="text-[10px] font-bold text-white bg-[#2041e3] px-3 py-1 rounded-full uppercase tracking-wider">
                  Default
                </span>
              )}
            </div>
            <h3 className="text-[#1a1a2e] font-bold text-[18px]">{address.fullName}</h3>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button 
            onClick={() => onEdit?.(address)}
            className="p-2 text-[#5c5c8a] hover:text-[#2041e3] transition-colors"
          >
            <FiEdit2 size={18} />
          </button>
          <button 
            onClick={() => onDelete?.(address._id)}
            className="p-2 text-[#e53e3e]/70 hover:text-[#e53e3e] transition-colors"
          >
            <FiTrash2 size={18} />
          </button>
        </div>
      </div>

      <div className="h-[1px] bg-[#f0f0f8] w-full mb-5" />

      {/* Address Details */}
      <div className="space-y-4">
        <div>
          <span className="text-[11px] font-bold text-[#aaaacc] tracking-[0.1em] uppercase block mb-1">
            Address
          </span>
          <div className="text-[#555577] text-[14px] leading-relaxed">
            <p>{address.address1}</p>
            <p>
              {address.city}
              {address.state ? `, ${address.state}` : ""} {address.postal}
            </p>
            <p>{address.country}</p>
          </div>
        </div>

        {/* Phone Section */}
        {address.phone && (
          <div>
            <span className="text-[11px] font-bold text-[#aaaacc] tracking-[0.1em] uppercase block mb-1">
              Phone
            </span>
            <p className="text-[#555577] text-[14px]">{address.phone}</p>
          </div>
        )}
      </div>

      {/* Set Default Button (Only if not default) */}
      {!address.defaultAddress && (
        <button 
          onClick={() => onSetDefault?.(address._id)}
          className="mt-6 w-full py-2.5 border-[1.5px] border-[#2041e3] text-[#2041e3] font-bold text-sm rounded-xl hover:bg-[#f0f4ff] transition-all"
        >
          Set as Default
        </button>
      )}
    </div>
  );
};

export default AddressCard;