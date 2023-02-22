import {
  trigger,
  transition,
  group,
  animate,
  style,
  query,
} from '@angular/animations';

export const easeAnimation = trigger('routeAnimations', [
  transition('* <=> *', [
    query(':enter', [style({ opacity: 0 })]),
    query(':leave', [style({ opacity: 1 })]),
    group([
      query(':enter', [animate('400ms ease-in-out', style({ opacity: 1 }))]),
      query(':leave', [animate('400ms ease-in-out', style({ opacity: 0 }))]),
    ]),
  ]),
]);
