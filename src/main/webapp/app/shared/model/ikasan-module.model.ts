import { IIntegratedSystem } from 'app/shared/model/integrated-system.model';

export interface IIkasanModule {
  id?: number;
  moduleName?: string;
  moduleDescription?: string;
  systems?: IIntegratedSystem[];
}

export const defaultValue: Readonly<IIkasanModule> = {};
