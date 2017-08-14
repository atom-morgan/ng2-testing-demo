import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
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
  let profileLinks: DebugElement[];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HomeModule
      ]
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
    fixture.detectChanges();

    usersService = fixture.debugElement.injector.get(UsersService);
    userPanels = fixture.debugElement.queryAll(By.css('.panel-title'));
    profileLinks = fixture.debugElement.queryAll(By.css('a'));
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
  });

  it('should have routerLink set to the user profile', () => {
    expect(profileLinks[0].attributes['ng-reflect-router-link']).toEqual('/user/1');
    expect(profileLinks[1].attributes['ng-reflect-router-link']).toEqual('/user/2');
    expect(profileLinks[2].attributes['ng-reflect-router-link']).toEqual('/user/3');
    expect(profileLinks[3].attributes['ng-reflect-router-link']).toEqual('/user/4');
  });
});
