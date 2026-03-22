import { IUserRepository } from '@domain/repositories/IUserRepository';
import { User } from '@domain/entities/User';
import { db } from '../../config/firebase';

export class FirestoreUserRepository implements IUserRepository {
    private readonly collection = db.collection('users');

    async create(user: User): Promise<User> {
        const userData = {
            id: user.id,
            email: user.email
        };

        await this.collection.doc(user.id).set(userData);
        return user;
    }

    async findByEmail(email: string): Promise<User | null> {
        const snapshot = await this.collection
            .where('email', '==', email)
            .limit(1)
            .get();

        if (snapshot.empty) {
            return null;
        }
        const doc = snapshot.docs[0];
        const data = doc.data();

        return new User(data.email, data.id);
    }
}