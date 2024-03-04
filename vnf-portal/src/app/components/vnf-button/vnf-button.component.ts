import { CommonModule } from '@angular/common'
import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Renderer2, contentChild, inject } from '@angular/core'
import { VNFButtonColors } from '../../enums/vnf'

@Component({
  selector: 'vnf-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vnf-button.component.html',
  styleUrl: './vnf-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VNFButtonComponent implements AfterViewInit {
  #renderer = inject(Renderer2)

  ele = contentChild.required<ElementRef<HTMLButtonElement>>('vnf')

  ngAfterViewInit() {
    this.updateBtnClassNames()
    this.checkBtnType()
  }

  updateBtnClassNames() {
    const classNames = ['vnf-button', 'rounded-md', 'px-4', 'py-2']

    classNames.forEach((className) => {
      this.#renderer.addClass(this.ele().nativeElement, className)
    })
  }

  checkBtnType() {
    const color = this.ele().nativeElement.getAttribute('color')

    switch (color) {
      case VNFButtonColors.primary:
        this.#renderer.addClass(this.ele().nativeElement, 'bg-gray-600')
        this.#renderer.addClass(this.ele().nativeElement, 'text-white')
        break
      case VNFButtonColors.accent:
        this.#renderer.addClass(this.ele().nativeElement, 'bg-green-600')
        this.#renderer.addClass(this.ele().nativeElement, 'text-white')
        break
      case VNFButtonColors.warn:
        this.#renderer.addClass(this.ele().nativeElement, 'bg-red-600')
        this.#renderer.addClass(this.ele().nativeElement, 'text-white')
        break
      default:
        this.#renderer.addClass(this.ele().nativeElement, 'bg-gray-50')
        break
    }
  }
}
