import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import GenBG from '../assets/images/GeneralBG.png';
import BrgyCertificateTemplate from "../components/BarangayCertificateTemplate";

const barangays = [
  "Banaban", "Baybay", "Binagbag", "Donacion", "Encanto", "Laog", "Marungko",
  "Niugan", "Paltok", "Pulong Yantok", "San Roque", "Santa Cruz", "Sta Lucia",
  "Sto Cristo", "Sulucan", "Taboc",
];

function EditBusinessPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const certificateRef = useRef(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [redirectTimer, setRedirectTimer] = useState(null);
  
  const [formData, setFormData] = useState({
    ownerName: "",
    businessName: "",
    businessType: "",
    barangay: "",
    orNumber: "",
    ctcNumber: "",
    status: "",
    issueDate: "",
  });

  useEffect(() => {
    fetchBusiness();
    
    // Cleanup timer on unmount
    return () => {
      if (redirectTimer) {
        clearTimeout(redirectTimer);
      }
    };
  }, [id]);

  const fetchBusiness = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(`/brgy-business/${id}`);
      const business = response.data;
      
      // Format date for input field (YYYY-MM-DD)
      const issueDate = new Date(business.issueDate).toISOString().split("T")[0];
      
      setFormData({
        ownerName: business.ownerName,
        businessName: business.businessName,
        businessType: business.businessType,
        barangay: business.barangay,
        orNumber: business.orNumber,
        ctcNumber: business.ctcNumber || "",
        status: business.status,
        issueDate: issueDate,
      });
      setError("");
    } catch (err) {
      setError("Failed to load business: " + (err.response?.data?.error || err.message));
      console.error("Error fetching business:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear success message when user starts editing
    if (success) setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.ownerName || !formData.businessName || !formData.barangay || !formData.orNumber || !formData.status) {
      setError("Please fill in all required fields.");
      return;
    }

    try {
      setSaving(true);
      setError("");
      
      // Prepare data for update
      const updateData = {
        ...formData,
        // Remove empty ctcNumber if not provided
        ctcNumber: formData.ctcNumber.trim() || undefined
      };
      
      const response = await axiosInstance.put(`/brgy-business/${id}`, updateData);
      console.log("Update successful:", response.data);
      
      setSuccess("Business updated successfully! Redirecting to business list...");
      
      const timer = setTimeout(() => {
        navigate('/find');
      }, 2000);
      
      setRedirectTimer(timer);
      
    } catch (err) {
      setError("Error updating business: " + (err.response?.data?.error || err.message));
      console.error("Error updating business:", err);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    if (window.confirm("Are you sure? All unsaved changes will be lost.")) {
      navigate('/find');
    }
  };

  if (loading) {
    return (
      <div 
        className="flex justify-center items-center min-h-screen bg-blue-50"
        style={{ backgroundImage: `url(${GenBG})` }}
      >
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700 mx-auto"></div>
          <p className="mt-4 text-blue-700">Loading business details...</p>
        </div>
      </div>
    );
  }

  if (error && !formData.ownerName) {
    return (
      <div 
        className="flex justify-center items-center min-h-screen bg-blue-50"
        style={{ backgroundImage: `url(${GenBG})` }}
      >
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-md text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
          <p className="text-gray-700 mb-6">{error}</p>
          <button
            onClick={() => navigate('/find')}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Go to Business List
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="flex bg-cover bg-center min-h-screen bg-blue-50 p-6"
      style={{ backgroundImage: `url(${GenBG})` }}
    >
      <div className="w-full max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-blue-800 text-center">
            Edit Business Certificate
          </h1>
          <p className="text-center text-blue-600 mt-2">
            Update business certificate information
          </p>
        </div>

        {/* Status Messages */}
        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center">
              <span className="text-red-600 mr-2">⚠️</span>
              <p className="text-red-700">{error}</p>
            </div>
          </div>
        )}

        {success && (
          <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center">
              <span className="text-green-600 mr-2">✅</span>
              <div>
                <p className="text-green-700 font-medium">{success}</p>
                <p className="text-green-600 text-sm mt-1">
                  You will be redirected to the business list in 2 seconds...
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-[35%_65%] gap-6">
          {/* Left side - Edit Form (35%) */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-blue-700">
                Edit Details
              </h2>
              <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-semibold">
                Editing Mode
              </span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block font-semibold text-[.8em] text-blue-900">
                  Owner's Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="ownerName"
                  placeholder="e.g. Juan Dela Cruz"
                  value={formData.ownerName}
                  onChange={handleChange}
                  required
                  className="w-full border border-yellow-400 rounded-md p-2 focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                />
              </div>

              <div>
                <label className="block font-semibold text-[.8em] text-blue-900">
                  Business Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="businessName"
                  placeholder="e.g. Dela Cruz Sari-Sari Store"
                  value={formData.businessName}
                  onChange={handleChange}
                  required
                  className="w-full border border-yellow-400 rounded-md p-2 focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                />
              </div>

              <div>
                <label className="block font-semibold text-[.8em] text-blue-900">
                  Business Type <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="businessType"
                  placeholder="e.g. Retail"
                  value={formData.businessType}
                  onChange={handleChange}
                  required
                  className="w-full border border-yellow-400 rounded-md p-2 focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                />
              </div>

              <div>
                <label className="block font-semibold text-[.8em] text-blue-900">
                  Barangay <span className="text-red-500">*</span>
                </label>
                <select
                  name="barangay"
                  value={formData.barangay}
                  onChange={handleChange}
                  required
                  className="w-full border border-yellow-400 rounded-md p-2 focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                >
                  <option value="">Select Barangay</option>
                  {barangays.map((b) => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-[.8em] text-blue-900">
                  OR Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="orNumber"
                  placeholder="e.g. 657123"
                  value={formData.orNumber}
                  onChange={handleChange}
                  required
                  className="w-full border border-yellow-400 rounded-md p-2 focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                />
              </div>

              <div>
                <label className="block font-semibold text-[.8em] text-blue-900">
                  CTC Number (optional)
                </label>
                <input
                  type="text"
                  name="ctcNumber"
                  placeholder="e.g. 213456"
                  value={formData.ctcNumber}
                  onChange={handleChange}
                  className="w-full border border-yellow-400 rounded-md p-2 focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                />
              </div>

              <div>
                <label className="block font-semibold text-[.8em] text-blue-900">
                  Status <span className="text-red-500">*</span>
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  required
                  className="w-full border border-yellow-400 rounded-md p-2 focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                >
                  <option value="">Select Status</option>
                  <option value="new">New</option>
                  <option value="renewal">Renewal</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-[.8em] text-blue-900">
                  Issue Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="issueDate"
                  value={formData.issueDate}
                  onChange={handleChange}
                  required
                  className="w-full border border-yellow-400 rounded-md p-2 focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 pt-6 mt-6 border-t">
                <button
                  type="button"
                  onClick={handleCancel}
                  disabled={saving}
                  className="cursor-pointer flex-1 px-4 py-2.5 bg-gray-300 text-gray-800 font-semibold rounded-md hover:bg-gray-400 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <span>←</span>
                  <span>Cancel</span>
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 px-4 cursor-pointer py-2.5 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {saving ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <span>Save Changes</span>
                    </>
                  )}
                </button>
              </div>

              {/* Edit Tips */}
              <div className="mt-6 pt-6 border-t">
                <h3 className="font-semibold text-blue-900 mb-2 flex items-center">
                  <span className="mr-2">💡</span> Editing Tips
                </h3>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• All fields marked with <span className="text-red-500">*</span> are required</li>
                  <li>• After saving, you'll be redirected to the business list</li>
                  <li>• Print preview updates in real-time as you edit</li>
                  <li>• Use "Cancel" to discard changes and go back to business list</li>
                </ul>
              </div>
            </form>
          </div>

          {/* Right side - Certificate Preview (65%) */}
          <div className="bg-white shadow-lg rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-blue-700">
                Live Preview
              </h2>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">
                  {formData.barangay || "Select barangay"} • {formData.issueDate ? new Date(formData.issueDate).toLocaleDateString() : "Select date"}
                </span>
              </div>
            </div>
            
            {/* Certificate Template */}
            <div className="border border-gray-200 rounded-lg p-2 overflow-auto max-h-[70vh]">
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

            {/* Certificate Info Summary */}
            <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold text-blue-900">Certificate Summary</h3>
              </div>
              <div className="grid grid-cols-4 gap-3 text-sm">
                <div>
                  <div className="text-blue-700 text-xs">Barangay</div>
                  <div className="font-medium truncate">{formData.barangay || "Not selected"}</div>
                </div>
                <div>
                  <div className="text-blue-700 text-xs">OR Number</div>
                  <div className="font-medium font-mono">{formData.orNumber || "Not set"}</div>
                </div>
                <div>
                  <div className="text-blue-700 text-xs">Issue Date</div>
                  <div className="font-medium">
                    {formData.issueDate ? new Date(formData.issueDate).toLocaleDateString() : "Not set"}
                  </div>
                </div>
                <div>
                  <div className="text-blue-700 text-xs">Status</div>
                  <div className="font-medium capitalize">{formData.status || "Not selected"}</div>
                </div>
              </div>
            </div>

            {/* Edit Preview Note */}
            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-800">
                📝 <strong>Live Preview:</strong> Changes you make in the form are immediately reflected here. 
                This is how the certificate will look when printed.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditBusinessPage;