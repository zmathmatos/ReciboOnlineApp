import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
  ReactiveFormsModule,
} from '@angular/forms';
import { NavController } from '@ionic/angular';
import { UtilService } from '../../../../services/util.service';
import { FuncionarioService } from './../../../../services/funcionario.service';

@Component({
  selector: 'app-func-adicionar',
  templateUrl: './func-adicionar.page.html',
  styleUrls: ['./func-adicionar.page.scss'],
})
export class FuncAdicionarPage implements OnInit {
  public formGroup: FormGroup;
  loading: boolean = false;

  constructor(
    public formBuilder: FormBuilder,
    private navCtrl: NavController,
    private funcionarioService: FuncionarioService,
    private utilService: UtilService
  ) {
    this.formGroup = formBuilder.group({
      matricula: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.maxLength(10),
          Validators.minLength(3),
        ])
      ),
      nome: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.maxLength(150),
          Validators.minLength(3),
        ])
      ),
      email: new FormControl('', Validators.email),
      senha: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.maxLength(32),
          Validators.minLength(3),
        ])
      ),
    });
  }

  ngOnInit() {}

  adicionar() {
    // Obtendo os valores dos campos do formulário
    const formData = this.formGroup.value;
    const matricula = formData.matricula;
    const nome = formData.nome;
    const email = formData.email;
    const senha = formData.senha;

    // campos obrigatórios não preenchidos
    if (!matricula || !nome || !email || !senha) {
      this.utilService.showAlert(
        'Campos obrigatórios não preenchidos. Preencha todos os campos.'
      );
      return; // Impede a chamada à API se os campos obrigatórios estiverem em branco
    }

    this.loading = true;

    this.funcionarioService
      .adicionar(formData)
      .then((response: any) => {
        console.log('Resposta da API:', response);
        this.loading = false;

        if (response.success === true) {
          this.utilService.showAlert(
            'Funcionário cadastrado com sucesso!',
            () => {
              this.navCtrl.navigateRoot('adm/func-consultar');
            }
          );
        } else {
          this.utilService.showError(response);
        }
      })
      .catch((error) => {
        console.log('Erro na chamada à API:', error);
        this.loading = false;
        this.utilService.showAlert(
          'Desculpe, a operação falhou. Tente novamente mais tarde.'
        );
      });
  }
}
