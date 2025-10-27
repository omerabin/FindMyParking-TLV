// zod dto schema for user
import { z } from 'zod';

// User schema
export const UserZod = z.object({
  fullName: z.string().min(2).max(100),
  email: z.string().email(),
  passwordHash: z.string(),
  phoneNumber: z.string().regex(/^\+?\d{9,15}$/),
  createdAt: z.date().optional(),
  ownedParkingIds: z.array(z.string()).optional(), // ObjectId as string
});

export type User = z.infer<typeof UserZod>;
