import React, { useState, useEffect } from "react";

const EditModal = ({ isOpen, onClose, onSave, entry }) => {
  const [formData, setFormData] = useState({
    name: "",
    startTime: "",
    finishTime: "",
    totalTime: "",
    systemUsage: "",
    idleTime: "",
    productiveTime: "",
    productivity: 0,
    screenshots: 0
  });

  // Populate fields when an entry is provided
  useEffect(() => {
    if (entry) {
      setFormData(entry);
    }
  }, [entry]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSliderChange = (e) => {
    setFormData({ ...formData, productivity: parseInt(e.target.value, 10) });
  };

  const handleSave = () => {
    onSave(formData); // Save updated data
    onClose(); // Close modal
  };

  if (!isOpen) return null; // Do not render if modal is not open

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Edit Employee Entry</h2>
        
        {/* Name */}
        <div className="mb-3">
          <label className="block text-gray-700 text-sm font-medium mb-1">Employee Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Time Fields */}
        {["startTime", "finishTime", "totalTime", "systemUsage", "idleTime", "productiveTime"].map((key) => (
          <div key={key} className="mb-3">
            <label className="block text-gray-700 text-sm font-medium mb-1">{formatLabel(key)}</label>
            <input
              type="text"
              name={key}
              value={formData[key]}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        ))}

        {/* Productivity (Slider) */}
        <div className="mb-3">
          <label className="block text-gray-700 text-sm font-medium mb-1">Productivity</label>
          <input
            type="range"
            name="productivity"
            min="0"
            max="100"
            value={formData.productivity}
            onChange={handleSliderChange}
            className="w-full"
          />
          <span className="block text-center mt-1">{formData.productivity}%</span>
        </div>

        {/* Screenshots */}
        <div className="mb-3">
          <label className="block text-gray-700 text-sm font-medium mb-1">Screenshots</label>
          <input
            type="number"
            name="screenshots"
            value={formData.screenshots}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 mt-4">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400">Cancel</button>
          <button onClick={handleSave} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Save</button>
        </div>
      </div>
    </div>
  );
};

// Helper function to format labels
const formatLabel = (key) => {
  return key
    .replace(/([A-Z])/g, " $1") // Add space before capital letters
    .replace(/^./, (str) => str.toUpperCase()); // Capitalize first letter
};

export default EditModal;
