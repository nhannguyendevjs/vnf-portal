import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, viewChild } from '@angular/core';

@Component({
  selector: 'app-hotkeys-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hotkeys-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HotkeysDialogComponent {
  hotkeysDialog = viewChild.required<ElementRef<HTMLDialogElement>>('hotkeysDialog');

  showDialog() {
    this.hotkeysDialog().nativeElement.showModal();
  }

  closeDialog() {
    this.hotkeysDialog().nativeElement.close();
  }
}
