import { IIkasanFlow } from 'app/shared/model/ikasan-flow.model';

export interface IIkasanComponent {
  id?: number;
  componentName?: string;
  flow?: IIkasanFlow;
}

export const defaultValue: Readonly<IIkasanComponent> = {};
