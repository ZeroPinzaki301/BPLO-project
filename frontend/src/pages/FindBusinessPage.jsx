import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Add this import
import axiosInstance from "../../utils/axiosInstance";
import GenBG from "../assets/images/GeneralBG.png";

const barangays = [
  "Banaban","Baybay","Binagbag","Donacion","Encanto","Laog","Marungko",
  "Niugan","Paltok","Pulong Yantok","San Roque","Santa Cruz","Sta Lucia",
  "Sto Cristo","Sulucan","Taboc",
];

const FindBusinessPage = () => {
  const [businesses, setBusinesses] = useState([]);
  const [filters, setFilters] = useState({
    ownerName: "",
    businessName: "",
    businessType: "",
    orNumber: "",
    ctcNumber: "",
    barangay: "",
    status: "",
  });
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        const res = await axiosInstance.get("/brgy-business");
        setBusinesses(res.data);
      } catch (err) {
        console.error("Error fetching businesses:", err);
      }
    };
    fetchBusinesses();
  }, []);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  // Handle row click
  const handleRowClick = (businessId) => {
    navigate(`/view-business/${businessId}`);
  };

  const filteredBusinesses = businesses.filter((b) => {
    const or = b.orNumber ? b.orNumber.toString() : "";
    const ctc = b.ctcNumber ? b.ctcNumber.toString() : "";

    return (
      (!filters.ownerName || b.ownerName.toLowerCase().includes(filters.ownerName.toLowerCase())) &&
      (!filters.businessName || b.businessName.toLowerCase().includes(filters.businessName.toLowerCase())) &&
      (!filters.businessType || b.businessType.toLowerCase().includes(filters.businessType.toLowerCase())) &&
      (!filters.orNumber || or.startsWith(filters.orNumber)) &&
      (!filters.ctcNumber || ctc.startsWith(filters.ctcNumber)) &&
      (!filters.barangay || b.barangay.toLowerCase() === filters.barangay.toLowerCase()) &&
      (!filters.status || b.status.toLowerCase() === filters.status.toLowerCase())
    );
  });

  return (
    <div
      className="flex bg-cover bg-center justify-center items-start min-h-screen bg-blue-50 p-8"
      style={{ backgroundImage: `url(${GenBG})` }}
    >
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-7xl">
        <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center">
          Find Business
        </h2>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <input
            type="text"
            name="ownerName"
            placeholder="Search by Owner Name"
            value={filters.ownerName}
            onChange={handleChange}
            className="border border-yellow-400 rounded-md p-2 focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            name="businessName"
            placeholder="Search by Business Name"
            value={filters.businessName}
            onChange={handleChange}
            className="border border-yellow-400 rounded-md p-2 focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            name="businessType"
            placeholder="Filter by Business Type"
            value={filters.businessType}
            onChange={handleChange}
            className="border border-yellow-400 rounded-md p-2 focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            name="orNumber"
            placeholder="Search by OR Number"
            value={filters.orNumber}
            onChange={handleChange}
            className="border border-yellow-400 rounded-md p-2 focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            name="ctcNumber"
            placeholder="Search by CTC Number"
            value={filters.ctcNumber}
            onChange={handleChange}
            className="border border-yellow-400 rounded-md p-2 focus:ring-2 focus:ring-blue-400"
          />
          <select
            name="barangay"
            value={filters.barangay}
            onChange={handleChange}
            className="border cursor-pointer border-yellow-400 rounded-md p-2 focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Filter by Barangay</option>
            {barangays.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
          <select
            name="status"
            value={filters.status}
            onChange={handleChange}
            className="border cursor-pointer border-yellow-400 rounded-md p-2 focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Filter by Status</option>
            <option value="new">New</option>
            <option value="renewal">Renewal</option>
          </select>
          <div className="flex items-center">
            <span className="text-sm text-gray-600 ml-2">
              Found: {filteredBusinesses.length} records
            </span>
          </div>
        </div>

        {/* Results Table */}
        {filteredBusinesses.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-yellow-400">
              <thead>
                <tr className="bg-yellow-200 text-blue-900">
                  <th className="border border-yellow-400 p-2">Owner</th>
                  <th className="border border-yellow-400 p-2">Business</th>
                  <th className="border border-yellow-400 p-2">Type</th>
                  <th className="border border-yellow-400 p-2">Barangay</th>
                  <th className="border border-yellow-400 p-2">OR #</th>
                  <th className="border border-yellow-400 p-2">CTC #</th>
                  <th className="border border-yellow-400 p-2">Status</th>
                  <th className="border border-yellow-400 p-2">Issue Date</th>
                  <th className="border border-yellow-400 p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredBusinesses.map((b) => (
                  <tr 
                    key={b._id} 
                    className="hover:bg-yellow-100 cursor-pointer transition-colors duration-150"
                    onClick={() => handleRowClick(b._id)}
                  >
                    <td className="border border-yellow-400 p-2">{b.ownerName}</td>
                    <td className="border border-yellow-400 p-2">{b.businessName}</td>
                    <td className="border border-yellow-400 p-2">{b.businessType}</td>
                    <td className="border border-yellow-400 p-2">{b.barangay}</td>
                    <td className="border border-yellow-400 p-2 font-mono">{b.orNumber}</td>
                    <td className="border border-yellow-400 p-2 font-mono">{b.ctcNumber || "-"}</td>
                    <td className="border border-yellow-400 p-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        b.status === 'new' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {b.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="border border-yellow-400 p-2">
                      {new Date(b.issueDate).toLocaleDateString()}
                    </td>
                    <td className="border border-yellow-400 p-2 text-center">
                      <button
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent row click
                          handleRowClick(b._id);
                        }}
                        className="px-3 cursor-pointer py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📋</div>
            <p className="text-gray-600 text-lg">No businesses found matching your filters.</p>
            <p className="text-gray-500 mt-2">Try adjusting your search criteria or add a new business.</p>
          </div>
        )}

        {/* Table footer with summary */}
        {filteredBusinesses.length > 0 && (
          <div className="mt-4 flex justify-between items-center text-sm text-gray-600">
            <div>
              Showing <span className="font-semibold">{filteredBusinesses.length}</span> of{" "}
              <span className="font-semibold">{businesses.length}</span> total businesses
            </div>
            <div className="space-x-4">
              <span>
                New: <span className="font-semibold">
                  {filteredBusinesses.filter(b => b.status === 'new').length}
                </span>
              </span>
              <span>
                Renewal: <span className="font-semibold">
                  {filteredBusinesses.filter(b => b.status === 'renewal').length}
                </span>
              </span>
            </div>
          </div>
        )}

        {/* Quick Tips */}
        <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h3 className="font-semibold text-blue-900 mb-2 flex items-center">
            <span className="mr-2">💡</span> Quick Tips
          </h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Click on any row to view complete business details</li>
            <li>• Use the "View" button for the same action</li>
            <li>• Search by partial names or numbers (e.g., "Juan" or "123")</li>
            <li>• Combine multiple filters for precise searching</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FindBusinessPage;