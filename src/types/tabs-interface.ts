/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ObjTabData {
    label: string;
    value: string;
  }
  
  export interface TabData {
    data: ObjTabData[];
    defaultValue: string;
    children: any;
  }
  