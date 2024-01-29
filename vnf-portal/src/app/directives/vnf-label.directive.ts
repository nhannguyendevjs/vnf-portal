import { AfterViewInit, Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges, booleanAttribute, inject } from '@angular/core'

@Directive({
  selector: '[vnfLabel]',
  standalone: true,
})
export class VnfLabelDirective implements AfterViewInit, OnChanges {
  #el = inject(ElementRef)
  #renderer = inject(Renderer2)

  @Input() label!: string
  @Input({ transform: booleanAttribute }) required!: boolean

  ngAfterViewInit() {
    this.updateBtnClassNames()
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['label']) {
      this.renderLabel()
    }
  }

  updateBtnClassNames() {
    const classNames = ['vnf-label', 'font-medium']

    classNames.forEach((className) => {
      this.#renderer.addClass(this.#el.nativeElement, className)
    })
  }

  renderLabel() {
    this.#renderer.setProperty(this.#el.nativeElement, 'innerText', this.label)

    if (this.required) {
      const asteriskEle = this.#renderer.createElement('span')

      asteriskEle.innerText = ' *'
      this.#renderer.addClass(asteriskEle, 'text-red-600')
      this.#renderer.appendChild(this.#el.nativeElement, asteriskEle)
    }
  }
}
