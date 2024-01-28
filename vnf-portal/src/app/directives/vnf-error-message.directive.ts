import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges, inject } from '@angular/core'

@Directive({
  selector: '[vnfErrorMessage]',
  standalone: true,
})
export class VnfErrorMessageDirective implements OnChanges {
  #el = inject(ElementRef)
  #renderer = inject(Renderer2)

  @Input() errorMessage!: string

  constructor() {
    this.#appendBtnClassNames()
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['errorMessage']) {
      this.#renderErrorMessage()
    }
  }

  #appendBtnClassNames() {
    const classNames = ['vnf-error-message', 'text-red-600', 'text-sm']

    classNames.forEach((className) => {
      this.#renderer.addClass(this.#el.nativeElement, className)
    })
  }

  #renderErrorMessage() {
    this.#renderer.setProperty(this.#el.nativeElement, 'innerText', this.errorMessage)
  }
}
