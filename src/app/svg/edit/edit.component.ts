import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-chat-svg',
  standalone: true,
  imports: [],
  templateUrl: './chat.component.svg',
})
export class ChatSvgComponent {
  @Input() class: string[] | string = [''];
  @Input() size = '';
}
