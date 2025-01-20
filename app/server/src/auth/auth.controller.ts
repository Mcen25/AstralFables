import { Controller, Get, Req, Res, UseGuards, Body, HttpCode, HttpStatus, NotImplementedException, Post } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly AuthService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() input: { username: string, password: string }) {
    return this.AuthService.authenticate(input);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  getUserInfo(@Req() request: Request) {
    return request.user;
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req: Request) {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req: Request, @Res() res: Response) {
    const user = await this.AuthService.validateGoogleUser(req.user);
    const jwt = await this.AuthService.login(user);
    res.redirect(`http://localhost:4000?token=${jwt.accessToken}`);
  }
}