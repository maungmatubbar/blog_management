// src/utils/dataStatus.ts
interface DataStatus<T> {
    data?: T;
    status: 'success' | 'failed';
    error?: string;
  }
  
  export default DataStatus;
  