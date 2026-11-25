import { Metadata } from 'next';
import LoginPage from '../../components/login';

export const metadata: Metadata = {
  title: 'ReviewHub | Login',
  description: 'Login Page',
};

export default function Page() {
  return <LoginPage />;
}
