import { Post, NotImplementedException, Controller, HttpStatus, HttpCode, Get, UseGuards, Request } from '@nestjs/common';

import { AuthService } from './auth.service';
import { PassportLocalGuard } from './guards/passport-local.guard';

@Controller('auth-v2')
export class PassportAuthController {
    constructor(private authService: AuthService) {}

    @HttpCode(HttpStatus.OK) 
    @Post('login')
    @UseGuards(PassportLocalGuard)
    login(@Request() request) {
        return this.authService.signIn(request.user);
    }

    @Get('me')
    @UseGuards(PassportLocalGuard)
    getUserInfo(@Request() request) {
        return request.user;
    }
}