import { Button } from '@radix-ui/themes';
import { unstable_OneTimePasswordField as OneTimePasswordField } from 'radix-ui';
import '../../style/login.scss';
import Link from 'next/link';

export default function CodePage() {
  return (
    <main className="code-page">
      <h2>Enter the code</h2>
      <OneTimePasswordField.Root className="OTPRoot">
        <OneTimePasswordField.Input className="OTPInput" />
        <OneTimePasswordField.Input className="OTPInput" />
        <OneTimePasswordField.Input className="OTPInput" />
        <OneTimePasswordField.Input className="OTPInput" />
        <OneTimePasswordField.Input className="OTPInput" />
        <OneTimePasswordField.Input className="OTPInput" />
        <OneTimePasswordField.HiddenInput />
      </OneTimePasswordField.Root>
      <Link href={'/reset'}>Confirm</Link>
    </main>
  );
}
