import {ApiProperty} from "@nestjs/swagger";

export class BoardDto{
    id?: number;

    @ApiProperty()
    name: string;
}