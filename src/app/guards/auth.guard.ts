import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SessionManagerService } from '../services/session-manager.service';

export const authGuard: CanActivateFn = async () => {
  const session = inject(SessionManagerService);
  const router = inject(Router);

  const currentSession = await session.getSession()
  if(!currentSession) {
    router.navigateByUrl('/auth/login')
    return false;
  }

  return true;
};
