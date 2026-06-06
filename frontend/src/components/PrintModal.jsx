// Alternative: Updated PrintModal with custom action buttons
import React from "react";

export default function PrintModal({ 
  isOpen, 
  onClose, 
  children, 
  isProcessing = false,
  actions = [] // Accept custom actions
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded shadow-lg w-[90%] max-w-4xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Print Preview</h2>
          {!isProcessing && (
            <button
              onClick={onClose}
              className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400 text-sm"
            >
              Close
            </button>
          )}
        </div>
        <div className="border p-4 mb-6 max-h-[70vh] overflow-auto flex justify-center">
          {children}
        </div>
        
        {/* Custom Action Buttons */}
        {actions.length > 0 && (
          <div className="flex justify-center gap-4">
            {actions.map((action, index) => (
              <button
                key={index}
                onClick={action.onClick}
                disabled={isProcessing || action.disabled}
                className={`px-6 py-2 rounded ${isProcessing || action.disabled ? 'bg-gray-400 cursor-not-allowed' : action.className || 'bg-blue-600 hover:bg-blue-700 text-white'}`}
              >
                {action.label}
              </button>
            ))}
          </div>
        )}
        
        {isProcessing && (
          <div className="mt-4 text-center text-blue-600">
            Processing...
          </div>
        )}
      </div>
    </div>
  );
}