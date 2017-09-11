import { TestBed, inject } from '@angular/core/testing';

import { ChatroomsService } from './chatrooms.service';

describe('ChatroomsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChatroomsService]
    });
  });

  it('should be created', inject([ChatroomsService], (service: ChatroomsService) => {
    expect(service).toBeTruthy();
  }));
});
