import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductBoxComponent } from './product-box.component';
import { commonDeclarations, commonImports, commonProviders } from '../../../../test-setup';

describe('ProductBoxComponent', () => {
  let component: ProductBoxComponent;
  let fixture: ComponentFixture<ProductBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [...commonImports],
      declarations: [...commonDeclarations],
      providers: [...commonProviders]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ProductBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
