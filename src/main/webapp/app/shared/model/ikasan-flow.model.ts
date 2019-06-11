import { IIkasanModule } from 'app/shared/model/ikasan-module.model';

export const enum State {
  RUNNING = 'RUNNING',
  RECOVERING = 'RECOVERING',
  STOPPED = 'STOPPED',
  STOPPEDINERROR = 'STOPPEDINERROR',
  PAUSED = 'PAUSED'
}

export interface IIkasanFlow {
  id?: number;
  flowName?: string;
  status?: State;
  module?: IIkasanModule;
}

export const defaultValue: Readonly<IIkasanFlow> = {};
