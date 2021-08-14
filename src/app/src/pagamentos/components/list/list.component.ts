import { Component, OnInit } from '@angular/core';
import * as M from 'materialize-css';
import { ModalPagamentoComponent } from 'src/app/pagamentos/components/modal-pagamento/modal-pagamento.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems);
  }

}
