import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class UsersService {

  constructor(private http: Http) { }

  all() {
    return this.http.get('./assets/test-api/users.json')
      .map(res => res.json())
      .catch(err => Observable.throw(err.json()));
  }

  findOne(id) {
    return this.http.get('./assets/test-api/users.json')
      .map(res => {
        let response = res.json();
        return response.find((user) => { return user.id === id; });
      });
  }

}
