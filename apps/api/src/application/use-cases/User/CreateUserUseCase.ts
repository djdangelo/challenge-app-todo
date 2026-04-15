import { IUserRepository } from '@domain/repositories/IUserRepository';
import { User } from '@domain/entities/User';

export class CreateUserUseCase {
    constructor(private readonly userRepository: IUserRepository) { }

    async execute(email: string): Promise<User> {
        const existingUser = await this.userRepository.findByEmail(email);

        if (existingUser) {
            throw new Error('ALREADY_EXISTS');
        }

        const newUser = new User(email);

        return await this.userRepository.create(newUser);
    }
}