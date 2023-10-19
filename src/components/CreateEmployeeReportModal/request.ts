import { api } from '@/requests';

export const GetAvailableTimeCardReq = async (params: {jwt: string}) => {
  const result = await api.get('/timecard/available', {
    params,
  });
  return result.data;
};

interface CreateEmployeeReportRequest {
  jwt: string;
  type: 'duration' | 'proj_duration' | 'vacation' | 'salary' | 'employee_duration' | 'employee_salary';
  employeeId?: string;
  startTime: string;
  endTime: string;
  timeCardId?: string;
}

export const CreateEmployeeReportReq = async (params: CreateEmployeeReportRequest) => {
  if (['duration', 'proj_duration', 'vacation', 'salary'].includes(params.type)) {
    const result = await api.post('/employee_report/create', params);
    return result.data;
  }
  const result = await api.post('/admin_report/create', {
    ...params,
    type: params.type === 'employee_duration' ? 'duration' : 'salary',
  });
  return result.data;
};