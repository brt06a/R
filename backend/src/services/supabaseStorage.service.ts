import { supabaseAdmin } from '../config/supabase';
import { env } from '../config/env';
import { SIGNED_URL_EXPIRY_SECONDS } from '../utils/constants';
import { v4 as uuidv4 } from 'uuid';
import { logger } from '../utils/logger';

const BUCKET = env.SUPABASE_STORAGE_BUCKET;

export const uploadFile = async (
  file: Express.Multer.File,
  folder: string
): Promise<string> => {
  const ext = file.originalname.split('.').pop();
  const fileName = `${folder}/${uuidv4()}.${ext}`;

  const { error } = await supabaseAdmin.storage
    .from(BUCKET)
    .upload(fileName, file.buffer, {
      contentType: file.mimetype,
      upsert: false,
    });

  if (error) {
    logger.error('Supabase upload error:', error);
    throw new Error(`Failed to upload file: ${error.message}`);
  }

  return fileName;
};

export const getSignedUrl = async (filePath: string): Promise<string> => {
  const { data, error } = await supabaseAdmin.storage
    .from(BUCKET)
    .createSignedUrl(filePath, SIGNED_URL_EXPIRY_SECONDS);

  if (error || !data) {
    throw new Error(`Failed to generate signed URL: ${error?.message}`);
  }

  return data.signedUrl;
};

export const deleteFile = async (filePath: string): Promise<void> => {
  const { error } = await supabaseAdmin.storage
    .from(BUCKET)
    .remove([filePath]);

  if (error) {
    logger.error('Supabase delete error:', error);
    throw new Error(`Failed to delete file: ${error.message}`);
  }
};
