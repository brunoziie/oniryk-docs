import { Body, Container, Head, Heading, Html, Preview } from '@react-email/components';
import React, { ReactNode } from 'react';

interface BaseEmailProps {
  children: ReactNode;
  title?: string;
  preview?: string;
}

export const BaseEmail = ({ children, title, preview }: BaseEmailProps) => (
  <Html>
    <Head />
    {preview && <Preview>{preview}</Preview>}

    <Body style={main}>
      <Container style={container}>
        {title && <Heading style={h1}>{title}</Heading>}
        {children}
      </Container>
    </Body>
  </Html>
);

export default BaseEmail;

export const main = {
  backgroundColor: '#ffffff',
};

export const h1 = {
  color: '#333',
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Ubuntu', 'Helvetica Neue', sans-serif",
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '40px 0',
  padding: '0',
};

export const container = {
  paddingLeft: '12px',
  paddingRight: '12px',
  margin: '0 auto',
};

export const link = {
  color: '#2754C5',
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: '14px',
  textDecoration: 'underline',
};

export const text = {
  color: '#333',
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: '14px',
  margin: '24px 0',
};
