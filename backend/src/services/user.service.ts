import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export const getUserProfile = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      mobile: true,
      dateOfBirth: true,
      role: true,
      coinBalance: true,
      walletBalance: true,
      isVerified: true,
      createdAt: true,
      _count: {
        select: {
          ideas: true,
          messages: true,
        },
      },
    },
  });
  if (!user) throw new Error('User not found');
  return user;
};

export const getDashboardStats = async (userId: string) => {
  const [user, ideaStats, unreadMessages] = await Promise.all([
    prisma.user.findUnique({
      where: { id: userId },
      select: { coinBalance: true, walletBalance: true },
    }),
    prisma.idea.groupBy({
      by: ['status'],
      where: { userId },
      _count: { status: true },
    }),
    prisma.message.count({
      where: { userId, isRead: false },
    }),
  ]);

  if (!user) throw new Error('User not found');

  const stats = {
    coinBalance: user.coinBalance,
    walletBalance: user.walletBalance,
    totalIdeas: 0,
    pendingIdeas: 0,
    approvedIdeas: 0,
    rejectedIdeas: 0,
    soldIdeas: 0,
    unreadMessages,
  };

  for (const stat of ideaStats) {
    stats.totalIdeas += stat._count.status;
    if (stat.status === 'PENDING') stats.pendingIdeas = stat._count.status;
    if (stat.status === 'APPROVED') stats.approvedIdeas = stat._count.status;
    if (stat.status === 'REJECTED') stats.rejectedIdeas = stat._count.status;
    if (stat.status === 'SOLD') stats.soldIdeas = stat._count.status;
  }

  return stats;
};

export const updateUserProfile = async (userId: string, data: {
  name?: string;
  dateOfBirth?: string;
}) => {
  const updateData: { name?: string; dateOfBirth?: Date } = {};
  if (data.name) updateData.name = data.name;
  if (data.dateOfBirth) updateData.dateOfBirth = new Date(data.dateOfBirth);

  return prisma.user.update({
    where: { id: userId },
    data: updateData,
    select: {
      id: true,
      name: true,
      email: true,
      mobile: true,
      dateOfBirth: true,
      role: true,
      coinBalance: true,
      walletBalance: true,
      isVerified: true,
    },
  });
};

export const changePassword = async (userId: string, currentPassword: string, newPassword: string) => {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) throw new Error('User not found');

  const isValid = await bcrypt.compare(currentPassword, user.password);
  if (!isValid) throw new Error('Current password is incorrect');

  const hashed = await bcrypt.hash(newPassword, 12);
  await prisma.user.update({
    where: { id: userId },
    data: { password: hashed },
  });
};
