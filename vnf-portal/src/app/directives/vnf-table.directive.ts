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
    this.updateTableRowClassNames()
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

  updateTableRowClassNames() {
    const classNames = ['hover:bg-gray-100']

    this.#el.nativeElement.querySelectorAll('tr').forEach((tr, index) => {
      if (index > 0) {
        classNames.forEach((className) => {
          this.#renderer.addClass(tr, className)
        })
      }
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
