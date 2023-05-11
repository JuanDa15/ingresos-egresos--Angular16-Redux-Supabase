import { inject } from '@angular/core';
import { CanDeactivateFn } from '@angular/router';
import { SessionManagerService } from '../services/session-manager.service';

export const updatedDataGuard: CanDeactivateFn<unknown> = async () => {
  const session = inject(SessionManagerService);
  const currentSession = await session.getSession();
  const hasUpdatedData = await session.hasUpdatedData();
  return hasUpdatedData || (currentSession === null);
};
