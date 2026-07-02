import axiosInstance from '@/lib/axios';

export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  department: string;
  position: string;
}

export const employeeService = {
  getAll: async () => {
    const response = await axiosInstance.get('/employees');
    return response.data;
  },

  getById: async (id: string) => {
    const response = await axiosInstance.get(`/employees/${id}`);
    return response.data;
  },

  create: async (data: Omit<Employee, 'id'>) => {
    const response = await axiosInstance.post('/employees', data);
    return response.data;
  },

  update: async (id: string, data: Partial<Employee>) => {
    const response = await axiosInstance.put(`/employees/${id}`, data);
    return response.data;
  },

  delete: async (id: string) => {
    await axiosInstance.delete(`/employees/${id}`);
  },
};
