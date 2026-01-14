import { StepAction } from '../shared/components/step/step.interfaces';

export abstract class NoteDialog {
  protected createBackButtonStepAction(onClick: () => void): StepAction {
    return {
      label: 'Back',
      severity: 'secondary',
      icon: 'pi pi-arrow-left',
      onClick,
    };
  }

  protected createNextButtonStepAction(
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