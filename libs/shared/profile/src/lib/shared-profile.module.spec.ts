import { async, TestBed } from '@angular/core/testing';
import { SharedProfileModule } from './shared-profile.module';

describe('SharedProfileModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedProfileModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(SharedProfileModule).toBeDefined();
  });
});
