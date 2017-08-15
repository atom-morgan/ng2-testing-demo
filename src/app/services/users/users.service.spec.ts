import { TestBed, inject } from '@angular/core/testing';
import { HttpModule, Http, BaseRequestOptions, ResponseOptions, Response } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { UsersService } from './users.service';

describe('UsersService', () => {
  let userList = require('../../../assets/test-api/users.json');
  let usersService, mockBackend;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpModule ],
      providers: [
        UsersService,
        MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          useFactory: (mockBackend, options) => {
            return new Http(mockBackend, options);
          },
          deps: [ MockBackend, BaseRequestOptions ]
        }
      ]
    });
  });

  beforeEach(inject([UsersService, MockBackend], (_usersService, _mockBackend) => {
    usersService = _usersService;
    mockBackend = _mockBackend;
  }));

  it('should exist', () => {
    expect(usersService).toBeDefined();
  });

  it('should have an all method', () => {
    expect(usersService.all).toBeDefined();
  });

  it('should have a findOne method', () => {
    expect(usersService.findOne).toBeDefined();
  });

  describe('.all()', () => {
    it('should return a list of users', () => {
      mockBackend.connections.subscribe((connection) => {
        connection.mockRespond(new Response(new ResponseOptions({
          status: 200,
          body: JSON.stringify(userList)
        })));
      });

      usersService.all().subscribe(res => {
        expect(res).toEqual(userList);
      });
    });

    it('should throw an error if no users are found', () => {
      mockBackend.connections.subscribe((connection) => {
        connection.mockError(new Response(new ResponseOptions({
          status: 404,
          body: JSON.stringify({})
        })));
      });

      usersService.all().subscribe(res => {}, (err) => {
        expect(err).toBeDefined();
      });
    });
  });

  describe('.findOne()', () => {
    it('should return a single user', () => {
      mockBackend.connections.subscribe((connection) => {
        connection.mockRespond(new Response(new ResponseOptions({
          status: 200,
          body: JSON.stringify(userList)
        })));
      });

      usersService.findOne('2').subscribe(res => {
        expect(res).toEqual(userList[1]);
      });
    });
  });
});
