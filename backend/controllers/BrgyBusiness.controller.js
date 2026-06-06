import BrgyBusinessModel from "../models/BrgyBusiness.model.js";

// CREATE
export const createBusiness = async (req, res) => {
  try {
    const business = new BrgyBusinessModel(req.body);
    const saved = await business.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// READ all
export const getAllBusinesses = async (req, res) => {
  try {
    const businesses = await BrgyBusinessModel.find();
    res.json(businesses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// READ one by ID
export const getBusinessById = async (req, res) => {
  try {
    const business = await BrgyBusinessModel.findById(req.params.id);
    if (!business) return res.status(404).json({ error: "Not found" });
    res.json(business);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE
export const updateBusiness = async (req, res) => {
  try {
    const updated = await BrgyBusinessModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ error: "Not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE
export const deleteBusiness = async (req, res) => {
  try {
    const deleted = await BrgyBusinessModel.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Not found" });
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};