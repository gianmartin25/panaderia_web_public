import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaderEmailComponent } from './loader-email.component';

describe('LoaderEmailComponent', () => {
  let component: LoaderEmailComponent;
  let fixture: ComponentFixture<LoaderEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoaderEmailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoaderEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
