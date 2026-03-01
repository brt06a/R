import { Response, NextFunction } from 'express';
import { AuthRequest } from '../types';
import { getUserProfile, getDashboardStats, updateUserProfile, changePassword } from '../services/user.service';
import { sendSuccess } from '../utils/apiResponse';

export const getProfile = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user = await getUserProfile(req.user!.userId);
    sendSuccess(res, 'Profile fetched successfully', user);
  } catch (error) {
    next(error);
  }
};

export const getDashboard = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const stats = await getDashboardStats(req.user!.userId);
    sendSuccess(res, 'Dashboard stats fetched successfully', stats);
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user = await updateUserProfile(req.user!.userId, req.body);
    sendSuccess(res, 'Profile updated successfully', user);
  } catch (error) {
    next(error);
  }
};

export const updatePassword = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { currentPassword, newPassword } = req.body;
    await changePassword(req.user!.userId, currentPassword, newPassword);
    sendSuccess(res, 'Password changed successfully');
  } catch (error) {
    next(error);
  }
};
