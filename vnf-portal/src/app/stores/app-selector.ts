import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppStore } from '../types/store';

export const AppSelectors = () => {
  const appStore = inject(Store) as Store<AppStore>;

  const user = appStore.select((state) => state.user);

  return { user };
};
