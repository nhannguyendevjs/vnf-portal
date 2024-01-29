import { AfterViewInit, Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges, inject } from '@angular/core'
import { VnfButtonType } from '../types/vnf'

@Directive({
  selector: '[vnfButton]',
  standalone: true,
})
export class VnfButtonDirective implements AfterViewInit, OnChanges {
  #el = inject(ElementRef)
  #renderer = inject(Renderer2)

  @Input() btnType!: VnfButtonType

  ngAfterViewInit() {
    this.updateBtnClassNames()
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['btnType']) {
      this.checkBtnType()
    }
  }

  updateBtnClassNames() {
    const classNames = ['vnf-button', 'rounded-md', 'px-4', 'py-2']

    classNames.forEach((className) => {
      this.#renderer.addClass(this.#el.nativeElement, className)
    })
  }

  checkBtnType() {
    switch (this.btnType) {
      case 'primary':
        this.#renderer.addClass(this.#el.nativeElement, 'bg-gray-600')
        this.#renderer.addClass(this.#el.nativeElement, 'text-white')
        break
      case 'accent':
        this.#renderer.addClass(this.#el.nativeElement, 'bg-green-600')
        this.#renderer.addClass(this.#el.nativeElement, 'text-white')
        break
      case 'warn':
        this.#renderer.addClass(this.#el.nativeElement, 'bg-red-600')
        this.#renderer.addClass(this.#el.nativeElement, 'text-white')
        break
      default:
        this.#renderer.addClass(this.#el.nativeElement, 'bg-gray-50')
        break
    }
  }
}
