import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';

import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterComponent, TranslateModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('layout', () => {
    it('should render three columns', () => {
      const cols = fixture.nativeElement.querySelectorAll('.col');

      expect(cols.length).toBe(3);
    });
  });

  describe('export button', () => {
    it('should render export button with file-export icon', () => {
      const icon = fixture.nativeElement.querySelector(
        '.export-button .pi-file-export',
      );

      expect(icon).toBeTruthy();
    });

    it('should emit export event when export button is clicked', () => {
      const spy = vi.spyOn(component.export, 'emit');

      const button = fixture.nativeElement.querySelector(
        '.export-button npn-button button',
      );
      button.click();

      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('import button', () => {
    it('should render import button with file-import icon', () => {
      const icon = fixture.nativeElement.querySelector(
        '.import-button .pi-file-import',
      );

      expect(icon).toBeTruthy();
    });

    it('should emit import event when import button is clicked', () => {
      const spy = vi.spyOn(component.import, 'emit');

      const button = fixture.nativeElement.querySelector(
        '.import-button npn-button button',
      );
      button.click();

      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('button properties', () => {
    it('should render export button as rounded', () => {
      const button = fixture.nativeElement.querySelector(
        '.export-button button',
      );

      expect(button.className).toContain('p-button-rounded');
    });

    it('should render import button as rounded', () => {
      const button = fixture.nativeElement.querySelector(
        '.import-button button',
      );

      expect(button.className).toContain('p-button-rounded');
    });
  });

  describe('outputs', () => {
    it('should not emit export when not interacted with', () => {
      const spy = vi.spyOn(component.export, 'emit');

      fixture.detectChanges();

      expect(spy).not.toHaveBeenCalled();
    });

    it('should not emit import when not interacted with', () => {
      const spy = vi.spyOn(component.import, 'emit');

      fixture.detectChanges();

      expect(spy).not.toHaveBeenCalled();
    });
  });
});
