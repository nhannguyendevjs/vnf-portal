import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component} from '@angular/core'

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sign-in.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignInComponent {}
