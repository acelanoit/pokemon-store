import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { commonDeclarations, commonImports, commonProviders } from '../../test-setup';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {

    // The TestBed.configureTestingModule method is used to configure and create an Angular testing module.
    // TestBed.compileComponents() is an asynchronous operation that compiles all components in the testing module
    // and returns a promise that is resolved when the compilation is done.
    await TestBed.configureTestingModule({
      imports: [...commonImports],
      declarations: [...commonDeclarations],
      providers: [...commonProviders]
    }).compileComponents();

    // The TestBed.createComponent method is used to create an instance of a component.
    // The fixture is like a box that holds your Angular component: It gives you access to the component instance and the component's DOM nodes.
    fixture = TestBed.createComponent(HomeComponent);

    // The component instance is the object that represents the component itself. You can access the component instance from the fixture object.
    component = fixture.componentInstance;

    // The fixture.detectChanges method triggers change detection in the component.
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set the number of displayed items', () => {
    component.onItemsCountChange(150);
    expect(component.count).toBe(150);
  });

  it('should set the type of displayed items', () => {
    component.onShowType({ name: 'fire', selected: true });
    expect(component.type).toEqual({ name: 'fire', selected: true });
  });

  it('should set the number of columns', () => {
    component.onColumnsCountChange(4);
    expect(component.cols).toBe(4);
  });

  it('should sort the displayed items in ascending order', () => {
    const items = [
      {
        id: 4,
        name: 'Test 4',
        price: 13,
        'type(s)': 'Type 4',
        image: 'https://example.com/image.jpg',
        description: 'Description 4'
      },
      {
        id: 2,
        name: 'Test 2',
        price: 13,
        'type(s)': 'Type 2',
        image: 'https://example.com/image.jpg',
        description: 'Description 2'
      },
      {
        id: 6,
        name: 'Test 6',
        price: 13,
        'type(s)': 'Type 6',
        image: 'https://example.com/image.jpg',
        description: 'Description 6'
      }
    ];
    component.displayedPokemons = items;
    component.onSortChange('asc');
    expect(component.displayedPokemons).toEqual(
      [
        {
          id: 2,
          name: 'Test 2',
          price: 13,
          'type(s)': 'Type 2',
          image: 'https://example.com/image.jpg',
          description: 'Description 2'
        },
        {
          id: 4,
          name: 'Test 4',
          price: 13,
          'type(s)': 'Type 4',
          image: 'https://example.com/image.jpg',
          description: 'Description 4'
        },
        {
          id: 6,
          name: 'Test 6',
          price: 13,
          'type(s)': 'Type 6',
          image: 'https://example.com/image.jpg',
          description: 'Description 6'
        }
      ]
    );
  });

  it('should sort the displayed items in descending order', () => {
    const items = [
      {
        id: 4,
        name: 'Test 4',
        price: 13,
        'type(s)': 'Type 4',
        image: 'https://example.com/image.jpg',
        description: 'Description 4'
      },
      {
        id: 2,
        name: 'Test 2',
        price: 13,
        'type(s)': 'Type 2',
        image: 'https://example.com/image.jpg',
        description: 'Description 2'
      },
      {
        id: 6,
        name: 'Test 6',
        price: 13,
        'type(s)': 'Type 6',
        image: 'https://example.com/image.jpg',
        description: 'Description 6'
      }
    ];
    component.displayedPokemons = items;
    component.onSortChange('desc');
    expect(component.displayedPokemons).toEqual(
      [
        {
          id: 6,
          name: 'Test 6',
          price: 13,
          'type(s)': 'Type 6',
          image: 'https://example.com/image.jpg',
          description: 'Description 6'
        },
        {
          id: 4,
          name: 'Test 4',
          price: 13,
          'type(s)': 'Type 4',
          image: 'https://example.com/image.jpg',
          description: 'Description 4'
        },
        {
          id: 2,
          name: 'Test 2',
          price: 13,
          'type(s)': 'Type 2',
          image: 'https://example.com/image.jpg',
          description: 'Description 2'
        }
      ]
    );
  });
});
