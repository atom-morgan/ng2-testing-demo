import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { UsersService } from '../services/users/users.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  user;

  constructor(private activatedRoute: ActivatedRoute, private usersService: UsersService) { }

  ngOnInit() {
    let userId = this.activatedRoute.snapshot.params.id;
    this.usersService.findOne(userId).subscribe((res) => {
      this.user = res;
    });
  }

}
