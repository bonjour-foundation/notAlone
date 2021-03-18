import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule)},
    {path: 'edit-circle', loadChildren: () => import('./pages/edit-circle/edit-circle.module').then(m => m.EditCirclePageModule)},
    {path: 'schedule', loadChildren: () => import('./pages/schedule/schedule.module').then(m => m.SchedulePageModule)},
    {path: 'account', loadChildren: () => import('./pages/account/account.module').then(m => m.AccountPageModule)},

    {path: 'intro', loadChildren: () => import('./pages/intro/intro.module').then(m => m.IntroPageModule)},

    {path: 'create-circle', loadChildren: () => import('./pages/on-boarding/create-circle/create-circle.module').then(m => m.CreateCirclePageModule)},
    {path: 'create-user', loadChildren: () => import('./pages/on-boarding/create-user/create-user.module').then(m => m.CreateUserPageModule)},
    {path: 'create-user/:centerUser', loadChildren: () => import('./pages/on-boarding/create-user/create-user.module').then(m => m.CreateUserPageModule)},
    {path: 'share-circle', loadChildren: () => import('./pages/on-boarding/share-circle/share-circle.module').then(m => m.ShareCirclePageModule)},
    {path: 'done', loadChildren: () => import('./pages/on-boarding/done/done.module').then(m => m.DonePageModule)},
    {path: 'done/:centerUser', loadChildren: () => import('./pages/on-boarding/done/done.module').then(m => m.DonePageModule)},
    {path: 'signin', loadChildren: () => import('./pages/on-boarding/sign-in/sign-in.module').then(m => m.SignInPageModule)},
    {path: 'signin/:centerUser', loadChildren: () => import('./pages/on-boarding/sign-in/sign-in.module').then(m => m.SignInPageModule)},
    {path: 'create-email', loadChildren: () => import('./pages/on-boarding/create-email/create-email.module').then(m => m.CreateEmailPageModule)},
    {path: 'create-email/:centerUser', loadChildren: () => import('./pages/on-boarding/create-email/create-email.module').then(m => m.CreateEmailPageModule)},
    {path: 'request-reset-password', loadChildren: () => import('./pages/on-boarding/request-reset-password/request-reset-password.module').then(m => m.RequestResetPasswordPageModule)},
    {path: 'request-reset-password/:centerUser', loadChildren: () => import('./pages/on-boarding/request-reset-password/request-reset-password.module').then(m => m.RequestResetPasswordPageModule)},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
