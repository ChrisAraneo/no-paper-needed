import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('default inputs', () => {
    it('should have empty label by default', () => {
      expect(component.label).toBe('');
    });

    it('should have empty icon by default', () => {
      expect(component.icon).toBe('');
    });

    it('should have iconPosition "right" by default', () => {
      expect(component.iconPosition).toBe('right');
    });

    it('should not be disabled by default', () => {
      expect(component.isDisabled).toBe(false);
    });

    it('should have null severity by default', () => {
      expect(component.severity).toBeNull();
    });

    it('should not be rounded by default', () => {
      expect(component.isRounded).toBe(false);
    });

    it('should have empty styleClass by default', () => {
      expect(component.styleClass).toBe('');
    });
  });

  describe('input bindings', () => {
    it('should pass label to p-button', () => {
      fixture.componentRef.setInput('label', 'Click me');
      fixture.detectChanges();

      const buttonEl = fixture.debugElement.query(By.css('button'));
      expect(buttonEl.nativeElement.textContent).toContain('Click me');
    });

    it('should pass icon to p-button', () => {
      fixture.componentRef.setInput('icon', 'pi pi-check');
      fixture.detectChanges();

      const iconEl = fixture.debugElement.query(By.css('.pi-check'));
      expect(iconEl).toBeTruthy();
    });

    it('should pass disabled state to p-button', () => {
      fixture.componentRef.setInput('isDisabled', true);
      fixture.detectChanges();

      const buttonEl = fixture.debugElement.query(By.css('button'));
      expect(buttonEl.nativeElement.disabled).toBe(true);
    });

    it('should not be disabled when isDisabled is false', () => {
      fixture.componentRef.setInput('isDisabled', false);
      fixture.detectChanges();

      const buttonEl = fixture.debugElement.query(By.css('button'));
      expect(buttonEl.nativeElement.disabled).toBe(false);
    });

    it('should pass rounded state to p-button', () => {
      fixture.componentRef.setInput('isRounded', true);
      fixture.detectChanges();

      const buttonEl = fixture.debugElement.query(By.css('button'));
      expect(buttonEl.nativeElement.className).toContain('p-button-rounded');
    });

    it('should pass styleClass to p-button', () => {
      fixture.componentRef.setInput('styleClass', 'custom-class');
      fixture.detectChanges();

      const buttonEl = fixture.debugElement.query(By.css('button'));
      expect(buttonEl.nativeElement.className).toContain('custom-class');
    });
  });

  describe('clicked output', () => {
    it('should emit clicked event when onClick is called', () => {
      const spy = vi.spyOn(component.clicked, 'emit');

      component.onClick();

      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith();
    });

    it('should emit clicked event when p-button is clicked', () => {
      const spy = vi.spyOn(component.clicked, 'emit');

      const pButton = fixture.debugElement.query(By.css('p-button'));
      pButton.triggerEventHandler('onClick', null);

      expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should not emit when button is not interacted with', () => {
      const spy = vi.spyOn(component.clicked, 'emit');

      fixture.detectChanges();

      expect(spy).not.toHaveBeenCalled();
    });
  });
});
