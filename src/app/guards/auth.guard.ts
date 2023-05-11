import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SessionManagerService } from '../services/session-manager.service';
import { compareAsc, subDays } from 'date-fns';

export const authGuard: CanActivateFn = async (route, state) => {
  const session = inject(SessionManagerService);
  const router = inject(Router);
  await session.refreshSession();

  const currentSession = await session.getSession()
  if(!currentSession) {
    router.navigateByUrl('/auth/login')
    return false;
  }

  return true;
};
