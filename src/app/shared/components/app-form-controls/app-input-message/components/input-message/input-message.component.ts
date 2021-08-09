import { Component, Input, OnInit } from '@angular/core';

enum MessageType {
  SUCCESS = 'success',
  WARNING = 'warning',
  DANGER = 'danger',
  SECONDARY = 'secondary'
}

@Component({
  selector: 'app-input-message',
  templateUrl: './input-message.component.html',
  styleUrls: ['./input-message.component.scss']
})
export class InputMessageComponent implements OnInit {

  @Input() message: string = '';
  @Input() type!: MessageType;
 
  constructor() {}
 
  ngOnInit(): void {
    if (this.type !== MessageType.WARNING && 
      this.type !== MessageType.SUCCESS && 
      this.type !== MessageType.DANGER
    ) {
      this.type = MessageType.SECONDARY;
    }
  }


}
