import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from 'src/users/auth.service';

@Injectable()
export class AuthorizationGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const userId = request.user._id; // Assuming that the user ID is available in the request object

    // Retrieve the blog ID from the route parameters
    const blogId = request.params.id;

    // Use the AuthService to check if the user is the owner of the blog
    return this.authService.checkOwner(userId, blogId);
  }
}
