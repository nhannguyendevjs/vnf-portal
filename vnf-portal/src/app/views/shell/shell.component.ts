import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ShellActions } from '../../enums/shell';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './shell.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShellComponent {
  #router = inject(Router);
  #route = inject(ActivatedRoute);

  constructor() {
    this.#checkForRedirect();
  }

  #checkForRedirect() {
    const params: any = this.#route.snapshot.queryParams;

    if (params.action === ShellActions.signIn) {
      this.#router.navigate([environment.startupUrl]);
      return;
    }

    if (params.action === ShellActions.redirect) {
      const redirectUrl = params.url;
      this.#router.navigate([redirectUrl]);
      return;
    }

    this.#router.navigate([environment.startupUrl]);
  }
}
