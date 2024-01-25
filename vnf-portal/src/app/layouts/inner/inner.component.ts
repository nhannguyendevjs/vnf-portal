import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-inner',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './inner.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InnerComponent { }
