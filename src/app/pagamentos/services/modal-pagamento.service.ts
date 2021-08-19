import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { RetornoModal } from 'src/app/core/interfaces/retorno-modal';
import Pagamento from '../models/pagamento.model';

@Injectable({
  providedIn: 'root'
})
export class ModalPagamentoService {

  public status: BehaviorSubject<RetornoModal> = new BehaviorSubject<RetornoModal>({sucesso: null, objeto: null});
  pagamento: Pagamento = new Pagamento();
  constructor() { }

  private setSituacao(situacaoAtualizada) {
    this.status.next(situacaoAtualizada);
  }

  atualizarStatus(param: RetornoModal) {
    this.setSituacao(param);
  }

}
