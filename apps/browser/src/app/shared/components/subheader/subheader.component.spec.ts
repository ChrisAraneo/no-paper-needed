import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubheaderComponent } from './subheader.component';

describe('SubheaderComponent', () => {
  let component: SubheaderComponent;
  let fixture: ComponentFixture<SubheaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubheaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SubheaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should project content into h2', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const h2 = compiled.querySelector('h2');
    expect(h2).toBeTruthy();
  });

  it('should render subheader element', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const subheader = compiled.querySelector('.subheader');
    expect(subheader).toBeTruthy();
  });
});
