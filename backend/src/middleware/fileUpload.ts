import multer from 'multer';
import { Request } from 'express';
import {
  ALLOWED_DOCUMENT_TYPES,
  ALLOWED_PROTOTYPE_IMAGE_TYPES,
  ALLOWED_PROTOTYPE_VIDEO_TYPES,
  MAX_FILE_SIZE_BYTES,
} from '../utils/constants';

const storage = multer.memoryStorage();

const documentFilter = (_req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback): void => {
  if (ALLOWED_DOCUMENT_TYPES.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid document type. Only PDF, PPT, PPTX, DOC, DOCX are allowed.'));
  }
};

const prototypeFilter = (_req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback): void => {
  const allowedTypes = [...ALLOWED_PROTOTYPE_IMAGE_TYPES, ...ALLOWED_PROTOTYPE_VIDEO_TYPES];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid prototype type. Only JPG, PNG, WEBP, MP4 are allowed.'));
  }
};

export const uploadDocument = multer({
  storage,
  fileFilter: documentFilter,
  limits: { fileSize: MAX_FILE_SIZE_BYTES },
}).single('document');

export const uploadPrototype = multer({
  storage,
  fileFilter: prototypeFilter,
  limits: { fileSize: MAX_FILE_SIZE_BYTES },
}).single('prototype');

export const uploadIdeaFiles = multer({
  storage,
  limits: { fileSize: MAX_FILE_SIZE_BYTES },
}).fields([
  { name: 'document', maxCount: 1 },
  { name: 'prototype', maxCount: 1 },
]);
