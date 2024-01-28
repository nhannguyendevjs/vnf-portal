import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges, inject } from '@angular/core'
import { VnfInputType } from '../types/vnf'

@Directive({
  selector: '[vnfInput]',
  standalone: true,
})
export class VnfInputDirective implements OnChanges {
  #el = inject(ElementRef)
  #renderer = inject(Renderer2)

  @Input() inputType!: VnfInputType

  constructor() {
    this.#appendBtnClassNames()
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['inputType']) {
      this.#checkInputType()
    }
  }

  #appendBtnClassNames() {
    const classNames = [
      'vnf-input',
      'min-w-6',
      'min-h-6',
      'rounded-md',
      'border-[1px]',
      'border-gray-200',
      'px-5',
      'py-2',
      'focus:bg-gray-50',
      'focus:outline-none',
      'hover:bg-gray-50',
    ]

    classNames.forEach((className) => {
      this.#renderer.addClass(this.#el.nativeElement, className)
    })
  }

  #checkInputType() {
    const checkboxClassNames = ['w-6', 'h-6', 'relative', 'top-[6px]', 'accent-gray-600']

    if (this.inputType === 'checkbox') {
      checkboxClassNames.forEach((className) => {
        this.#renderer.addClass(this.#el.nativeElement, className)
      })
    }
  }
}
