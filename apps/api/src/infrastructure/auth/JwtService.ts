import jwt from 'jsonwebtoken';

export class JwtService {
    private static readonly SECRET = process.env.JWT_SECRET || 'super-secret-challenge-key';

    public static generateToken(userId: string, email: string): string {
        const payload = {
            sub: userId,
            email: email
        };

        return jwt.sign(payload, this.SECRET, { expiresIn: '24h' });
    }
}