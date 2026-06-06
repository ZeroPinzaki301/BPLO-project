import React, { useState, useRef } from "react";
import axiosInstance from "../../utils/axiosInstance";
import GenBG from '../assets/images/GeneralBG.png';
import BrgyCertificateTemplate from "../components/BarangayCertificateTemplate";
import PrintModal from "../components/PrintModal";

const barangays = [
  "Banaban", "Baybay", "Binagbag", "Donacion", "Encanto", "Laog", "Marungko",
  "Niugan", "Paltok", "Pulong Yantok", "San Roque", "Santa Cruz", "Sta Lucia",
  "Sto Cristo", "Sulucan", "Taboc",
];

function CreatePage() {
  const today = new Date().toISOString().split("T")[0];
  const certificateRef = useRef(null);

  const [formData, setFormData] = useState({
    ownerName: "",
    businessName: "",
    businessType: "",
    barangay: "",
    orNumber: "",
    ctcNumber: "",
    status: "",
    issueDate: today,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSaveData = async () => {
    try {
      setIsProcessing(true);
      const res = await axiosInstance.post("/brgy-business", formData);
      alert("Business saved successfully!");
      console.log(res.data);
      return true;
    } catch (err) {
      alert("Error saving business: " + (err.response?.data?.error || err.message));
      return false;
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePrint = () => {
    if (!certificateRef.current) {
      console.error("No certificate ref found");
      return;
    }

    const element = certificateRef.current;
    
    // Create iframe for printing
    const iframe = document.createElement('iframe');
    iframe.style.position = 'fixed';
    iframe.style.right = '0';
    iframe.style.bottom = '0';
    iframe.style.width = '0';
    iframe.style.height = '0';
    iframe.style.border = '0';
    document.body.appendChild(iframe);
    
    // Copy all styles
    const styles = Array.from(document.querySelectorAll('style, link[rel="stylesheet"]'))
      .map(el => el.outerHTML)
      .join('');
    
    // Additional print styles
    const printStyles = `
      <style>
        @media print {
          @page {
            size: auto;
            margin: 0;
          }
          body {
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
        }
      </style>
    `;
    
    // Write to iframe
    iframe.contentDocument.open();
    iframe.contentDocument.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Business Certificate</title>
          ${styles}
          ${printStyles}
        </head>
        <body>
          ${element.outerHTML}
        </body>
      </html>
    `);
    iframe.contentDocument.close();
    
    // Wait for iframe to load and print
    iframe.onload = function() {
      setTimeout(() => {
        iframe.contentWindow.focus();
        iframe.contentWindow.print();
        
        // Clean up
        setTimeout(() => {
          document.body.removeChild(iframe);
        }, 1000);
      }, 500);
    };
  };

  // Handle print only
  const handlePrintOnly = () => {
    setIsProcessing(true);
    try {
      handlePrint();
    } finally {
      setTimeout(() => {
        setIsProcessing(false);
        setIsModalOpen(false);
      }, 1000);
    }
  };

  // Handle save only
  const handleSaveOnly = async () => {
    const success = await handleSaveData();
    if (success) {
      setIsModalOpen(false);
    }
  };

  // Handle print and save
  const handlePrintAndSave = async () => {
    setIsProcessing(true);
    try {
      // First save the data
      const success = await handleSaveData();
      if (success) {
        // Then print
        handlePrint();
        // Close modal after a delay
        setTimeout(() => {
          setIsModalOpen(false);
        }, 2000);
      }
    } finally {
      setIsProcessing(false);
    }
  };

  const handleOpenModal = () => {
    // Check if all required fields are filled
    if (!formData.ownerName || !formData.businessName || !formData.barangay || !formData.orNumber || !formData.status) {
      alert("Please fill in all required fields before proceeding.");
      return;
    }
    setIsModalOpen(true);
  };

  return (
    <div
      className="flex bg-cover bg-center min-h-screen bg-blue-50 p-6"
      style={{ backgroundImage: `url(${GenBG})` }}
    >
      {/* Left side - Form */}
      <div className="w-1/2 pr-4">
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center">
            Create Business
          </h2>
          <form onSubmit={(e) => { e.preventDefault(); handleOpenModal(); }} className="space-y-1">
            <label className="block font-semibold text-[.8em] text-blue-900">Owner's Name *</label>
            <input
              type="text"
              name="ownerName"
              placeholder="e.g. Juan Dela Cruz"
              value={formData.ownerName}
              onChange={handleChange}
              required
              className="w-full border border-yellow-400 rounded-md p-2 focus:ring-2 focus:ring-blue-400"
            />

            <label className="block font-semibold text-[.8em] text-blue-900">Business Name *</label>
            <input
              type="text"
              name="businessName"
              placeholder="e.g. Dela Cruz Sari-Sari Store"
              value={formData.businessName}
              onChange={handleChange}
              required
              className="w-full border border-yellow-400 rounded-md p-2 focus:ring-2 focus:ring-blue-400"
            />

            <label className="block font-semibold text-[.8em] text-blue-900">Business Type *</label>
            <input
              type="text"
              name="businessType"
              placeholder="e.g. Retail"
              value={formData.businessType}
              onChange={handleChange}
              required
              className="w-full border border-yellow-400 rounded-md p-2 focus:ring-2 focus:ring-blue-400"
            />

            <label className="block font-semibold text-[.8em] text-blue-900">Barangay *</label>
            <select
              name="barangay"
              value={formData.barangay}
              onChange={handleChange}
              required
              className="w-full border border-yellow-400 rounded-md p-2 focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Select Barangay</option>
              {barangays.map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>

            <label className="block font-semibold text-[.8em] text-blue-900">OR Number *</label>
            <input
              type="text"
              name="orNumber"
              placeholder="e.g. 657123"
              value={formData.orNumber}
              onChange={handleChange}
              required
              className="w-full border border-yellow-400 rounded-md p-2 focus:ring-2 focus:ring-blue-400"
            />

            <label className="block font-semibold text-[.8em] text-blue-900">CTC Number (optional)</label>
            <input
              type="text"
              name="ctcNumber"
              placeholder="e.g. 213456"
              value={formData.ctcNumber}
              onChange={handleChange}
              className="w-full border border-yellow-400 rounded-md p-2 focus:ring-2 focus:ring-blue-400"
            />

            <label className="block font-semibold text-[.8em] text-blue-900">Status *</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
              className="w-full border border-yellow-400 rounded-md p-2 focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Select Status</option>
              <option value="new">New</option>
              <option value="renewal">Renewal</option>
            </select>

            <label className="block font-semibold text-[.8em] text-blue-900">Issue Date *</label>
            <input
              type="date"
              name="issueDate"
              value={formData.issueDate}
              onChange={handleChange}
              required
              className="w-full border border-yellow-400 rounded-md p-2 focus:ring-2 focus:ring-blue-400"
            />

            <button
              type="submit"
              className="w-full cursor-pointer bg-yellow-400 text-blue-900 mt-[.5em] font-semibold py-2 rounded-md hover:bg-yellow-500 transition-colors"
            >
              Preview & Continue
            </button>
          </form>
        </div>
      </div>

      {/* Right side - Certificate Preview */}
      <div className="w-[60em] pl-4">
        <div className="bg-white shadow-lg rounded-lg p-4">
          <h2 className="text-xl font-bold text-blue-700 mb-4 text-center">
            Certificate Preview
          </h2>
          
          {/* Certificate Template with dynamic barangay */}
          <BrgyCertificateTemplate
            ref={certificateRef}
            ownerName={formData.ownerName}
            businessName={formData.businessName}
            businessType={formData.businessType}
            barangay={formData.barangay}
            orNumber={formData.orNumber}
            ctcNumber={formData.ctcNumber}
            status={formData.status}
            date={formData.issueDate}
          />
        </div>
      </div>

      {/* Print Modal */}
      <PrintModal
        isOpen={isModalOpen}
        onClose={() => !isProcessing && setIsModalOpen(false)}
        isProcessing={isProcessing}
        actions={[
          {
            label: "Print Only",
            onClick: handlePrintOnly,
            className: "bg-blue-600 hover:bg-blue-700 text-white"
          },
          {
            label: "Save Only",
            onClick: handleSaveOnly,
            className: "bg-green-600 hover:bg-green-700 text-white"
          },
          {
            label: "Print & Save",
            onClick: handlePrintAndSave,
            className: "bg-purple-600 hover:bg-purple-700 text-white"
          }
        ]}
      >
        {/* Render certificate preview in modal */}
        <BrgyCertificateTemplate
          ownerName={formData.ownerName}
          businessName={formData.businessName}
          businessType={formData.businessType}
          barangay={formData.barangay}
          orNumber={formData.orNumber}
          ctcNumber={formData.ctcNumber}
          status={formData.status}
          date={formData.issueDate}
        />
      </PrintModal>
    </div>
  );
}

export default CreatePage;