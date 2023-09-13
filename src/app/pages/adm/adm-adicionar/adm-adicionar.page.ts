import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { UtilService } from '../../../../services/util.service';
import { UsuarioService } from './../../../../services/usuario.service';

@Component({
  selector: 'app-adm-adicionar',
  templateUrl: './adm-adicionar.page.html',
  styleUrls: ['./adm-adicionar.page.scss'],
})
export class AdmAdicionarPage implements OnInit {
  public formGroup: FormGroup;
  loading: boolean = false;

  constructor(public formBuilder: FormBuilder, private navCtrl: NavController, private usuarioService: UsuarioService, private utilService: UtilService) {
    this.formGroup = formBuilder.group({
      nome: new FormControl('', Validators.compose([
        Validators.required,
        Validators.maxLength(150),
        Validators.minLength(3),
      ])),
      email: new FormControl('', Validators.email),
      funcao: new FormControl('', Validators.compose([
        Validators.required,
        Validators.maxLength(150),
        Validators.minLength(3),
      ])),
      senha: new FormControl('', Validators.compose([
        Validators.required,
        Validators.maxLength(32),
        Validators.minLength(3),
      ])),
    });
  }

  ngOnInit() {}

  adicionar() {
    this.utilService.showLoading();
    this.loading = true;
    this.usuarioService.adicionar(this.formGroup.value)
      .then((response: any) => {
        this.utilService.hideLoading();
        this.loading = false;
        if (response.success == true) {
          this.utilService.showAlert("Operação realizada com sucesso!", () => {
            this.navCtrl.navigateRoot('adm/adm-consultar');
          });
        }
        else {
          this.utilService.hideLoading();
          this.utilService.showError(response);
        }
      })
      .catch((error) => {
        this.loading = false;
        this.utilService.showAlert("Desculpe, operação falhou! Tente novamente mais tarde.");
      });
  }


}
