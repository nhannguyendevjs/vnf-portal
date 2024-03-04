import { CommonModule } from '@angular/common'
import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Renderer2, contentChild, inject } from '@angular/core'
import { VNFInputTypes } from '../../enums/vnf'

@Component({
  selector: 'vnf-input',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vnf-input.component.html',
  styleUrl: './vnf-input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VNFInputComponent implements AfterViewInit {
  renderer = inject(Renderer2)

  ele = contentChild.required<ElementRef<HTMLInputElement>>('vnf')

  ngAfterViewInit() {
    this.updateBtnClassNames()
    this.checkInputType()
  }

  updateBtnClassNames() {
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
      this.renderer.addClass(this.ele().nativeElement, className)
    })
  }

  checkInputType() {
    const checkboxClassNames = ['w-6', 'h-6', 'relative', 'top-[6px]', 'accent-gray-600']

    if (this.ele().nativeElement.getAttribute('type') === VNFInputTypes.checkbox) {
      checkboxClassNames.forEach((className) => {
        this.renderer.addClass(this.ele().nativeElement, className)
      })
    }
  }
}
