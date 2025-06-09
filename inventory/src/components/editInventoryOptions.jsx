import React from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditOptions = () => {
    const navigate = useNavigate();
    const { sku } = useParams(); 
    const userRole = localStorage.getItem("user_role") || "default";

    const roleButtonAccess = {
        super_admin: ["update", "manage"],
        inventory_manager: ["update","manage"],
        warehouse_staff: ["manage"],
        default: [],
    }[userRole] || [];

    const handleUpdateProduct = () => {
        navigate(`/dashboard/view-product/edit-options/update-product/${sku}`);
    };
    const handleManageInventory = () => {
        navigate(`/dashboard/view-product/edit-options/manage-inventory/${sku}`);
    };

    return (
        <div className="max-w-md mx-auto bg-gray-200 shadow-xl rounded-lg overflow-hidden m-6 p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Edit Options</h2>
            <div className="flex space-x-2">
                {roleButtonAccess.includes("update") && (
                    <button 
                        className="bg-gray-700 text-white rounded-lg p-2 font-bold"
                        onClick={handleUpdateProduct}
                    >
                        Update Product
                    </button>
                )}
                {roleButtonAccess.includes("manage") && (
                    <button 
                        className="bg-gray-700 text-white rounded-lg p-2 font-bold"
                        onClick={handleManageInventory}
                    >
                        Manage Inventory
                    </button>
                )}
            </div>
        </div>
    );
};

export default EditOptions;