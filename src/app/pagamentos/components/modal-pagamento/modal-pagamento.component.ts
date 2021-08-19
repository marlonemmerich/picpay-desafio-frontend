import { Component, OnInit } from '@angular/core';
import * as M from 'materialize-css';
import MODAL_OPTIONS from '../../../shared/consts/modal.const';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Pagamento from '../../models/pagamento.model';
import { DatePickup } from '../../models/date-pickup';
import { LoadingService } from 'src/app/shared/service/loading.service';
import { PagamentosService } from '../../services/pagamentos.service';
import { finalize } from 'rxjs/operators';
import { ModalPagamentoService } from '../../services/modal-pagamento.service';

@Component({
  selector: 'app-modal-pagamento',
  templateUrl: './modal-pagamento.component.html',
  styleUrls: ['./modal-pagamento.component.scss']
})
export class ModalPagamentoComponent implements OnInit {
  private modalInstance;

  public maskDate = [/[0-3]/, /[0-9]/, '/',  /[0-1]/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];
  public maskHora = [/[0-9]/, /\d/, ':', /\d/, /\d/];

  formPagamento!: FormGroup;
  isSubmitted = false;
  estaEditando = false;
  pagamento: Pagamento = new Pagamento();
  dataPickup: DatePickup = new DatePickup();

  idModal = 'id-modal-pagamento';
  idDatePick = 'id-modal-pagamento-datepick-data';
  idTimePick = 'id-modal-pagamento-datepick-hora';

  constructor(
    private formBuilder: FormBuilder,
    private loadingService: LoadingService,
    private pagamentoService: PagamentosService,
    private modalPagamentoService: ModalPagamentoService
  ) { }

  ngOnInit() {
    this.registrarForm();
  }

  registrarForm() {
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
  }

  abrirModalEditar(pagamento: Pagamento) {
    this.abrir();
    this.estaEditando = true;
    this.pagamento = new Pagamento();
    Object.assign(this.pagamento, pagamento);

    // Obtendo data e hora para adicionarmos no nosso dataPickup
    this.dataPickup = new DatePickup();
    this.dataPickup.data = this.getDataFromDate(new Date(pagamento.date));
    this.dataPickup.hora = this.getTime(new Date(pagamento.date));

    this.registrarForm();
    this.setarCamposValidos();
  }

  abrirModalCriar() {
    this.abrir();
    this.estaEditando = false;
    this.pagamento = new Pagamento();
    this.dataPickup = new DatePickup();

    this.registrarForm();
  }

  private abrir() {
    this.estaEditando = false;
    this.inicializarElementos();
    this.modalInstance.open();
    this.resetarCampos();
  }

  fechar() {
    this.modalInstance.close();
  }

  resetarCampos() {
    this.formPagamento.reset();
    this.formPagamento.markAsPristine();
    this.formPagamento.markAsUntouched();
    this.formPagamento.updateValueAndValidity();

    window.setTimeout(() => {
      (document.getElementById(this.idModal)).querySelectorAll('.invalid, .valid').forEach((element) => {
        element.classList.remove('invalid', 'valid');
      });
      M.updateTextFields(); // Necessário para o materialize ajustar os campos
    }, 50);
  }

  setarCamposValidos() {
    window.setTimeout(() => { // timeout para poder montar os elementos em tela
      (document.getElementById(this.idModal)).querySelectorAll('.validate').forEach((element) => {
        element.classList.add('valid');
      });
      M.updateTextFields(); // Necessário para o materialize poder ajustar os elementos
    }, 50);
  }

  inicializarElementos() {
    const elementModal = document.getElementById(this.idModal);
    this.modalInstance = M.Modal.init(elementModal, MODAL_OPTIONS);
  }

  toISOFormat(dateTimeString: string) { // Ex.: recebemos "23/11/2021: 10:12"
    const [date, time] = dateTimeString.split(' ');
    const [DD, MM, YYYY] = date.split('/');
    const [HH, mm] = time.split(':');
    return `${YYYY}-${MM}-${DD}T${HH}:${mm}`;
  }

  getDataFromDate(dateObj: Date): string { // Obtemos string dd/mm/yyyy de um Date
    const ano = dateObj.getFullYear();
    const mes = (1 + dateObj.getMonth()).toString().padStart(2, '0');
    const dia = dateObj.getDate().toString().padStart(2, '0');

    return `${dia}/${mes}/${ano}`;
  }

  getTime(dateObj: Date): string { // retorna hh:mm string de um Date
    const horas = `${(dateObj.getHours() < 10 ? '0' : '')}${dateObj.getHours()}`;
    const minutos = `${(dateObj.getMinutes() < 10 ? '0' : '')}${dateObj.getMinutes()}`;
    return   `${horas}:${minutos}`;
  }

  enviarFormulario() {
    this.isSubmitted = true;
    if (this.formPagamento.invalid) {
      return;
    }

    const data = this.formPagamento.controls.data.value;
    const hora = this.formPagamento.controls.hora.value;

    this.formPagamento.patchValue({
      date: this.toISOFormat(`${data} ${hora}`)
    });

    if (this.estaEditando) {
      this.editarPagamento();
      return;
    }

    this.enviarPagamento();
  }

  enviarPagamento() {
    this.loadingService.exibir();
    this.pagamentoService.cadastrarPagamento(this.formPagamento.value)
      .pipe(
        finalize(() => {
          this.loadingService.esconder();
        })
      )
      .subscribe({
        next: (retorno) => {
          const parametros = {
            sucesso: true,
            objeto: retorno
          };
          this.modalPagamentoService.atualizarStatus(parametros);

          this.fechar();
          M.toast({html: 'Pagamento criado com sucesso!', displayLength: 3000, classes: 'green'});
        },
        error: error => {
          const mensagemDefault = 'Houve um erro ao tentar criar o pagamento';
          M.toast({html: (error && error.mensagem) ? error.mensagem : mensagemDefault, displayLength: 3000, classes: 'red'});
        },
    });
  }

  editarPagamento() {
    this.loadingService.exibir();
    this.pagamentoService.editarPagamento(this.pagamento.id, this.formPagamento.value)
      .pipe(
        finalize(() => {
          this.loadingService.esconder();
        })
      )
      .subscribe({
        next: (retorno) => {
          const parametros = {
            sucesso: true,
            objeto: retorno
          };
          this.modalPagamentoService.atualizarStatus(parametros);
          this.fechar();
          M.toast({html: 'Pagamento editado com sucesso!', displayLength: 3000, classes: 'green'});
        },
        error: error => {
          M.toast({html: (error && error.mensagem) ? error.mensagem : 'Houve um erro ao editar o pagamento', displayLength: 3000, classes: 'red'});
        },
    });
  }
}
