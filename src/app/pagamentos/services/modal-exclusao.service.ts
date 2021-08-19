import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { RetornoModal } from 'src/app/core/interfaces/retorno-modal';
import Pagamento from '../models/pagamento.model';

@Injectable({
  providedIn: 'root'
})
export class ModalExclusaoService {

  public statusExclusao: BehaviorSubject<RetornoModal> = new BehaviorSubject<RetornoModal>({sucesso: null, objeto: null});
  pagamentoExclusao: Pagamento = new Pagamento();
  constructor() { }

  private setSituacaoExclusao(situacaoAtualizada) {
    this.statusExclusao.next(situacaoAtualizada);
  }

  atualizarStatusExclusao(param: any) {
    this.setSituacaoExclusao(param);
  }

}
