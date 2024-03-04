import { CommonModule } from '@angular/common'
import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Renderer2, contentChild, inject } from '@angular/core'

@Component({
  selector: 'vnf-error-message',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vnf-error-message.component.html',
  styleUrl: './vnf-error-message.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VNFErrorMessageComponent implements AfterViewInit {
  #renderer = inject(Renderer2)

  ele = contentChild.required<ElementRef<HTMLElement>>('vnf')

  ngAfterViewInit() {
    this.updateClassNames()
  }

  updateClassNames() {
    const classNames = ['vnf-error-message', 'text-red-600', 'text-sm']

    classNames.forEach((className) => {
      this.#renderer.addClass(this.ele().nativeElement, className)
    })
  }
}
