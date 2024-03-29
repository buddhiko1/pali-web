import { Directive, HostListener } from '@angular/core';
import { NavigationService } from '../services/navigation.service';

@Directive({
  selector: '[appBackButton]',
  standalone: true,
})
export class BackButtonDirective {
  constructor(private navigation: NavigationService) {}

  @HostListener('click')
  onClick(): void {
    this.navigation.goBack();
  }
}
