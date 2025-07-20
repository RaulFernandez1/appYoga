import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuards } from './guards/auth.guard';
import { GruposComponent } from './pages/grupos/grupos.component';
import { PrincipalLayoutComponent } from './pages/principal-layout/principal-layout.component';
import { AlumnosComponent } from './pages/alumnos/alumnos.component';
import { TestServicesComponent } from './pages/test-services/test-services.component';
import { NivelesComponent } from './pages/niveles/niveles.component';
import { GastosComponent } from './pages/gastos/gastos.component';
import { UserHomeComponent } from './pages/user-home/user-home.component';
import { RecibosComponent } from './pages/recibos/recibos.component';
import { UserMensajesComponent } from './pages/user-mensajes/user-mensajes.component';

export const routes: Routes = [

    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'userHome',
        component: UserHomeComponent,
        canActivate: [AuthGuards],
    },
    {
        path: 'userHome/mensajes',
        component: UserMensajesComponent,
        canActivate: [AuthGuards]
    },
    {
        path: 'home',
        component: PrincipalLayoutComponent,
        canActivate: [AuthGuards],
        children: [
            {
                path: '',
                component: HomeComponent
            },
            {
                path: 'grupos',
                component: GruposComponent
            },
            {
                path: 'alumnos',
                component: AlumnosComponent
            }, 
            {
                path: 'niveles',
                component: NivelesComponent
            },
            {
                path: 'gastos',
                component: GastosComponent
            },
            {
                path: 'recibos',
                component: RecibosComponent
            },
            {
                path: 'test',
                component: TestServicesComponent
            }
        ]
    },
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    }

];
