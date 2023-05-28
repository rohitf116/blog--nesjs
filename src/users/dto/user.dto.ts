import { Expose } from 'class-transformer';

export class UserDto {
  @Expose()
  '_id': any;
  @Expose()
  'fname': string;
  @Expose()
  'lname': string;
  @Expose()
  'title': string;
  @Expose()
  'email': string;
  @Expose()
  'createdAt': string;
  @Expose()
  'updatedAt': string;
}
