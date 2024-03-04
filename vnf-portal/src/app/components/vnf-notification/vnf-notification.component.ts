import { CommonModule } from '@angular/common'
import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Renderer2, contentChild, effect, inject, input } from '@angular/core'
import { VNFNotificationType } from '../../types/vnf'

@Component({
  selector: 'vnf-notification',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vnf-notification.component.html',
  styleUrl: './vnf-notification.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VNFNotificationComponent implements AfterViewInit {
  #renderer = inject(Renderer2)

  ele = contentChild.required<ElementRef<HTMLElement>>('vnf')

  type = input.required<VNFNotificationType>()
  message = input.required<string>()

  constructor() {
    effect(() => {
      this.renderNotification()
    })
  }

  ngAfterViewInit() {
    this.updateClassNames()
  }

  updateClassNames() {
    const classNames = ['vnf-notification', 'text-red-600', 'text-sm']

    classNames.forEach((className) => {
      this.#renderer.addClass(this.ele().nativeElement, className)
    })
  }

  renderNotification() {
    const message = this.type().toUpperCase() + ': ' + this.message()

    this.#renderer.setProperty(this.ele().nativeElement, 'innerText', message)
  }
}
