import {
  trigger,
  transition,
  group,
  animate,
  style,
  query,
} from '@angular/animations';

export const RouteAnimation = trigger('routeAnimations', [
  transition('* <=> *', [
    query(
      ':enter',
      [style({ opacity: 0, position: 'absolute', top: '100vh' })],
      { optional: true }
    ),
    query(':leave', [style({ opacity: 1 })], { optional: true }),
    group([
      query(':enter', [animate('500ms ease-in', style({ opacity: 1 }))], {
        optional: true,
      }),
      query(':leave', [animate('500ms ease-out', style({ opacity: 0 }))], {
        optional: true,
      }),
    ]),
  ]),
]);
