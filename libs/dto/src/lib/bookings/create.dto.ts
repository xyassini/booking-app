import {Prisma} from "@prisma/client";
import {
  IsDate,
  IsDefined,
  IsInt,
  IsNotEmpty,
  IsNotEmptyObject,
  Max,
  Min,
  ValidateNested
} from "class-validator";
import {CreateUserDto} from "../users";
import {Type} from "class-transformer";


export class CreateBookingDto implements Omit<Prisma.BookingCreateInput, 'user'> {
  @IsNotEmpty()
  @IsDate()
  from!: Date;

  @IsNotEmpty()
  @IsDate()
  to!: Date;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Max(4)
  guestCount!: number;

  @IsDefined()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => CreateUserDto)
  user!: CreateUserDto;
}
