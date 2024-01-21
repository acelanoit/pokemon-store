import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductsHeaderComponent } from './products-header.component';
import { commonDeclarations, commonImports, commonProviders } from '../../../../test-setup';

describe('ProductsHeaderComponent', () => {
  let component: ProductsHeaderComponent;
  let fixture: ComponentFixture<ProductsHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [...commonImports],
      declarations: [...commonDeclarations],
      providers: [...commonProviders]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ProductsHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
