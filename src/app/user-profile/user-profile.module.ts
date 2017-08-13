import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserProfileComponent } from './user-profile.component';
import { UserProfileRoutingModule } from './user-profile-routing.module';

import { UsersService } from '../services/users/users.service';

@NgModule({
  imports: [
    CommonModule,
    UserProfileRoutingModule
  ],
  declarations: [UserProfileComponent],
  providers: [UsersService]
})
export class UserProfileModule { }
