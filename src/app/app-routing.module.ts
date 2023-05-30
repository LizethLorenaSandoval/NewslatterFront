import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

import { LoginComponent } from './componentes/login/login.component';
import { RegistrarseComponent } from './componentes/registrarse/registrarse.component';
import { RecuperarcontrasenaComponent } from './componentes/recuperarcontrasena/recuperarcontrasena.component';
import { RecuperartokenComponent } from './componentes/recuperartoken/recuperartoken.component';
import { NavComponent } from './componentes/nav/nav.component';
import { NotFoundComponent } from './componentes/not-found/not-found.component';
import { HomeComponent } from './componentes/home/home.component';
import { PerfilComponent } from './componentes/perfil/perfil.component';
import { NavAdminIndexComponent } from './componentes/nav-admin-index/nav-admin-index.component';
import { AdminUsuariosComponent } from './componentes/admin-usuarios/admin-usuarios.component';
import { AdminRolComponent } from './componentes/admin-rol/admin-rol.component';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'index', component: LoginComponent},
  {path: 'registrarse', component: RegistrarseComponent},
  {path: 'recuperarcontrasena', component: RecuperarcontrasenaComponent},
  {path: 'recuperartoken', component: RecuperartokenComponent},
  {path: 'nav', component: NavComponent},
  {path: 'home', component: HomeComponent},
  {path: 'not-found', component: NotFoundComponent},
  {path: 'perfil', component: PerfilComponent},
  {path: 'nav-admin-index', component: NavAdminIndexComponent},
  {path: 'admin-usuarios', component: AdminUsuariosComponent },
  {path: 'admin-rol', component: AdminRolComponent},
  {path: '**', redirectTo: 'not-found'},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
