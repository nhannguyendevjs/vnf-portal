import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core'

/**
 * @example
  <div class="scrollable-content" vnfInfiniteScroll (scrolled)="loadMoreData()">
    <!-- Your list of items -->
  </div>
 */
@Directive({
  selector: '[vnfInfiniteScroll]',
  standalone: true,
})
export class VnfInfiniteScrollDirective {
  @Input() scrollThreshold = 0
  @Output() scrolled = new EventEmitter<void>()

  @HostListener('scroll', ['$event'])
  onScroll(event: Event) {
    const element = event.target as HTMLElement
    const atBottom = element.scrollHeight - element.scrollTop <= element.clientHeight + this.scrollThreshold

    if (atBottom) {
      this.scrolled.emit()
    }
  }
}
