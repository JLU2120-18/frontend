export interface Employee {
  id: string;
  username: string;
  address: string;
  phone: string;
  socsecId: string;
  taxRate: number;
  otherCast: number;
  type: 'salary' | 'commission' | 'wage';
  hourWage?: number;
  salary?: number;
  commissionRate?: number;
  durationLimit: number;
}