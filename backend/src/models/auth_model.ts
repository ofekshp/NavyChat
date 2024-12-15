import mongoose from "mongoose";

export interface IAuthUser {
  _id: string;
  username: string;
  email: string;
  password: string;
}

const AuthUserSchema = new mongoose.Schema<IAuthUser>({
  username:{
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

export default mongoose.model<IAuthUser>("Users", AuthUserSchema);
