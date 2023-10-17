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
  type: 'duration' | 'proj_duration' | 'vacation' | 'salary' | 'employee_duration' | 'employee_salary';
  employeeId?: string;
  startTime: string;
  endTime: string;
  timeCardId?: string;
}

export const CreateEmployeeReportReq = async (params: CreateEmployeeReportRequest) => {
  await sleep(2000);

  console.log(params);
  switch (params.type) {
  case 'duration':
    return Mock.mock({
      'data|1-5': [{
        employeeId: '@id',
        employeeName: '@first',
        startTime: '@date',
        endTime: '@date',
        'duration|10-40': 1,
      }],
    });
  case 'proj_duration':
    return Mock.mock({
      'data|1-5': [{
        employeeId: '@id',
        employeeName: '@first',
        startTime: '@date',
        endTime: '@date',
        'data|1-3':[
          {
            projectName: '@last',
            'duration|10-40': 1,
          },
        ],
      }],
    });
  case 'vacation':
    return Mock.mock({
      'data|1-5': [{
        employeeId: '@id',
        employeeName: '@first',
        startTime: '@date',
        endTime: '@date',
      }],
    });
  case 'salary':
    return Mock.mock({
      'data|1-5': [{
        employeeId: '@id',
        employeeName: '@first',
        startTime: '@date',
        endTime: '@date',
        'salary|4000-8000': 1,
      }],
    });
  case 'employee_duration':
    return Mock.mock({
      data: [{
        employeeId: '@id',
        employeeName: '@name',
        startTime: '@date',
        endTime: '@date',
        duration: '@integer(40,50)',
      }],
    });
  case 'employee_salary':
    return Mock.mock({
      data: [{
        employeeId: '@id',
        employeeName: '@name',
        startTime: '@date',
        endTime: '@date',
        salary: '@integer(40000,50000)',
      }],
    });
  }
  return {
    data: [],
  };
};