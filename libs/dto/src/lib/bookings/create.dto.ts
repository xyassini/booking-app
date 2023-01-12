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
  @Type(() => Date)
  from!: Date;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
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
