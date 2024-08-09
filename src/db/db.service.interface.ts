export interface DatabaseService {
  query(query: string | object, params?: any[]): Promise<any>;
  putItem(params: any, extraParams?: any[]): Promise<any>;
  getItem(params: any, extraParams?: any[]): Promise<any>;
  getItems(params?: any): Promise<any>;
  patchItem(params: any, extraParams?: any[]): Promise<any>;
  deleteItem(params: any, extraParams?: any[]): Promise<any>;
}
