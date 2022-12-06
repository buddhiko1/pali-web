import {
  animation,
  trigger,
  transition,
  query,
  style,
  stagger,
  animate,
} from '@angular/animations';

export const MenuAnimation = trigger('openMenu', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate(1000, style({ opacity: 1 })),
  ]),
  transition(':leave', [animate(1000, style({ opacity: 0 }))]),
]);
