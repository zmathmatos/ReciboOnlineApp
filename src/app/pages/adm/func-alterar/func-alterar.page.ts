import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { NavController } from '@ionic/angular';
import { UtilService } from '../../../../services/util.service';
import { FuncionarioService } from '../../../../services/funcionario.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-func-alterar',
  templateUrl: './func-alterar.page.html',
  styleUrls: ['./func-alterar.page.scss'],
})
export class FuncAlterarPage implements OnInit {
  public formGroup: FormGroup;
  loading: boolean = false;
  empresaCollection: any[] = [];
  funcionario: any;
  idFuncionario: any;

  constructor(
    private route: ActivatedRoute,
    public formBuilder: FormBuilder,
    private navCtrl: NavController,
    private funcionarioService: FuncionarioService,
    private utilService: UtilService
  ) {

    this.idFuncionario = this.route.snapshot.paramMap.get('id');

    this.formGroup = formBuilder.group({
      idFucionario: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      nome: new FormControl('', Validators.compose([
          Validators.required,
          Validators.maxLength(150),
          Validators.minLength(3),
      ])),
      matricula: new FormControl('', Validators.compose([
        Validators.required,
        Validators.maxLength(10),
        Validators.minLength(1),
      ])),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.email,
      ])),
    });

  }

  ionViewDidEnter() {
    this.obterFuncionarioPorId();
  }

  obterFuncionarioPorId() {
    this.loading = true;

    this.funcionarioService.obterPorId(this.idFuncionario)
      .then((response: any) => {
        this.loading = false;
        this.funcionario = response.data;

        //Popula o formulario
        this.formGroup.controls.matricula.setValue(this.funcionario.matricula);
        this.formGroup.controls.nome.setValue(this.funcionario.nome);
        this.formGroup.controls.email.setValue(this.funcionario.email);
      })
      .catch((erro) => {
        this.loading = false;
        this.utilService.showAlert(
          'Desculpe, operação falhou! Tente novamente mais tarde.'
        );
        console.error(erro);
      });
  }

  ngOnInit() {}

  alterar() {
    this.loading = true;
    let form = this.formGroup.value;
    form.id = this.idFuncionario;
    this.funcionarioService.alterar(form)
      .then((response: any) => {
        this.loading = false;
        if (response.success == true) {
          this.utilService.showAlert('Operação realizada com sucesso!', () => {
            this.navCtrl.navigateRoot('adm/func-consultar');
          });
        } else {
          this.utilService.showError(response);
        }
      })
      .catch((error) => {
        this.loading = false;

        this.utilService.showAlert('Desculpe, operação falhou! Tente novamente mais tarde.');
      });
  }
}
