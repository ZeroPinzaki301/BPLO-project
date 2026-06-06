import mongoose from "mongoose";

const BrgyBusinessSchema = new mongoose.Schema(
  {
    ownerName: { type: String, required: true, trim: true },
    businessName: { type: String, required: true, trim: true },
    businessType: { type: String, required: true, trim: true },
    barangay: {
      type: String,
      enum: [
        'Banaban','Baybay','Binagbag','Donacion','Encanto','Laog','Marungko',
        'Niugan','Paltok','Pulong Yantok','San roque','Santa cruz','Santa lucia',
        'Santo cristo','Sulucan','Taboc',
      ],
      required: true,
    },
    orNumber: { type: String, required: true, unique: true, trim: true },
    ctcNumber: { type: String, unique: true, trim: true, required: false },
    status: { type: String, enum: ['new', 'renewal'], required: true },
    issueDate: { type: Date, required: true },
  },
  { timestamps: true }
);

const BrgyBusiness = mongoose.model("BrgyBusiness", BrgyBusinessSchema);

export default BrgyBusiness;