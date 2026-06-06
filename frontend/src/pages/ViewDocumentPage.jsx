import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import GenBG from '../assets/images/GeneralBG.png';
import BrgyCertificateTemplate from "../components/BarangayCertificateTemplate";

const ViewDocumentPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const certificateRef = useRef(null);
  
  const [business, setBusiness] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    fetchBusiness();
  }, [id]);

  const fetchBusiness = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(`/brgy-business/${id}`);
      setBusiness(response.data);
      setError('');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to load business details');
      console.error('Error fetching business:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate(-1); // Go back to previous page
  };

  const handleEdit = () => {
    navigate(`/edit-business/${id}`);
  };

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await axiosInstance.delete(`/brgy-business/${id}`);
      alert('Business record deleted successfully!');
      navigate('/find'); // Redirect to find business page
    } catch (err) {
      alert('Error deleting business: ' + (err.response?.data?.error || err.message));
    } finally {
      setIsDeleting(false);
      setShowDeleteConfirm(false);
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

  if (error || !business) {
    return (
      <div 
        className="flex justify-center items-center min-h-screen bg-blue-50"
        style={{ backgroundImage: `url(${GenBG})` }}
      >
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-md text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
          <p className="text-gray-700 mb-6">{error || 'Business not found'}</p>
          <button
            onClick={handleBack}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Calculate age in days
  const getRecordAge = () => {
    const created = new Date(business.createdAt);
    const now = new Date();
    const diffTime = Math.abs(now - created);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  return (
    <div
      className="flex bg-cover bg-center min-h-screen bg-blue-50 p-6"
      style={{ backgroundImage: `url(${GenBG})` }}
    >
      <div className="w-full max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-blue-800 text-center">
            Business Certificate Details
          </h1>
          <p className="text-center text-blue-600 mt-2">
            View and manage business certificate information
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[35%_65%] gap-6">
          {/* Left side - Business Details (35%) */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-blue-700">
                Business Information
              </h2>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
                {business.status.toUpperCase()}
              </span>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-[.8em] text-blue-900">Business ID</label>
                  <div className="border border-yellow-400 rounded-md p-2 bg-gray-50 text-xs font-mono truncate">
                    {business._id}
                  </div>
                </div>
                <div>
                  <label className="block font-semibold text-[.8em] text-blue-900">Created On</label>
                  <div className="border border-yellow-400 rounded-md p-2 bg-gray-50">
                    {formatDate(business.createdAt)}
                  </div>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-[.8em] text-blue-900">Owner's Name</label>
                <div className="border border-yellow-400 rounded-md p-2 bg-gray-50 font-medium">
                  {business.ownerName}
                </div>
              </div>

              <div>
                <label className="block font-semibold text-[.8em] text-blue-900">Business Name</label>
                <div className="border border-yellow-400 rounded-md p-2 bg-gray-50 font-medium">
                  {business.businessName}
                </div>
              </div>

              <div>
                <label className="block font-semibold text-[.8em] text-blue-900">Business Type</label>
                <div className="border border-yellow-400 rounded-md p-2 bg-gray-50">
                  {business.businessType}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-[.8em] text-blue-900">Barangay</label>
                  <div className="border border-yellow-400 rounded-md p-2 bg-gray-50 font-medium">
                    {business.barangay}
                  </div>
                </div>
                <div>
                  <label className="block font-semibold text-[.8em] text-blue-900">Issue Date</label>
                  <div className="border border-yellow-400 rounded-md p-2 bg-gray-50">
                    {formatDate(business.issueDate)}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-[.8em] text-blue-900">OR Number</label>
                  <div className="border border-yellow-400 rounded-md p-2 bg-gray-50 font-mono font-medium">
                    {business.orNumber}
                  </div>
                </div>
                <div>
                  <label className="block font-semibold text-[.8em] text-blue-900">CTC Number</label>
                  <div className="border border-yellow-400 rounded-md p-2 bg-gray-50 font-mono">
                    {business.ctcNumber || 'Not provided'}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 pt-6 mt-6 border-t">
                <button
                  onClick={handleBack}
                  className="cursor-pointer flex-1 px-4 py-2.5 bg-gray-300 text-gray-800 font-semibold rounded-md hover:bg-gray-400 transition-colors flex items-center justify-center gap-2"
                >
                  <span>←</span>
                  <span>Go Back</span>
                </button>
                <button
                  onClick={handlePrint}
                  className="cursor-pointer flex-1 px-4 py-2.5 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                >
                  <span>Print</span>
                </button>
                <button
                  onClick={handleEdit}
                  className="cursor-pointer flex-1 px-4 py-2.5 bg-yellow-400 text-blue-900 font-semibold rounded-md hover:bg-yellow-500 transition-colors flex items-center justify-center gap-2"
                >
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(true)}
                  className="cursor-pointer flex-1 px-4 py-2.5 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
                >
                  <span>Delete</span>
                </button>
              </div>

              {/* Quick Stats */}
              <div className="mt-6 pt-6 border-t">
                <h3 className="font-semibold text-blue-900 mb-3">Certificate Details</h3>
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                    <div className="text-xl font-bold text-blue-700">{getRecordAge()}</div>
                    <div className="text-xs text-blue-600">Days Old</div>
                  </div>
                  <div className="bg-green-50 p-3 rounded-lg border border-green-100">
                    <div className="text-xl font-bold text-green-700">
                      {business.status === 'renewal' ? 'Renewal' : 'New'}
                    </div>
                    <div className="text-xs text-green-600 capitalize">Business Status</div>
                  </div>
                  <div className="bg-purple-50 p-3 rounded-lg border border-purple-100">
                    <div className="text-xl font-bold text-purple-700">
                      {business.ctcNumber ? '✓' : '—'}
                    </div>
                    <div className="text-xs text-purple-600">CTC Filed</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Certificate Preview (65%) */}
          <div className="bg-white shadow-lg rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-blue-700">
                Certificate Preview
              </h2>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">
                  {business.barangay} • {formatDate(business.issueDate)}
                </span>
              </div>
            </div>
            
            {/* Certificate Template */}
            <div className="border border-gray-200 rounded-lg p-2 overflow-auto max-h-[70vh]">
              <BrgyCertificateTemplate
                ref={certificateRef}
                ownerName={business.ownerName}
                businessName={business.businessName}
                businessType={business.businessType}
                barangay={business.barangay}
                orNumber={business.orNumber}
                ctcNumber={business.ctcNumber}
                status={business.status}
                date={business.issueDate}
              />
            </div>

            {/* Certificate Info Summary */}
            <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold text-blue-900">Certificate Summary</h3>
                <button
                  onClick={handlePrint}
                  className="cursor-pointer px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
                >
                  Quick Print
                </button>
              </div>
              <div className="grid grid-cols-4 gap-3 text-sm">
                <div>
                  <div className="text-blue-700 text-xs">Barangay</div>
                  <div className="font-medium truncate">{business.barangay}</div>
                </div>
                <div>
                  <div className="text-blue-700 text-xs">OR Number</div>
                  <div className="font-medium font-mono">{business.orNumber}</div>
                </div>
                <div>
                  <div className="text-blue-700 text-xs">Issue Date</div>
                  <div className="font-medium">{formatDate(business.issueDate)}</div>
                </div>
                <div>
                  <div className="text-blue-700 text-xs">Status</div>
                  <div className="font-medium capitalize">{business.status}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
              <h3 className="text-xl font-bold text-red-600 mb-4">Confirm Deletion</h3>
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="font-medium mb-2">Are you sure you want to delete this business record?</p>
                <div className="text-sm text-gray-700 space-y-1">
                  <p><strong>Owner:</strong> {business.ownerName}</p>
                  <p><strong>Business:</strong> {business.businessName}</p>
                  <p><strong>OR Number:</strong> {business.orNumber}</p>
                </div>
                <p className="mt-3 text-red-600 text-sm font-medium">
                  ⚠️ This action cannot be undone!
                </p>
              </div>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition-colors"
                  disabled={isDeleting}
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors flex items-center gap-2"
                  disabled={isDeleting}
                >
                  {isDeleting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Deleting...
                    </>
                  ) : (
                    'Delete Permanently'
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ViewDocumentPage;