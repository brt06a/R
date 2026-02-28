import axios from 'axios';
import { env } from '../config/env';
import { logger } from '../utils/logger';

interface CashfreeAuthToken {
  token: string;
  expiry: number;
}

let authToken: CashfreeAuthToken | null = null;

// Cashfree tokens expire in 30 minutes; refresh 1 minute early to avoid expiry mid-request
const TOKEN_REFRESH_BUFFER_MINUTES = 29;

const getCashfreeAuthToken = async (): Promise<string> => {
  if (authToken && authToken.expiry > Date.now()) {
    return authToken.token;
  }

  const response = await axios.post(
    `${env.CASHFREE_BASE_URL}/payout/v1/authorize`,
    {},
    {
      headers: {
        'X-Client-Id': env.CASHFREE_CLIENT_ID,
        'X-Client-Secret': env.CASHFREE_CLIENT_SECRET,
      },
    }
  );

  if (response.data.status !== 'SUCCESS') {
    throw new Error('Failed to authenticate with Cashfree');
  }

  const token = response.data.data.token;
  authToken = { token, expiry: Date.now() + TOKEN_REFRESH_BUFFER_MINUTES * 60 * 1000 };
  return token;
};

export const initiateCashfreePayout = async (params: {
  transferId: string;
  amount: number;
  bankAccount: string;
  ifsc: string;
  name: string;
  email?: string;
  phone?: string;
}): Promise<{ status: string; transferId: string }> => {
  try {
    const token = await getCashfreeAuthToken();

    const response = await axios.post(
      `${env.CASHFREE_BASE_URL}/payout/v1/directTransfer`,
      {
        beneDetails: {
          beneId: `BENE_${params.transferId}`,
          name: params.name,
          email: params.email || 'user@ideanax.com',
          phone: params.phone || '9999999999',
          bankAccount: params.bankAccount,
          ifsc: params.ifsc,
        },
        amount: params.amount,
        transferId: params.transferId,
        transferMode: 'IMPS',
        remarks: 'IdeaNax Withdrawal',
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.data.status !== 'SUCCESS') {
      throw new Error(`Cashfree payout failed: ${response.data.message}`);
    }

    return {
      status: response.data.data.status,
      transferId: params.transferId,
    };
  } catch (error) {
    logger.error('Cashfree payout error:', error);
    throw error;
  }
};
