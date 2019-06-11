import { IIkasanModule } from 'app/shared/model/ikasan-module.model';

export interface IIntegratedSystem {
  id?: number;
  systemName?: string;
  systemLevel?: number;
  modules?: IIkasanModule[];
}

export const defaultValue: Readonly<IIntegratedSystem> = {};
