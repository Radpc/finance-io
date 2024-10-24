import { Body, Controller, Post } from '@nestjs/common';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { ControllerType } from 'src/types/response';
import { LoginService } from './login.service';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

class LoginDTO {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ type: String, example: 'admin@email.com' })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, example: 'mysecret123' })
  password: string;
}

@Controller()
@ApiTags('User')
export class LoginController extends ControllerType {
  constructor(private readonly loginService: LoginService) {
    super();
  }

  @Post('/login')
  async handle(@Body() { email, password }: LoginDTO) {
    const res = await this.loginService.execute(email, password);
    return { data: res, message: 'Login success' };
  }
}
