import MailDev from 'maildev';
import { convert } from 'html-to-text';
import env from '@app:env';

const LINE_SIZE = process.stdout.columns - 4 || 80;

const fillLine = (size: number = LINE_SIZE, char = ' ') => {
  return char.repeat(size > 0 ? size : 0);
};

const drawBox = (text: string, title = 'maildev', size = LINE_SIZE) => {
  const lines = text.split('\n');
  const acc = [];

  acc.push(`┌--[${title}]${fillLine(size - title.length - 4, '-')}--┐`);
  lines.forEach((line) => acc.push(`│ ${line}${fillLine(size - line.length)} │`));
  acc.push(`└-${fillLine(size, '-')}-┘`);

  return acc.join('\n');
};

const displayEmailAsText = (email: any) => {
  const wordwrap = LINE_SIZE;
  const body = convert(email.html, { wordwrap }).split('\n');

  const lines = [
    '',
    `Subject: ${email.subject}`,
    ...`From: ${email.from.map((from: any) => `${from.name} <${from.address}>`).join(', \n    ')}`.split(
      /\n/
    ),
    ...`To: ${email.to.map((to: any) => `${to.name ? to.name + ' ' : ''}<${to.address}>`).join(', \n    ')}`.split(
      /\n/
    ),
    `Date: ${email.date}`,
    '',
    fillLine(LINE_SIZE, '-'),
    '',
    ...body,
    '',
  ].join('\n');

  console.log(`\n${drawBox(lines)}\n`);
};

export default function mailer() {
  if (env.NODE_ENV === 'development' && env.MAILER_USE_MAILDEV) {
    const maildev = new MailDev({
      disableWeb: true,
    });

    maildev.listen();
    maildev.on('new', displayEmailAsText);

    return maildev;
  }
}
