import { Injectable } from '@angular/core';

import { StepAction } from '../../../shared/components/step/step.interfaces';

@Injectable({
  providedIn: 'root',
})
export class NoteDialogService {
  createBackButtonStepAction(onClick: () => void): StepAction {
    return {
      label: 'Back',
      severity: 'secondary',
      icon: 'pi pi-arrow-left',
      onClick,
    };
  }

  createNextButtonStepAction(
    onClick: () => void,
    isDisabled?: () => boolean,
  ): StepAction {
    return {
      label: 'Next',
      icon: 'pi pi-arrow-right',
      iconPos: 'right',
      disabled: isDisabled ? isDisabled() : false,
      onClick,
    };
  }
}
