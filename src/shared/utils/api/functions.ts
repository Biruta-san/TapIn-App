import axios, {AxiosResponse} from 'axios';

const api = axios.create({});

export const updateApiHeaders = (token: string): void => {
  api.defaults.headers['Authorization'] = `Bearer ${token}`;
};

export const removeApiHeaders = (): void => {
  api.defaults.headers['Authorization'] = null;
};

export const getDataByIdApi = async <T>(
  route: string,
  id: string | number,
  params?: object,
): Promise<AxiosResponse<T>> => {
  const response = await api.get<T>(`${route}/${id}`, {params});
  return response;
};

export const getDataApi = async <T>(
  route: string,
  params?: object,
): Promise<AxiosResponse<T>> => {
  const response = await api.get<T>(route, {params});
  return response;
};

export const postDataApi = async <T>(
  route: string,
  data: object,
): Promise<AxiosResponse<T>> => {
  const response = await api.post<T>(route, data);
  return response;
};

export const putDataApi = async <T>(
  route: string,
  id: string | number,
  data: object,
): Promise<AxiosResponse<T>> => {
  const response = await api.put<T>(`${route}/${id}`, data);
  return response;
};
