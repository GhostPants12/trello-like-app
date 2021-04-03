import {ApiProperty} from '@nestjs/swagger';

export class UserDto {
    id? : number;

    @ApiProperty()
    username : string;

    @ApiProperty()
    email : string;

    @ApiProperty()
    password :  string;
}