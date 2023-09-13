import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthorizeGuard } from './guards/authorize.guard';
import { AuthorizeGuardAdmin } from './guards/authorize-admin.guard';
import { AuthorizeGuardFuncionario } from './guards/authorize-funcionario.guard';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'funcionario/login',
    pathMatch: 'full',
  },
  {
    path: 'funcionario/login',
    loadChildren: () =>
      import('./pages/funcionario/acesso/login/login.module').then(
        (m) => m.LoginPageModule
      ),
  },
  {
    path: 'adm/login',
    loadChildren: () =>
      import('./pages/adm/acesso/login/login.module').then(
        (m) => m.LoginPageModule
      ),
  },
  {
    path: 'funcionario/home',
    canActivate: [AuthorizeGuardFuncionario],
    loadChildren: () =>
      import('./pages/funcionario/home/home.module').then(
        (m) => m.HomePageModule
      ),
  },
  {
    path: 'funcionario/recibo-detalhar',
    canActivate: [AuthorizeGuardFuncionario],
    loadChildren: () =>
      import('./pages/funcionario/recibo-detalhar/recibo-detalhar.module').then(
        (m) => m.ReciboDetalharPageModule
      ),
  },
  {
    path: 'adm/home',
    canActivate: [AuthorizeGuard],
    loadChildren: () =>
      import('./pages/adm/home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: 'adm/func-consultar',
    canActivate: [AuthorizeGuard],
    loadChildren: () =>
      import('./pages/adm/func-consultar/func-consultar.module').then(
        (m) => m.FuncConsultarPageModule
      ),
  },
  {
    path: 'adm/relatorios',
    canActivate: [AuthorizeGuard],
    loadChildren: () =>
      import('./pages/adm/relatorios/relatorios.module').then(
        (m) => m.RelatoriosPageModule
      ),
  },
  {
    path: 'adm/relatorio-visualizacoes',
    canActivate: [AuthorizeGuard],
    loadChildren: () =>
      import(
        './pages/adm/relatorios/relatorio-visualizacoes/relatorio-visualizacoes.module'
      ).then((m) => m.RelatorioVisualizacoesPageModule),
  },
  {
    path: 'adm/func-alterar/:id',
    canActivate: [AuthorizeGuard],
    loadChildren: () =>
      import('./pages/adm/func-alterar/func-alterar.module').then(
        (m) => m.FuncAlterarPageModule
      ),
  },
  {
    path: 'adm/func-adicionar',
    canActivate: [AuthorizeGuard],
    loadChildren: () =>
      import('./pages/adm/func-adicionar/func-adicionar.module').then(
        (m) => m.FuncAdicionarPageModule
      ),
  },
  {
    path: 'adm/adm-consultar',
    canActivate: [AuthorizeGuard],
    loadChildren: () =>
      import('./pages/adm/adm-consultar/adm-consultar.module').then(
        (m) => m.AdmConsultarPageModule
      ),
  },
  {
    path: 'adm/adm-adicionar',
    canActivate: [AuthorizeGuard],
    loadChildren: () =>
      import('./pages/adm/adm-adicionar/adm-adicionar.module').then(
        (m) => m.AdmAdicionarPageModule
      ),
  },
  {
    path: 'adm/publicar-recibo',
    canActivate: [AuthorizeGuard],
    loadChildren: () =>
      import('./pages/adm/publicar-recibo/publicar-recibo.module').then(
        (m) => m.PublicarReciboPageModule
      ),
  },
  {
    path: 'adm/solicitacoes',
    loadChildren: () =>
      import('./pages/adm/solicitacoes/solicitacoes.module').then(
        (m) => m.SolicitacoesPageModule
      ),
  },
  {
    path: 'adm/trocar-senha',
    loadChildren: () => import('./pages/adm/acesso/trocar-senha/trocar-senha.module').then( m => m.TrocarSenhaPageModule)
  },
  {
    path: 'funcionario/trocar-senha',
    loadChildren: () => import('./pages/funcionario/acesso/trocar-senha/trocar-senha.module').then( m => m.TrocarSenhaPageModule)
  },
  {
    path: 'funcionario/criar-conta',
    loadChildren: () => import('./pages/funcionario/acesso/criar-conta/criar-conta.module').then( m => m.CriarContaPageModule)
  },



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
