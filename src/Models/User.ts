import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['client','technicien','analystefinanciere','admin'], default: 'client' },
  createdAt: { type: Date, default: Date.now }
});

// Hash password before save
UserSchema.pre('save', async function(next){
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// UserSchema.methods.comparePassword = function(candidate){
//   return bcrypt.compare(candidate, this.password);
// };

const User = mongoose.model('User', UserSchema);
export default User;
