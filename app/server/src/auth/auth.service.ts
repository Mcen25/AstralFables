import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

type AuthInput = { username: string; password: string };
type SignInData = { userId: string; username: string }; // Change ObjectId to string
type AuthResult = { accessToken: string; userId: string; username: string };

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async authenticate(input: AuthInput): Promise<AuthResult> {
    const user = await this.validateUser(input);
    if (!user) {
      throw new UnauthorizedException();
    }

    return this.signIn(user);
  }

  async validateUser(input: AuthInput): Promise<SignInData | null> {
    const user = await this.usersService.findUserByName(input.username);
    if (user && (await bcrypt.compare(input.password, user.password))) {
      return { userId: user._id.toString(), username: user.username }; // Convert ObjectId to string
    }
    return null;
  }

  async signIn(user: SignInData): Promise<AuthResult> {
    const payload = { sub: user.userId, username: user.username };
    const accessToken = await this.jwtService.signAsync(payload);
    return {
      accessToken,
      userId: user.userId,
      username: user.username,
    };
  }
  
  async validateGoogleUser(profile: any): Promise<any> {
    const user = await this.usersService.findOrCreateGoogleUser(profile);
    return user;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}