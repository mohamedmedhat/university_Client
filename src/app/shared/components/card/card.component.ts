import { Component, EventEmitter, Input, Output, signal } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  @Input() name = '';
  @Input() price = '';
  @Input() imgUrl: string | null = null;
  @Input() dates = '';
  @Output() onClick = new EventEmitter<void>();

  handleOnClick(){
    this.onClick.emit();
  }
}
