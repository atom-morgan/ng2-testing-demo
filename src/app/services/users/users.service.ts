import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/map';

@Injectable()
export class UsersService {

  constructor(private http: Http) { }

  all() {
    return this.http.get('./assets/test-api/users.json')
      .map(res => res.json());
  }

}
