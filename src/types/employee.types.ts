export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  department: string;
  position: string;
  salary?: number;
  joinDate: Date;
  status: 'active' | 'inactive' | 'on-leave';
}

export interface EmployeeFilter {
  department?: string;
  status?: string;
  search?: string;
}

export interface EmployeeListResponse {
  data: Employee[];
  total: number;
  page: number;
  limit: number;
}
