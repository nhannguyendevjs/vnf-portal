import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges, inject } from '@angular/core'

@Directive({
  selector: '[vnfNotification]',
  standalone: true,
})
export class VnfNotificationDirective implements OnChanges {
  #el = inject(ElementRef)
  #renderer = inject(Renderer2)

  @Input() notificationType!: string
  @Input() notificationMessage!: string

  constructor() {
    this.#appendBtnClassNames()
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['notificationType'] || changes['message']) {
      this.#renderNotification()
    }
  }

  #appendBtnClassNames() {
    const classNames = ['vnf-notification', 'text-red-600', 'text-sm']

    classNames.forEach((className) => {
      this.#renderer.addClass(this.#el.nativeElement, className)
    })
  }

  #renderNotification() {
    const message = this.notificationType.toUpperCase() + ': ' + this.notificationMessage

    this.#renderer.setProperty(this.#el.nativeElement, 'innerText', message)
  }
}
