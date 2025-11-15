import mongoose from 'mongoose';

// inline enums (was imported from './enums')
enum TypeTransaction {
  OTHER = 'OTHER',
  TRANSFER = 'TRANSFER',
  PAYMENT = 'PAYMENT',
  WITHDRAWAL = 'WITHDRAWAL',
  DEPOSIT = 'DEPOSIT'
}

enum StatutTransaction {
  EN_ATTENTE = 'EN_ATTENTE',
  VALIDE = 'VALIDE',
  REJETE = 'REJETE'
}

const TransactionSchema = new mongoose.Schema({
  idTransaction: { type: Number }, // optional external id
  step: { type: Number, default: 0 }, // snapshot step for dataset alignment
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // owner
  compteSource: { type: mongoose.Schema.Types.ObjectId, ref: 'Compte' },
  compteDestination: { type: mongoose.Schema.Types.ObjectId, ref: 'Compte' },
  date: { type: Date, required: true, default: Date.now },
  amount: { type: Number, required: true },
  type: { type: String, enum: Object.values(TypeTransaction), default: TypeTransaction.OTHER },
  channel: { type: String, enum: ['online','branch','atm','pos','mobile'], default: 'online' },
  statut: { type: String, enum: Object.values(StatutTransaction), default: StatutTransaction.EN_ATTENTE },
  isFraud: { type: Boolean, default: false },
  riskScore: { type: Number, default: 0 },
  mlDetails: { type: mongoose.Schema.Types.Mixed }, // store ML output & features
  description: { type: String },
  balanceAfterSource: { type: Number },
  balanceAfterDestination: { type: Number },
  createdAt: { type: Date, default: Date.now }
});

// helpers
// TransactionSchema.methods.markAsFraud = function(score, details){
//   this.isFraud = true;
//   this.riskScore = score || this.riskScore;
//   if(details) this.mlDetails = Object.assign(this.mlDetails || {}, details);
//   return this.save();
// };

const Transaction = mongoose.model('Transaction', TransactionSchema);
export default mongoose.models.Transaction || Transaction;