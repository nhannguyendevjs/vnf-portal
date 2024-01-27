import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'
import { Store } from '@ngrx/store'
import { LocalStorageKeys } from '../../enums/local-storage'
import { AuthService } from '../../services/auth.service'
import { setLoggedInUser } from '../../stores/actions/user.actions'

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './sign-in.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignInComponent {
  authService = inject(AuthService)
  storeService = inject(Store)

  formBuilder = inject(FormBuilder)

  signInForm = this.formBuilder.group({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  })

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
      this.authService.signIn(username, password).subscribe((res) => {
        if (res.success) {
          const { accessToken, user } = res.data
          localStorage.setItem(LocalStorageKeys.authorization, accessToken)
          this.storeService.dispatch(setLoggedInUser(user))
        }
      })
    }
  }
}
