import { Button, notification, Upload, UploadFile } from 'antd';
import { FC, useState } from 'react';
import * as Api from '@/api';
import { CloudUploadOutlined } from '@ant-design/icons';

export const UploadButton: FC = () => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const onUploadSuccess = async (options: any) => {
    try {
      const file = await Api.files.uploadFile(options);

      setFileList([]);
      window.location.reload();
    } catch (err) {
      notification.error({
        message: 'Ошибка!',
        description: 'Ну удалось загрузить файл \n' + err,
        duration: 4,
      });
    }
  };

  return (
    <Upload
      customRequest={onUploadSuccess}
      fileList={fileList}
      onChange={({ fileList }) => setFileList(fileList)}
    >
      <Button type="primary" icon={<CloudUploadOutlined />} size={'large'}>
        Загрузить файл
      </Button>
    </Upload>
  );
};
