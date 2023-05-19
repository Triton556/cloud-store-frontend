import { FC } from 'react';
import styles from './FileCard.module.scss';
import { getExtensionFromFileName } from '@/utils/getExtensionFromFileName';
import { isImage } from '@/utils/isImage';
import { API_BASE_URL } from '@/core/axios';
import { Extension, getColorByExtension } from '@/utils/getColorByExtension';
import { FileTextOutlined } from '@ant-design/icons';

interface FileCardProps {
  filename: string;
  originalName: string;
}

export const FileCard: FC<FileCardProps> = ({ originalName, filename }) => {
  const ext = getExtensionFromFileName(filename);
  const imageUrl =
    ext && isImage(ext) ? `${API_BASE_URL}uploads/` + filename : '';

  const color = getColorByExtension(ext as Extension);
  const classColor = styles[color];

  return (
    <div className={styles.root}>
      <div className={styles.icon}>
        <i className={classColor}>{ext}</i>
        {isImage(ext as Extension) ? (
          <img className={styles.image} src={imageUrl} alt={'File'} />
        ) : (
          <FileTextOutlined />
        )}
      </div>
      <span>{originalName}</span>
    </div>
  );
};
