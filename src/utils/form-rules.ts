import { FormRule } from 'antd';

const REQUIRED: FormRule = { required: true };

export const required = () => {
  return REQUIRED;
};

export const matched = (regex: RegExp, message?: string): FormRule => {
  return { pattern: regex, message };
};