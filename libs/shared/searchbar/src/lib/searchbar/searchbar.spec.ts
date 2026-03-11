import { Component } from '@angular/core';
import { outputToObservable } from '@angular/core/rxjs-interop';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchbarComponent } from './searchbar';

@Component({
  imports: [SearchbarComponent],
  template: `<npn-searchbar [value]="value" (search)="onSearch($event)" />`,
})
class TestHostComponent {
  value = '';
  lastSearch = '';

  onSearch(query: string): void {
    this.lastSearch = query;
  }
}

describe('SearchbarComponent', () => {
  let component: SearchbarComponent;
  let fixture: ComponentFixture<SearchbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchbarComponent, TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('default inputs', () => {
    it('should have value as empty string by default', () => {
      expect(component.value()).toBe('');
    });

    it('should have placeholder as empty string by default', () => {
      expect(component.placeholder()).toBe('');
    });

    it('should have model as empty string by default', () => {
      expect((component as any).model()).toBe('');
    });

    it('should render input with empty value by default', () => {
      const input = fixture.nativeElement.querySelector(
        'input',
      ) as HTMLInputElement;

      expect(input.value).toBe('');
    });
  });

  describe('value input', () => {
    it('should sync model from value on changes', () => {
      fixture.componentRef.setInput('value', 'hello');
      fixture.detectChanges();

      expect((component as any).model()).toBe('hello');
    });

    it('should update the input element when value changes', async () => {
      fixture.componentRef.setInput('value', 'test query');
      fixture.detectChanges();
      await fixture.whenStable();

      const input = fixture.nativeElement.querySelector(
        'input',
      ) as HTMLInputElement;

      expect(input.value).toBe('test query');
    });

    it('should update model when value changes multiple times', () => {
      fixture.componentRef.setInput('value', 'first');
      fixture.detectChanges();

      expect((component as any).model()).toBe('first');

      fixture.componentRef.setInput('value', 'second');
      fixture.detectChanges();

      expect((component as any).model()).toBe('second');
    });
  });

  describe('placeholder input', () => {
    it('should render placeholder text on the input element', () => {
      fixture.componentRef.setInput('placeholder', 'Search...');
      fixture.detectChanges();

      const input = fixture.nativeElement.querySelector(
        'input',
      ) as HTMLInputElement;

      expect(input.placeholder).toBe('Search...');
    });

    it('should update placeholder when input changes', () => {
      fixture.componentRef.setInput('placeholder', 'First');
      fixture.detectChanges();

      const input = fixture.nativeElement.querySelector(
        'input',
      ) as HTMLInputElement;

      expect(input.placeholder).toBe('First');

      fixture.componentRef.setInput('placeholder', 'Second');
      fixture.detectChanges();

      expect(input.placeholder).toBe('Second');
    });

    it('should render empty placeholder when set to empty string', () => {
      fixture.componentRef.setInput('placeholder', 'Something');
      fixture.detectChanges();

      fixture.componentRef.setInput('placeholder', '');
      fixture.detectChanges();

      const input = fixture.nativeElement.querySelector(
        'input',
      ) as HTMLInputElement;

      expect(input.placeholder).toBe('');
    });
  });

  describe('search output', () => {
    it('should emit search event when input value changes', () => {
      const spy = vi.fn();
      outputToObservable(component.search).subscribe(spy);

      const input = fixture.nativeElement.querySelector(
        'input',
      ) as HTMLInputElement;
      input.value = 'new value';
      input.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      expect(spy).toHaveBeenCalledWith('new value');
    });

    it('should emit search event for each keystroke change', () => {
      const spy = vi.fn();
      outputToObservable(component.search).subscribe(spy);

      const input = fixture.nativeElement.querySelector(
        'input',
      ) as HTMLInputElement;

      input.value = 'a';
      input.dispatchEvent(new Event('input'));

      input.value = 'ab';
      input.dispatchEvent(new Event('input'));

      expect(spy).toHaveBeenCalledTimes(2);
      expect(spy).toHaveBeenNthCalledWith(1, 'a');
      expect(spy).toHaveBeenNthCalledWith(2, 'ab');
    });

    it('should emit empty string when input is cleared', () => {
      const spy = vi.fn();
      outputToObservable(component.search).subscribe(spy);

      const input = fixture.nativeElement.querySelector(
        'input',
      ) as HTMLInputElement;
      input.value = '';
      input.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      expect(spy).toHaveBeenCalledWith('');
    });

    it('should not emit without user interaction', () => {
      const spy = vi.fn();
      outputToObservable(component.search).subscribe(spy);
      fixture.detectChanges();

      expect(spy).not.toHaveBeenCalled();
    });
  });

  describe('with host', () => {
    let hostFixture: ComponentFixture<TestHostComponent>;

    beforeEach(() => {
      hostFixture = TestBed.createComponent(TestHostComponent);
      hostFixture.detectChanges();
    });

    it('should pass value from host to searchbar', async () => {
      hostFixture.componentInstance.value = 'from host';
      hostFixture.changeDetectorRef.markForCheck();
      hostFixture.detectChanges();
      await hostFixture.whenStable();

      const input = hostFixture.nativeElement.querySelector(
        'input',
      ) as HTMLInputElement;

      expect(input.value).toBe('from host');
    });

    it('should call host onSearch when input changes', () => {
      const input = hostFixture.nativeElement.querySelector(
        'input',
      ) as HTMLInputElement;
      input.value = 'typed';
      input.dispatchEvent(new Event('input'));
      hostFixture.detectChanges();

      expect(hostFixture.componentInstance.lastSearch).toBe('typed');
    });

    it('should update input when host value changes', async () => {
      hostFixture.componentInstance.value = 'initial';
      hostFixture.changeDetectorRef.markForCheck();
      hostFixture.detectChanges();
      await hostFixture.whenStable();

      hostFixture.componentInstance.value = 'updated';
      hostFixture.changeDetectorRef.markForCheck();
      hostFixture.detectChanges();
      await hostFixture.whenStable();

      const input = hostFixture.nativeElement.querySelector(
        'input',
      ) as HTMLInputElement;

      expect(input.value).toBe('updated');
    });
  });
});
