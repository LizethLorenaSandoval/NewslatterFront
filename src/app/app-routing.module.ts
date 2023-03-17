import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

import { LoginComponent } from './componentes/login/login.component';
import { RegistrarseComponent } from './componentes/registrarse/registrarse.component';
import { RecuperarcontrasenaComponent } from './componentes/recuperarcontrasena/recuperarcontrasena.component';
import { RecuperartokenComponent } from './componentes/recuperartoken/recuperartoken.component';
import { NavComponent } from './componentes/nav/nav.component';
import { IndexComponent } from './componentes/index/index.component';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'index', component: LoginComponent},
  {path: 'registrarse', component: RegistrarseComponent},
  {path: 'recuperarcontrasena', component: RecuperarcontrasenaComponent},
  {path: 'recuperartoken', component: RecuperartokenComponent},
  {path: 'nav', component: NavComponent},
  {path: 'home', component: IndexComponent}

  // {path: 'not-found', component: NotFoundComponent},
  // {path: '**', redirectTo: 'not-found'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
