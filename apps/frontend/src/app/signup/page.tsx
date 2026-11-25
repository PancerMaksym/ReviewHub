import SignUpPage from '@/components/signup';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ReviewHub | Register',
  description: 'Register Page',
};

export default function Page() {
  return <SignUpPage />;
}
