import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { commonDeclarations, commonImports, commonProviders } from './test-setup';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [...commonImports],
      declarations: [...commonDeclarations],
      providers: [...commonProviders]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
