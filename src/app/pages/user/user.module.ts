import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserListComponent } from './user-list/user-list.component';
import { UserDetailsComponent } from './user-details/user-details.component';

export const routes = [
  { path: '', component: UserListComponent, pathMatch: 'full' },
];

@NgModule({
  declarations: [UserListComponent, UserDetailsComponent],
  imports: [RouterModule.forChild(routes), SharedModule],
})
export class UserModule {}
