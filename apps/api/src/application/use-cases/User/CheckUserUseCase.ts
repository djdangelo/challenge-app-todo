import { IUserRepository } from '@domain/repositories/IUserRepository';
import { User } from '@domain/entities/User';

export class CheckUserUseCase {
    constructor(private readonly userRepository: IUserRepository) { }

    async execute(email: string): Promise<User | null> {
        return await this.userRepository.findByEmail(email);
    }
}