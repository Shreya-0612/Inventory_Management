import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ListView = ({ inventories }) => {
  const baseUrl = "http://172.17.0.109:8000"; 
  const navigate = useNavigate();
  
  const [selectedProducts, setSelectedProducts] = useState(new Set());

  const handleCheckboxChange = (sku) => {
    setSelectedProducts((prevSelected) => {
      const newSelected = new Set(prevSelected);
      if (newSelected.has(sku)) {
        newSelected.delete(sku); 
      } else {
        newSelected.add(sku); 
      }
      return newSelected;
    });
  };

  return (
    <div className="overflow-x-auto text-[16px]">
      <table className="w-full bg-white border border-gray-200 ">
        <thead>
          <tr>
            <th className="py-2 px-6 border-b">Select</th>
            <th className="py-2 px-6 border-b">Image</th>
            <th className="py-2 px-6 border-b">Name</th>
            <th className="py-2 px-6 border-b">Description</th>
            <th className="py-2 px-6 border-b">SKU</th>
            <th className="py-2 px-6 border-b">Barcode</th>
            <th className="py-2 px-6 border-b">Price</th>
            <th className="py-2 px-6 border-b">Stock</th>
            <th className="py-2 px-6 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {inventories.map((inventory) => (
            <tr key={inventory.product_id}>
              <td className="py-2 px-6 border-b">
                <input 
                  type="checkbox" 
                  checked={selectedProducts.has(inventory.sku)} 
                  onChange={() => handleCheckboxChange(inventory.sku)} 
                />
              </td>
              <td className="py-2 px-6 border-b">
                <img 
                  src={`${baseUrl}${inventory.item_img}`} 
                  alt={inventory.name}
                  className="w-16 h-16 object-cover" 
                />
              </td>
              <td className="py-2 px-6 border-b">{inventory.name}</td>
              <td className="py-2 px-6 border-b">{inventory.description}</td>
              <td className="py-2 px-6 border-b">{inventory.sku}</td>
              <td className="py-2 px-6 border-b">{inventory.barcode}</td>
              <td className="py-2 px-6 border-b">{inventory.price}</td>
              <td className="py-2 px-6 border-b">{inventory.stock}</td>
              <td className="py-2 px-6 border-b">
                <button className="bg-gray-800 text-white rounded-lg p-2 font-bold"
                  onClick={(e) => {
                    e.stopPropagation(); 
                    navigate(`/dashboard/view-product/edit-options/${inventory.sku}`);
                  }}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListView;