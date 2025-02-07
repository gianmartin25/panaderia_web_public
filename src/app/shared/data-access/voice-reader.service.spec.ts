import { TestBed } from '@angular/core/testing';

import { VoiceReaderService } from './voice-reader.service';

describe('VoiceReaderService', () => {
  let service: VoiceReaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VoiceReaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
