# Booking App

This is a simple booking app prototype that allows users to book a room for a given date and time.
The project was built for the Limehome Fullstack Developer Challenge

## Try it out

You can try out the app here: https://booking.zeriouh.io/
The API is available here: https://api.booking.zeriouh.io/

There's only two endpoints:

* `GET /bookings` - Get all bookings
* `GET /bookings/:id` - Get booking by id
* `POST /bookings` - Create a booking

You can derive the schema for creating a booking from the DTO library in this monorepo:

```ts
// bookings/create.dto.ts
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

// users/create.dto.ts
export class CreateUserDto implements Prisma.UserCreateInput {
  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @IsString()
  @IsNotEmpty()
  firstName!: string;

  @IsString()
  @IsNotEmpty()
  lastName!: string;

  @IsString()
  @IsNotEmpty()
  address!: string;

  @IsString()
  @IsNotEmpty()
  country!: string;

  @IsString()
  @IsNotEmpty()
  postalCode!: string;

  @IsString()
  @IsNotEmpty()
  city!: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^(\+|\d)[1-9 ][0-9 \-().]{7,32}$/)
  phone!: string;
}
```

## Run it locally

### Prerequisites

* Node.js
* PostgreSQL

### Setup

1. Clone the repository
2. Install dependencies: `npm install` (You might want to use `--legacy-peer-deps` since there's a peer dependency
   version mismatch between ngx-reactive-form-class-validator and class-validator. It doesn't break the app, but it's
   worth noting)
3. Create an .env.local file: `apps/api/.env.local` (See the .env.example for the required environment variables)
4. Run `npx nx prisma-push api`
5. Run the API with `npx nx serve api` and the frontend with `npx nx serve frontend`

## The Stack

The stack is overkill for this project, but I wanted to showcase my skills with the following technologies, especially
since these are the technologies used at Limehome:

* Nx for the monorepo
* Angular for the frontend
* NestJS for the backend
* Prisma as the ORM
* PostgreSQL as the database (Mainly because render only has postgres databases, otherwise would have used SQLite for
  such a simple app)
* [Render](https://render.com) for deployment

## Considerations and Explanations

### Backend

The backend has 3 endpoints:

* `GET /bookings` - Get all bookings
* `GET /bookings/:id` - Get booking by id 
* `POST /bookings` - Create a booking

The `BookingsService` leverages Prisma's capabilities to either create a user or use the reference of an existing one if
the email already exists when creating a new booking.

The backend uses the integrated ValidationPipe to validate the request body with the `class-validator` package.
To make this validation type-safe across the stack, I created a DTO library that uses the decorators
from `class-validator` for the user and booking models and used
the [ngx-reactive-form-class-validator](https://github.com/abarghoud/ngx-reactive-form-class-validator) in the Angular
frontend.
Thanks to Prisma generating types for me, I was able to use `implements Prisma.<Type>` on the DTOs and leverage
Typescript to warn me when the database schema changes and I forgot to change validations/properties. Lots of DX
improvement here.

Currently, the user is not updated when a booking is created - only created if the user doesn't exist.
I also skipped date collision checks, but these would have been easily implemented with a SQL Query using the `BETWEEN ... AND ...` operator.

In a real world app, I would add way more security features like CSRF validation or rate limiting to it, but for the
sake of simplicity, I left it out.

### Frontend

The frontend is a simple Angular app without any UI/CSS library or state management - I only have a mini state using a
BehaviorSubject in the BookingsService that holds the current booking in order not unnecessarily fetch a booking again.
Thanks to [ngx-reactive-form-class-validator](https://github.com/abarghoud/ngx-reactive-form-class-validator) I can use
the same DTOs that I use for the backend in order to validate the form.
For the datepicker, I've used [Litepicker](https://litepicker.com/)

Normally, I would create something like a `text-input` component that takes care of displaying the label, input and
error messages, especially since the errors are consistent and foreseeable thanks to `class-validator`.
The only problem I can think of is additional custom validators that might be needed in the future.

For state management, I like to use RxJS and the power of Typescript generics or something like ngrx, Akita or Elf.
I would also use a UI/CSS library like Bootstrap or TailwindCSS with the Angular CDK for the functionality to make the
app look better.

Generally I would separate everything into smaller components, and also use scss to split up the styling into smaller
files.

You might also notice that I've used some CSS properties that are specific to one use case (e.g. btn-link ->
margin-top) - normally I wouldn't do that, but again, for the sake of simplicity and considering it's just a quick
prototype, I went with it. :)

I skipped e2e tests as well, even though the e2e directory was generated by Nx.

### For both

I neglected error handling which I would do in a real world app, but I left it out for this small application in order
to keep it simple.

Also, this: `Booking & {user: User}` deserved its own type :)
The bookings.mock.ts file is duplicated in the frontend and backend, normally I'd pack it into a shared library for testing.
