import { CommonModule } from '@angular/common'
import { AfterViewInit, ChangeDetectionStrategy, Component, DestroyRef, Renderer2, contentChild, inject } from '@angular/core'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'

@Component({
  selector: 'vnf-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vnf-table.component.html',
  styleUrl: './vnf-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VNFTableComponent implements AfterViewInit {
  #renderer = inject(Renderer2)
  destroyRef = inject(DestroyRef)

  ele = contentChild.required<any>('vnf')

  ngAfterViewInit() {
    this.updateTableClassNames()
    this.updateTableHeadClassNames()

    this.ele()
      .dataSource.data.pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.updateTableRowClassNames()
        this.updateTableDataClassNames()
      })
  }

  updateTableClassNames() {
    const classNames = ['border-collapse', 'table-auto', 'w-full', 'text-sm']

    classNames.forEach((className) => {
      this.#renderer.addClass(this.ele()._elementRef.nativeElement, className)
    })
  }

  updateTableHeadClassNames() {
    const classNames = ['bg-white', 'border-b', 'border-gray-100', 'font-medium', 'p-4', 'pl-8', 'text-gray-600', 'text-left', 'sticky', 'top-0']

    this.ele()
      ._elementRef.nativeElement.querySelectorAll('th')
      .forEach((th) => {
        classNames.forEach((className) => {
          this.#renderer.addClass(th, className)
        })
      })
  }

  updateTableRowClassNames() {
    const classNames = ['hover:bg-gray-100']

    this.ele()
      ._elementRef.nativeElement.querySelectorAll('tr')
      .forEach((tr, index) => {
        if (index > 0) {
          classNames.forEach((className) => {
            this.#renderer.addClass(tr, className)
          })
        }
      })
  }

  updateTableDataClassNames() {
    const classNames = ['border-b', 'border-gray-100', 'p-4', 'pl-8', 'text-left']

    this.ele()
      ._elementRef.nativeElement.querySelectorAll('td')
      .forEach((td) => {
        classNames.forEach((className) => {
          this.#renderer.addClass(td, className)
        })
      })
  }
}
