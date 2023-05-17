import * as mongoose from "mongoose";

const privilegeSchema = new mongoose.Schema({
  action: { type: String, required: true },
  subject: { type: String, required: true },
  conditions: { type: mongoose.Schema.Types.Mixed, default: {} },
});

const roleSchema = new mongoose.Schema({
  name: { type: String, required: true },
  privileges: [privilegeSchema],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Role = mongoose.model<
  mongoose.Document & { name: string; privileges: any[] }
>("Role", roleSchema);

export default Role;
