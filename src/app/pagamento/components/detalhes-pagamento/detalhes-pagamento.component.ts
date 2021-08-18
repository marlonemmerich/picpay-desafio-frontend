import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Pagamento from 'src/app/pagamentos/models/pagamento.model';

@Component({
  selector: 'app-detalhes-pagamento',
  templateUrl: './detalhes-pagamento.component.html',
  styleUrls: ['./detalhes-pagamento.component.scss']
})
export class DetalhesPagamentoComponent implements OnInit {

  pagamento = new Pagamento();

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(
      (data) => {
        Object.assign(this.pagamento, data.pagamento);
      }
    );
  }

  redirecionarRetornarListagem() {
    this.router.navigate(['/pagamentos']);
  }

}
