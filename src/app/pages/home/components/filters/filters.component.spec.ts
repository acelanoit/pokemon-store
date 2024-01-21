import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FiltersComponent } from './filters.component';
import { commonDeclarations, commonImports, commonProviders } from '../../../../test-setup';

describe('FiltersComponent', () => {
  let component: FiltersComponent;
  let fixture: ComponentFixture<FiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [...commonImports],
      declarations: [...commonDeclarations],
      providers: [...commonProviders]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
