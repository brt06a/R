import { supabase } from '../config/supabase';
import { BadRequestError } from '../utils/errors';
import { logger } from '../utils/logger';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';

const ALLOWED_DOCUMENT_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];

const ALLOWED_PROTOTYPE_TYPES = [
  'application/pdf',
  'image/png',
  'image/jpeg',
  'image/webp',
  'application/zip',
];

const MAX_DOCUMENT_SIZE = 10 * 1024 * 1024;
const MAX_PROTOTYPE_SIZE = 50 * 1024 * 1024;

export class StorageService {
  validateFile(bucket: string, file: Express.Multer.File): void {
    const allowedTypes = bucket === 'idea-documents' ? ALLOWED_DOCUMENT_TYPES : ALLOWED_PROTOTYPE_TYPES;
    const maxSize = bucket === 'idea-documents' ? MAX_DOCUMENT_SIZE : MAX_PROTOTYPE_SIZE;

    if (!allowedTypes.includes(file.mimetype)) {
      throw new BadRequestError(
        `Invalid file type: ${file.mimetype}. Allowed types: ${allowedTypes.join(', ')}`,
        'INVALID_FILE_TYPE'
      );
    }

    if (file.size > maxSize) {
      throw new BadRequestError(
        `File too large. Maximum size: ${maxSize / (1024 * 1024)}MB`,
        'FILE_TOO_LARGE'
      );
    }
  }

  async uploadFile(
    bucket: string,
    userId: string,
    file: Express.Multer.File
  ): Promise<string> {
    this.validateFile(bucket, file);

    const ext = path.extname(file.originalname);
    const filePath = `${userId}/${uuidv4()}${ext}`;

    const { error } = await supabase.storage
      .from(bucket)
      .upload(filePath, file.buffer, {
        contentType: file.mimetype,
        upsert: false,
      });

    if (error) {
      logger.error('File upload failed', { bucket, filePath, error: error.message });
      throw new BadRequestError('File upload failed');
    }

    logger.info('File uploaded', { bucket, filePath });
    return filePath;
  }

  async getSignedUrl(bucket: string, filePath: string, expiresIn: number = 3600): Promise<string> {
    const { data, error } = await supabase.storage
      .from(bucket)
      .createSignedUrl(filePath, expiresIn);

    if (error) {
      logger.error('Failed to create signed URL', { bucket, filePath, error: error.message });
      throw new BadRequestError('Failed to generate download URL');
    }

    return data.signedUrl;
  }

  async deleteFile(bucket: string, filePath: string): Promise<void> {
    const { error } = await supabase.storage
      .from(bucket)
      .remove([filePath]);

    if (error) {
      logger.error('File deletion failed', { bucket, filePath, error: error.message });
    }
  }

  async getUploadSignedUrl(
    bucket: string,
    userId: string,
    fileName: string,
    contentType: string
  ): Promise<{ signedUrl: string; filePath: string }> {
    const ext = path.extname(fileName);
    const filePath = `${userId}/${uuidv4()}${ext}`;

    const { data, error } = await supabase.storage
      .from(bucket)
      .createSignedUploadUrl(filePath);

    if (error) {
      logger.error('Failed to create signed upload URL', { bucket, error: error.message });
      throw new BadRequestError('Failed to generate upload URL');
    }

    return { signedUrl: data.signedUrl, filePath };
  }
}
