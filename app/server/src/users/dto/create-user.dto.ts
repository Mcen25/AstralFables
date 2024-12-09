export class CreateUserDto {
    readonly username: string;
    readonly email: string;
    readonly passwordHash: string;
    readonly createdAt?: Date;
    readonly updatedAt?: Date;
}