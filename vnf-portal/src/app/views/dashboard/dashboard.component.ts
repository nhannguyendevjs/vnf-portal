import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core'

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit {
  ngOnInit() {
    // TODO implement
  }
}
