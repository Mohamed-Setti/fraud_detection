import mongoose from 'mongoose';

const RapportSchema = new mongoose.Schema({
  titre: { type: String },
  dateGeneration: { type: Date, default: Date.now },
  contenu: { type: String }, // base64, path or text
  periode: { type: String }, // e.g. '2025-01'
  meta: { type: mongoose.Schema.Types.Mixed }
});

module.exports = mongoose.model('Rapport', RapportSchema);
