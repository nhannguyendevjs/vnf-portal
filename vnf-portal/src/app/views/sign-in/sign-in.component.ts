import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component, ElementRef, Renderer2, inject, signal, viewChild } from '@angular/core'
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { Store } from '@ngrx/store'
import { VNFButtonComponent } from '../../components/vnf-button/vnf-button.component'
import { VNFErrorMessageComponent } from '../../components/vnf-error-message/vnf-error-message.component'
import { VNFInputComponent } from '../../components/vnf-input/vnf-input.component'
import { VNFLabelComponent } from '../../components/vnf-label/vnf-label.component'
import { VNFNotificationComponent } from '../../components/vnf-notification/vnf-notification.component'
import { LocalStorageKeys } from '../../enums/local-storage'
import { ShellActions } from '../../enums/shell'
import { AuthService } from '../../services/auth.service'
import * as UserActions from '../../stores/actions/user.actions'
import { AppStore } from '../../types/store'

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, VNFErrorMessageComponent, VNFLabelComponent, VNFNotificationComponent, VNFInputComponent, VNFButtonComponent],
  templateUrl: './sign-in.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignInComponent {
  #authService = inject(AuthService)
  #appStore = inject(Store) as Store<AppStore>
  #router = inject(Router)
  #formBuilder = inject(FormBuilder)
  #renderer = inject(Renderer2)

  errorMessage = signal<string>('')

  inputPassword = viewChild.required<ElementRef<HTMLInputElement>>('inputPassword')

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

      this.#authService.signIn(username, password).subscribe({
        next: (res) => {
          if (res.success) {
            const { accessToken, user } = res.data
            localStorage.setItem(LocalStorageKeys.authorization, accessToken)
            this.#appStore.dispatch(UserActions.setUser(user))
            this.#router.navigate(['/'], { queryParams: { action: ShellActions.signIn } })
          }
        },
        error: (err) => {
          this.errorMessage.set(err.error.message)
        },
      })
    }
  }

  showHidePassword() {
    const passwordInput = document.getElementById('password') as HTMLInputElement

    if (passwordInput.type === 'password') {
      this.#renderer.setAttribute(this.inputPassword().nativeElement, 'type', 'text')
    } else {
      this.#renderer.setAttribute(this.inputPassword().nativeElement, 'type', 'password')
    }
  }
}
