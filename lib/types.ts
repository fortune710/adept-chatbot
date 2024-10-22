export interface Opportunity {
  title: string;
  description: string;
  posteddate: Date;
  archivedate: Date;
  naicscode: string;
  naicscodes: string;
  typeofsetaside: string;
  typeofsetasidedescription: string | null;
  noticeid: string;
  solicitationnumber: string;
  fullparentpathname: string;
  fullparentpathcode: string;
  type_op: string;
  archivetype: string;
  classificationcode: string;
  pointofcontactname: string;
  pointofcontactemail: string;
  pointofcontactphone: string;
  placeofperformancecity: string;
  placeofperformancestate: string;
  placeofperformancezip: string;
  placeofperformancecountry: string;
  ulink: string;
  score: number;
}

export interface CreateUser {
  name: string;
  email: string;
  client: string;
  password: string;
}
