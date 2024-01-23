import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core'

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './shell.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShellComponent implements OnInit {
  ngOnInit() {
    // TODO: implement
  }
}
