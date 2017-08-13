import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Observable } from 'rxjs/Rx';

import { HomeModule } from './home.module';
import { HomeComponent } from './home.component';
import { UsersService } from '../services/users/users.service';

// Mocks
const userList = require('../../assets/test-api/users.json');

class MockUsersService {
  all = jasmine.createSpy('all').and.callFake(() => {
    return Observable.of(userList);
  });
}

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let usersService: UsersService;
  let userPanels: DebugElement[];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HomeModule ]
    });
  }));

  beforeEach(async(() => {
    TestBed.overrideComponent(HomeComponent, {
      set: {
        providers: [
          { provide: UsersService, useClass: MockUsersService }
        ]
      }
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;

    usersService = fixture.debugElement.injector.get(UsersService);
    fixture.detectChanges();
    userPanels = fixture.debugElement.queryAll(By.css('.panel-title'));
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with a call to the UsersService to get a list of users', () => {
    expect(usersService.all).toHaveBeenCalled();
    expect(component.users).toEqual(userList);
  });

  it('should display the users in the view', () => {
    expect(userPanels.length).toEqual(4);
    expect(userPanels[0].nativeElement.textContent).toEqual('Jane');
    expect(userPanels[1].nativeElement.textContent).toEqual('Bob');
    expect(userPanels[2].nativeElement.textContent).toEqual('Jim');
    expect(userPanels[3].nativeElement.textContent).toEqual('Bill');
  })
});
