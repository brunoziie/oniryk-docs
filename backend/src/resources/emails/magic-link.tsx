import env from '@app:env';
import { Link, Text } from '@react-email/components';
import * as React from 'react';
import BaseEmail, { link, text } from './base';

export interface MagicLinkEmailProps {
  name: string;
  code: string;
}

export const MagicLinkEmail = ({ name, code: codeString }: MagicLinkEmailProps) => (
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
      href={`${env.FRONTEND_URL}/auth/magic-link?code=${codeString}`}
      target="_blank"
      style={{
        ...link,
        display: 'block',
        marginBottom: '16px',
      }}
    >
      Click here to log in with this magic link
    </Link>

    <Text style={{ ...text, marginBottom: '14px' }}>
      Or, copy and paste this temporary login code:
    </Text>

    <code style={code}>{codeString}</code>

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

export default MagicLinkEmail;

const code = {
  display: 'inline-block',
  padding: '16px 4.5%',
  width: '90.5%',
  backgroundColor: '#f4f4f4',
  borderRadius: '5px',
  border: '1px solid #eee',
  color: '#333',
};
