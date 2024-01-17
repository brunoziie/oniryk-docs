import env from '@/env';
import { Link, Text } from '@react-email/components';
import * as React from 'react';
import BaseEmail, { link, text } from './base';

export interface ResetPasswordEmailProps {
  name: string;
  code: string;
}

export const ResetPasswordEmail = ({
  name,
  code: codeString,
}: ResetPasswordEmailProps) => (
  <BaseEmail title="Login" preview="Log in with this magic link">
    <Text
      style={{
        ...text,
        color: '#333',
        marginBottom: '16px',
      }}
    >
      Hi, {name}.
    </Text>

    <Link
      href={`${env.FRONTEND_URL}/auth/reset-password?code=${codeString}`}
      target="_blank"
      style={{
        ...link,
        display: 'block',
        marginBottom: '16px',
      }}
    >
      Click here to reset your password
    </Link>

    <Text
      style={{
        ...text,
        color: '#ababab',
        marginTop: '14px',
        marginBottom: '16px',
      }}
    >
      If you didn&apos;t try to login, you can safely ignore this email.
    </Text>
  </BaseEmail>
);

export default ResetPasswordEmail;
