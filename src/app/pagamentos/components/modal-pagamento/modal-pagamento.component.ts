import { Component, OnInit } from '@angular/core';
import * as M from 'materialize-css';
import { DatePipe, CurrencyPipe } from '@angular/common';
import MODAL_OPTIONS from '../../../shared/consts/modal.const';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Pagamento from '../../models/pagamento.model';
import { DatePickup } from '../../models/date-pickup';
import { LoadingService } from 'src/app/shared/service/loading.service';
import { PagamentosService } from '../../services/pagamentos.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-modal-pagamento',
  templateUrl: './modal-pagamento.component.html',
  styleUrls: ['./modal-pagamento.component.scss']
})
export class ModalPagamentoComponent implements OnInit {
  private modalInstance;
  private datePickInstance;
  private timePickInstance;
  private currencyPipe: CurrencyPipe;

  public maskDate = [/[0-3]/, /[0-9]/, '/',  /[0-1]/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];
  public maskHora = [/[0-9]/, /\d/, ':', /\d/, /\d/];

  formPagamento!: FormGroup;
  isSubmitted: boolean = false;
  estaEditando: boolean = false;
  pagamento: Pagamento = new Pagamento();
  dataPickup: DatePickup = new DatePickup();

  idModal = 'id-modal-pagamento';
  idDatePick = 'id-modal-pagamento-datepick-data';
  idTimePick = 'id-modal-pagamento-datepick-hora';

  constructor(
    private formBuilder: FormBuilder,
    private loadingService: LoadingService,
    private pagamentoService: PagamentosService
  ) { }

  ngOnInit() {
    this.formPagamento = this.formBuilder.group({
      name: [this.pagamento.name, Validators.required],
      username: [this.pagamento.username, Validators.required],
      title: [this.pagamento.title],
      value: [this.pagamento.value, Validators.required],
      data: [this.dataPickup.data, Validators.required],
      hora: [this.dataPickup.hora, Validators.required],
      date: [this.pagamento.date],
      isPayed: [this.pagamento.isPayed],
    });

    // this.formPagamento.valueChanges.subscribe((form) => {
    //   if(form.data) {
    //     if(form.data) {
    //       let splitedData = form.date.split('/');
    //       if(splitedData[0].length === 4) {
    //         this.formPagamento.patchValue({
    //           value: form.value.replace(splitedData[])
    //         }, {emitEvent: false});
    //       }
    //       }
    //     }
    //   }
    // });

  }

  abrirModalEditar(pagamento: Pagamento) {
    this.estaEditando = true;
    this.pagamento = pagamento;

    this.inicializarElementos();
    this.modalInstance.open();
  }

  abrirModalCriar() {
    this.estaEditando = false;
    // this.pagamento = new Pagamento();

    this.inicializarElementos();
    this.modalInstance.open();
  }

  hide() {
    this.modalInstance.close();
  }

  inicializarElementos() {
    var elementModal = document.getElementById(this.idModal);
    this.modalInstance = M.Modal.init(elementModal, MODAL_OPTIONS);
  }

  toISOFormat(dateTimeString: string) { // "23/10/2015"
    let [date, time] = dateTimeString.split(' ');
    let [DD, MM, YYYY] = date.split('/');
    let [HH, mm] = time.split(':');
    return `${YYYY}-${MM}-${DD}T${HH}:${mm}`;
  }

  enviarPagamento() {
    this.isSubmitted = true;
    if (this.formPagamento.invalid) {
      return;
    }

    this.formPagamento.patchValue({
      date: this.toISOFormat(`${this.formPagamento.controls['data'].value} ${this.formPagamento.controls['hora'].value}`)
    });

    console.log('this.formPagamento.value', this.formPagamento.value);
    this.loadingService.exibir();
    this.pagamentoService.cadastrarPagamento(this.formPagamento.value)
      .pipe(
        finalize(() => {
          this.loadingService.esconder();
        })
      )
      .subscribe({
        next: () => {
          // let parametros = {
          //   sucesso: true,
          //   objeto: this.pagamentoExclusao
          // }
          // this.modalExlusaoService.atualizarStatusExclusao(parametros);
          this.hide();
          M.toast({html: 'Pagamento criado com sucesso!', displayLength: 3000, classes: 'green'});
        },
        error: error => {
          M.toast({html: (error && error.mensagem) ? error.mensagem : 'Houve um erro ao tentar criar o pagamento', displayLength: 3000, classes: 'red'});
        },
    });
  }
}
