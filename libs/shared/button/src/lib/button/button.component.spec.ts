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
      expect(component.label()).toBe('');
    });

    it('should have empty icon by default', () => {
      expect(component.icon()).toBe('');
    });

    it('should have iconPosition "right" by default', () => {
      expect(component.iconPosition()).toBe('right');
    });

    it('should not be disabled by default', () => {
      expect(component.isDisabled()).toBe(false);
    });

    it('should have null severity by default', () => {
      expect(component.severity()).toBeNull();
    });

    it('should not be rounded by default', () => {
      expect(component.isRounded()).toBe(false);
    });

    it('should have empty styleClass by default', () => {
      expect(component.styleClass()).toBe('');
    });
  });

  describe('label input', () => {
    it('should display no text when label is empty', () => {
      const button = fixture.debugElement.query(By.css('button'));

      expect(button.nativeElement.textContent.trim()).toBe('');
    });

    it('should render the label text inside the button', () => {
      fixture.componentRef.setInput('label', 'Save');
      fixture.detectChanges();

      const button = fixture.debugElement.query(By.css('button'));

      expect(button.nativeElement.textContent).toContain('Save');
    });

    it('should update displayed text when label changes', () => {
      fixture.componentRef.setInput('label', 'First');
      fixture.detectChanges();

      const button = fixture.debugElement.query(By.css('button'));

      expect(button.nativeElement.textContent).toContain('First');

      fixture.componentRef.setInput('label', 'Second');
      fixture.detectChanges();

      expect(button.nativeElement.textContent).toContain('Second');
      expect(button.nativeElement.textContent).not.toContain('First');
    });
  });

  describe('icon input', () => {
    it('should render the icon element when icon is set', () => {
      fixture.componentRef.setInput('icon', 'pi pi-check');
      fixture.detectChanges();

      const icon = fixture.debugElement.query(By.css('.pi-check'));

      expect(icon).toBeTruthy();
    });

    it('should not render an icon element when icon is empty', () => {
      const icon = fixture.debugElement.query(By.css('[class*="pi-"]'));

      expect(icon).toBeFalsy();
    });
  });

  describe('isDisabled input', () => {
    it('should disable the button when isDisabled is true', () => {
      fixture.componentRef.setInput('isDisabled', true);
      fixture.detectChanges();

      const button = fixture.debugElement.query(By.css('button'));

      expect(button.nativeElement.disabled).toBe(true);
    });

    it('should not disable the button when isDisabled is false', () => {
      fixture.componentRef.setInput('isDisabled', false);
      fixture.detectChanges();

      const button = fixture.debugElement.query(By.css('button'));

      expect(button.nativeElement.disabled).toBe(false);
    });
  });

  describe('isRounded input', () => {
    it('should add rounded class when isRounded is true', () => {
      fixture.componentRef.setInput('isRounded', true);
      fixture.detectChanges();

      const button = fixture.debugElement.query(By.css('button'));

      expect(button.nativeElement.className).toContain('p-button-rounded');
    });

    it('should not have rounded class when isRounded is false', () => {
      fixture.componentRef.setInput('isRounded', false);
      fixture.detectChanges();

      const button = fixture.debugElement.query(By.css('button'));

      expect(button.nativeElement.className).not.toContain('p-button-rounded');
    });
  });

  describe('styleClass input', () => {
    it('should apply the custom class to the button', () => {
      fixture.componentRef.setInput('styleClass', 'custom-class');
      fixture.detectChanges();

      const button = fixture.debugElement.query(By.css('button'));

      expect(button.nativeElement.className).toContain('custom-class');
    });

    it('should not have a custom class when styleClass is empty', () => {
      const button = fixture.debugElement.query(By.css('button'));

      expect(button.nativeElement.className).not.toContain('custom-class');
    });
  });

  describe('clicked output', () => {
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
