import { Component, Input, OnInit } from '@angular/core';
import { Alert } from '../../interfaces/alert';

enum AlertType {
  SUCCESS = 'success',
  WARNING = 'warning',
  DANGER = 'danger',
  INFO = 'info'
}

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html'
})
export class AlertComponent implements OnInit {
  @Input() alerts: Alert[] = []
  @Input() dismissible: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  public close(alert: Alert) {
    this.alerts.splice(this.alerts.indexOf(alert), 1);
  }

  public danger(message: string, timeout?: number) {
    this.show(message, AlertType.DANGER, timeout)
  }

  public success(message: string, timeout?: number) {
    this.show(message, AlertType.SUCCESS, timeout)
  }

  public warning(message: string, timeout?: number) {
    this.show(message, AlertType.WARNING, timeout)
  }

  public info(message: string, timeout?: number) {
    this.show(message, AlertType.INFO, timeout)
  }

  /**
   * exibe o alerta baseado tipo e se for enviado um valor no timeout, 
   * o alerta irá fechar automaticamente
   * @param message texto do alert
   * @param type tipo do alerta (success, danger, warning e info)
   * @param timeout tempo para fechar o alert (ex: 1000 = 1s)
   */
  private show(message: string, type: string, timeout?: number) {
    const alert: Alert = {
      message,
      type,
      timeout
    };

    this.alerts.push(alert);

    /**
     * se for enviado um valor de timeout,
     * o alerta fechará automaticamente.
     */
    if (alert.timeout > 0) {
      setTimeout(() => {
        this.close(alert);
      }, alert.timeout);
    }
  }

  public clear(){
    this.alerts = [];
  }

}
