export interface BaseDataType {
  id: string;
  username: string;
  address: string;
  phone: string;
}

export interface SocietyDataType {
  socsec_id: string;
  tax_rate: number;
  other_cast: number;
}

export interface BusinessDataType {
  type: 'salary' | 'commission' | 'wage';
  payment: 'mail' | 'receive' | 'bank';
  salary?: number;
  hour_wage?: number;
  commission_rate?: number;
  duration_limit: number;
}

export interface OtherDataType {
  mail_address?: string;
  bank_name?: string;
  bank_account?: string;
}