import { CommonModule } from '@angular/common'
import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Renderer2, contentChild, inject } from '@angular/core'

@Component({
  selector: 'vnf-label',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vnf-label.component.html',
  styleUrl: './vnf-label.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VNFLabelComponent implements AfterViewInit {
  #renderer = inject(Renderer2)

  ele = contentChild.required<ElementRef<HTMLElement>>('vnf')

  ngAfterViewInit() {
    this.updateClassNames()
    this.checkLabelValue()
  }

  updateClassNames() {
    const classNames = ['vnf-label', 'font-medium']

    classNames.forEach((className) => {
      this.#renderer.addClass(this.ele().nativeElement, className)
    })
  }

  checkLabelValue() {
    if (this.ele().nativeElement.getAttribute('required') === 'true') {
      const asteriskEle = this.#renderer.createElement('span')

      asteriskEle.innerText = ' *'
      this.#renderer.addClass(asteriskEle, 'text-red-600')
      this.#renderer.appendChild(this.ele().nativeElement, asteriskEle)
    }
  }
}
