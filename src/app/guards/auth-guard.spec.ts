import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { AuthGuard } from './auth-guard'; // Import the class-based AuthGuard

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([]) // Provide a mock router
      ],
      providers: [
        AuthGuard // Provide the guard itself
      ]
    });

    guard = TestBed.inject(AuthGuard);
    router = TestBed.inject(Router);

    spyOn(router, 'navigate').and.returnValue(Promise.resolve(true)); // Spy on router.navigate
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should redirect to /auth if user is not logged in (due to hardcoded false)', () => {
    // In the current AuthGuard implementation, isLoggedIn is hardcoded to false
    // so it should always redirect.
    const canActivateResult = guard.canActivate();
    expect(canActivateResult).toBeFalse();
    expect(router.navigate).toHaveBeenCalledWith(['/auth']);
  });

  // This test case would be relevant once an actual AuthService is integrated
  // and can return true. For now, it will effectively test the same as above.
  it('should not allow activation if user is not logged in (hardcoded)', () => {
    const canActivateResult = guard.canActivate();
    expect(canActivateResult).toBeFalse();
    expect(router.navigate).toHaveBeenCalledWith(['/auth']);
  });
});