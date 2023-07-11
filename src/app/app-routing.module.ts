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
import { AdminCelulasComponent } from './componentes/admin-celulas/admin-celulas.component';
import { AdminTipoDocumentoComponent } from './componentes/admin-tipo-documento/admin-tipo-documento.component';
import { AuthguardGuard } from './guard/authguard.guard';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'home', component: HomeComponent, canActivate:[AuthguardGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'index', component: LoginComponent, canActivate:[AuthguardGuard]},
  {path: 'registrarse', component: RegistrarseComponent},
  {path: 'recuperarcontrasena', component: RecuperarcontrasenaComponent},
  {path: 'recuperartoken', component: RecuperartokenComponent},
  {path: 'nav', component: NavComponent, canActivate:[AuthguardGuard]},
  {path: 'not-found', component: NotFoundComponent},
  {path: 'perfil', component: PerfilComponent, canActivate:[AuthguardGuard]},
  {path: 'nav-admin-index', component: NavAdminIndexComponent, canActivate:[AuthguardGuard]},
  {path: 'admin-usuarios', component: AdminUsuariosComponent, canActivate:[AuthguardGuard]},
  {path: 'admin-rol', component: AdminRolComponent, canActivate:[AuthguardGuard]},
  {path: 'admin-celulas', component: AdminCelulasComponent, canActivate:[AuthguardGuard]},
  {path: 'admin-tipo_documento', component: AdminTipoDocumentoComponent, canActivate:[AuthguardGuard]},
  {path: '**', redirectTo: 'not-found'},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthguardGuard]
})
export class AppRoutingModule { }
