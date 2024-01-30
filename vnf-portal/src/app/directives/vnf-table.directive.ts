import { AfterViewInit, Directive, ElementRef, Renderer2, inject } from '@angular/core'

@Directive({
  selector: '[vnfTable]',
  standalone: true,
})
export class VnfTableDirective implements AfterViewInit {
  #el = inject(ElementRef)
  #renderer = inject(Renderer2)

  ngAfterViewInit() {
    this.updateTableClassNames()
    this.updateTableHeadClassNames()
    this.updateTableDataClassNames()
  }

  updateTableClassNames() {
    const classNames = ['border-collapse', 'table-auto', 'w-full', 'text-sm']

    classNames.forEach((className) => {
      this.#renderer.addClass(this.#el.nativeElement, className)
    })
  }

  updateTableHeadClassNames() {
    const classNames = ['bg-white', 'border-b', 'border-gray-100', 'font-medium', 'p-4', 'pl-8', 'text-gray-600', 'text-left', 'sticky', 'top-0']

    this.#el.nativeElement.querySelectorAll('th').forEach((th) => {
      classNames.forEach((className) => {
        this.#renderer.addClass(th, className)
      })
    })
  }

  updateTableDataClassNames() {
    const classNames = ['border-b', 'border-gray-100', 'p-4', 'pl-8', 'text-left']

    this.#el.nativeElement.querySelectorAll('td').forEach((td) => {
      classNames.forEach((className) => {
        this.#renderer.addClass(td, className)
      })
    })
  }
}
