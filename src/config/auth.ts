import 'dotenv/config'
import type { Secret, SignOptions } from 'jsonwebtoken'

export const authConfig = {
    secret: (process.env.JWT_SECRET ?? "Base Secret") as Secret,
    expiresIn: "1d",
} as const;