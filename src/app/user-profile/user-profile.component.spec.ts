import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { UserProfileModule } from './user-profile.module';
import { UserProfileComponent } from './user-profile.component';
import { UsersService } from '../services/users/users.service';

// Mocks
const userList = require('../../assets/test-api/users.json');

class MockActivatedRoute {
  snapshot = { params: { id: '2' }};
}

class MockUsersService {
  findOne = jasmine.createSpy('findOne').and.callFake((id) => {
    return Observable.of(userList[1]);
  });
}

describe('UserProfileComponent', () => {
  let component: UserProfileComponent;
  let fixture: ComponentFixture<UserProfileComponent>;
  let usersService: UsersService;
  let userPanel: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ UserProfileModule ]
    });
  }));

  beforeEach(async(() => {
    TestBed.overrideComponent(UserProfileComponent, {
      set: {
        providers: [
          { provide: ActivatedRoute, useClass: MockActivatedRoute },
          { provide: UsersService, useClass: MockUsersService }
        ]
      }
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfileComponent);
    component = fixture.componentInstance;

    usersService = fixture.debugElement.injector.get(UsersService);

    fixture.detectChanges();

    userPanel = fixture.debugElement.query(By.css('.panel-title'));
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with a call to get the current user via route params', () => {
    expect(usersService.findOne).toHaveBeenCalledWith('2');
    expect(component.user).toEqual(userList[1]);
  });

  it('should display the user in the view', () => {
    expect(userPanel.nativeElement.textContent).toEqual('Bob');
  });
});
