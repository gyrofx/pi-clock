import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { MopidyService } from './mopidy.service';

describe('MopidyService', () => {
  beforeEach(() => TestBed.configureTestingModule({ imports: [HttpClientTestingModule] }));

  it('should be created', () => {
    const service: MopidyService = TestBed.get(MopidyService);
    expect(service).toBeTruthy();
  });
});
