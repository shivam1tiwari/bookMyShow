import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../../entities/User';
import dotenv from 'dotenv';
dotenv.config();

export const authResolvers = {
  Query: {
    me: async (_: any, __: any, { user }: { user: any }) => {
      if (!user) throw new Error('Not authenticated');
      return User.findOne({ where: { id: user.id } });
    },
  },
  Mutation: {
    signup: async (_: any, { email, password, username }: any) => {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = User.create({ email, password: hashedPassword, username });
      await user.save();
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
      return { token, user };
    },
    login: async (_: any, { email, password }: any) => {
      const user = await User.findOne({ where: { email } });
      if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new Error('Invalid credentials');
      }
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
      return { token, user };
    },
  },
};