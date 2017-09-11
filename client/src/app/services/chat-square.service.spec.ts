import { TestBed, inject } from '@angular/core/testing';

import { ChatSquareService } from './chat-square.service';

describe('ChatSquareService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChatSquareService]
    });
  });

  it('should be created', inject([ChatSquareService], (service: ChatSquareService) => {
    expect(service).toBeTruthy();
  }));
});
