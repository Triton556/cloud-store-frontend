import { User } from '@/api/dto/user.dto';

export interface FileItem {
  filename: string;
  originalName: string;
  size: string;
  mimetype: string;
  user: User;
  deletedAt: string | null;
  id: number;
}
