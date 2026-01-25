import { ButtonIconPosition, ButtonSeverity } from 'primeng/button';

export interface StepAction {
  label: string;
  icon?: string;
  iconPos?: ButtonIconPosition;
  disabled?: boolean;
  severity?: ButtonSeverity;
  onClick: () => void;
}
