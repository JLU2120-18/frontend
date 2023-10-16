import { sleep } from '@/utils';
import Mock from 'mockjs';

export const GetAvailableTimeCardReq = async (params: {jwt: string}) => {
  await sleep(1000);

  console.log(params);

  return Mock.mock({
    'data|10': [
      {
        id: '@guid',
        projectName: '@first',
        isSave: false,
        startTime: '@date',
        endTime: '@date',
        'duration|10-40': 1,
      },
    ],
  });
};

interface CreateEmployeeReportRequest {
  jwt: string;
  type: 'duration' | 'proj_duration' | 'vacation' | 'salary';
  startTime: string;
  endTime: string;
  timeCardId?: string;
}

export const CreateEmployeeReportReq = async (params: CreateEmployeeReportRequest) => {
  await sleep(2000);

  console.log(params);
  return Mock.mock({
    'data|5': [
      {
        employeeId: '@id',
        employeeName: '@first',
        startTime: '@date',
        endTime: '@date',
        projectName: '@last',
        'duration|10-40': 1,
        'salary|4000-8000': 1,
      },
    ],
  });
};