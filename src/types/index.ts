export type AppStateType = {
  violations: LprSessionData[];
  notice?: string;
  plate?: string;
  state?: string;
  pdf: string;
  clientSecret: string;
};

export type LotType = {
  _id: string;
  zone: string;
  token: string;
  cover: string;
  siteCode: string;
  url: string;
  address: string;
  hourlyRate: number;
  payTime: number;
  fine: number;
  percentage: number;
  owners: string[];
  payingApp: string;
};

export interface LprSessionData {
  _id: string;
  lot: LotType;
  camera1: string;
  camera2: string;
  plateNumber: string;
  plate1?: string;
  plate2?: string;
  vehicle1?: string;
  vehicle2?: string;
  entryTime?: string;
  exitTime?: string;
  status: string;
  payLog?: string;
  fine: number;
  noticeNumber?: string;
  ticketCheck: boolean;
}

export type AppearanceTheme = "stripe" | "night" | "flat";
export type AppearanceVariables = {
  colorPrimary: string;
  colorBackground: string;
  colorText: string;
};

export type Appearance = {
  theme: AppearanceTheme;
  variables: AppearanceVariables;
};
