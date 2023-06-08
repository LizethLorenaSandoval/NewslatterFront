import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
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
import { AdminContentComponent } from './componentes/admin-content/admin-content.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrarseComponent,
    RecuperarcontrasenaComponent,
    RecuperartokenComponent,
    NavComponent,
    NotFoundComponent,
    HomeComponent,
    PerfilComponent,
    NavAdminIndexComponent,
    AdminUsuariosComponent,
    AdminRolComponent,
    AdminContentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
