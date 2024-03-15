import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-arrow-up',
  templateUrl: './arrow-up.component.html',
  styleUrls: ['./arrow-up.component.css']
})
export class ArrowUpComponent {
  showArrow: boolean = false

  @HostListener('window:scroll')
  onScroll() {
    window.scrollY > 280 ? this.showArrow = true : this.showArrow = false
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
