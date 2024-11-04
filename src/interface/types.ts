export interface CreateAppInterface {
  name: string;
  contexts: {
    [key: string]: IContext;
  };
  frontendUrls?: {
    sigin: string;
    signup: string;
    rememberPassword: string;
    changePassword: string;
  };
  vars?: {
    [varName: string]: string;
  };
}

export interface IApp extends CreateAppInterface {
  id?: string;
  active: boolean;
  settings: AppSettings;
}

export interface IAppDTO extends IApp {
  id: string;
}

export interface AppSettings {
  apiAccessToken: string;
}

export interface IContext {
  id: string;
  active: boolean;
  settings: {
    sessionDuration?: number;
  };
  profiles: {
    [key: string]: IProfile;
  };
}

export interface IProfile {
  id: string;
  name: string;
  description: string;
  link: string;
}

export enum ContactType {
  email = "email",
  sms = "sms",
  whatsapp = "whatsapp",
}
export interface IContactInfo {
  type: string;
  value: string;
}

export interface IResult {
  success: boolean;
  messages?: string[];
}
export interface IResultData<T> extends IResult {
  data?: T;
}
