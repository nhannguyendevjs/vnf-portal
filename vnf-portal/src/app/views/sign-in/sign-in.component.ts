import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { Store } from '@ngrx/store'
import { VnfButtonDirective } from '../../directives/vnf-button.directive'
import { VnfErrorMessageDirective } from '../../directives/vnf-error-message.directive'
import { VnfInputDirective } from '../../directives/vnf-input.directive'
import { VnfLabelDirective } from '../../directives/vnf-label.directive'
import { LocalStorageKeys } from '../../enums/local-storage'
import { ShellActions } from '../../enums/shell'
import { AuthService } from '../../services/auth.service'
import * as UserActions from '../../stores/actions/user.actions'
import { AppStore } from '../../types/store.schema'

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, VnfButtonDirective, VnfInputDirective, VnfErrorMessageDirective, VnfLabelDirective],
  templateUrl: './sign-in.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignInComponent {
  #authService = inject(AuthService)
  #appStore = inject(Store) as Store<AppStore>
  #router = inject(Router)
  #formBuilder = inject(FormBuilder)

  signInForm = this.#formBuilder.group({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  })

  constructor() {
    if (this.#authService.isSignedIn()) {
      this.#router.navigate(['/'], { queryParams: { action: ShellActions.signIn } })
    }
  }

  markFormGroupAsDirty() {
    this.signInForm.markAsDirty()
  }

  markAllAsTouched() {
    this.signInForm.controls.username.markAsTouched()
    this.signInForm.controls.password.markAsTouched()
  }

  onSubmit() {
    this.markFormGroupAsDirty()
    this.markAllAsTouched()

    if (this.signInForm.valid) {
      const { username, password } = this.signInForm.value
      this.#authService.signIn(username, password).subscribe((res) => {
        if (res.success) {
          const { accessToken, user } = res.data
          localStorage.setItem(LocalStorageKeys.authorization, accessToken)
          this.#appStore.dispatch(UserActions.setUser(user))
          this.#router.navigate(['/'], { queryParams: { action: ShellActions.signIn } })
        }
      })
    }
  }
}
