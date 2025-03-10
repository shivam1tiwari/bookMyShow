import { OAuth2Client } from "google-auth-library";
import dotenv from "dotenv";
import { User } from "../../entities/User";
import Jwt from "jsonwebtoken"; // Make sure to import the JWT library
dotenv.config();

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const client = new OAuth2Client(GOOGLE_CLIENT_ID);

interface GoogleAuthResponse {
  token: string;
  error?: string;
}

interface GoogleAuthArgs {
  creadential: string;
}

export const googleAuthResolvers = {
  Query: {
    googleAuth: async ( _: any,
      { creadential }: GoogleAuthArgs
    ): Promise<GoogleAuthResponse | string> => {
      try {
        const ticket = await client.verifyIdToken({
          idToken: creadential,
          audience: GOOGLE_CLIENT_ID,
        });
        const payload = ticket.getPayload();
        if (!payload || !payload.email || !payload.name) {
          throw new Error("Missing required information in the token payload");
        }

        const { email, name } = payload;
        let user = await User.findOne({ where: { email } });
        if (!user) {
          user = User.create({
            email,
            username: name,
            password: "shivamispaas",
          });
          await User.save(user);
        }
        const token = Jwt.sign({ id: user.id }, process.env.JWT_SECRET!, { expiresIn: "1h" });
        return token ; 
      } catch (error) {
        console.error(error);
        return "Invalid user detected. Please try again";
      }
    },
  },
};
