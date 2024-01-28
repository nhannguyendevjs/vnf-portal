import { Directive, ElementRef, Renderer2, inject } from '@angular/core'

@Directive({
  selector: '[vnfInput]',
  standalone: true,
})
export class VnfInputDirective {
  #el = inject(ElementRef)
  #renderer = inject(Renderer2)

  constructor() {
    this.#appendBtnClassNames()
  }

  #appendBtnClassNames() {
    const classNames = ['vnf-input', 'rounded-md', 'border-[1px]', 'border-gray-200', 'px-5', 'py-2', 'focus:bg-gray-50', 'focus:outline-none', 'hover:bg-gray-50']

    classNames.forEach((className) => {
      this.#renderer.addClass(this.#el.nativeElement, className)
    })
  }
}
