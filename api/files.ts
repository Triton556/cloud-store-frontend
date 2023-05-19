import { AxiosError, AxiosResponse } from 'axios';
import { FileItem } from '@/api/dto/files.dto';
import axios from '@/core/axios';

type FileType = 'all' | 'photos' | 'trash';
export const getAll = (
  type: FileType = 'all',
): Promise<AxiosResponse<FileItem[]>> => {
  return axios.get('files?type=' + type);
};

export const remove = (ids: number[]): Promise<void> => {
  return axios.delete('files?ids=' + ids);
};

export const uploadFile = async (options: any) => {
  const { onSuccess, onError, file, onProgress } = options;

  const formData = new FormData();

  formData.append('file', file);

  const config = {
    headers: { 'Content-Type': 'multipart/form-data' },
    onProgress: (event: ProgressEvent) => {
      onProgress({ percent: (event.loaded / event.total) * 100 });
    },
  };

  try {
    const { data } = await axios.post('files', formData, config);

    onSuccess();

    return data;
  } catch (err) {
    const axiosError = err as AxiosError;
    onError(err);
    if (axiosError.response) {
      // @ts-ignore
      const { message } = axiosError.response.data;
      throw new Error(message);
    } else if (axiosError.request) {
      console.log(axiosError.request);
      throw new Error(axiosError.request);
    }

    throw err;
  }
};
