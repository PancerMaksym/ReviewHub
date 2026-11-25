'use client';
import { Form } from 'radix-ui';
import { Button, IconButton, Text } from '@radix-ui/themes';
import { EyeClosedIcon, EyeOpenIcon } from '@radix-ui/react-icons';
import * as React from 'react';
import Link from 'next/link';
import axios from 'axios';
import '../style/login.scss';
import { Google, Github } from '@mynaui/icons-react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('start');
    const formData = new FormData(e.currentTarget);

    const login = formData.get('email');
    const password = formData.get('password');

    if (typeof login !== 'string' || typeof password !== 'string') {
      console.log('eror');
      return;
    }

    try {
      console.log('Data: ', login, password);
      const res = await axios.post('http://myapp.local/auth/login', {
        login,
        password,
      });

      console.log('Res:', res.data);
      window.localStorage.setItem('token', res.data);

      router.push('/account');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log('Status:', error.response?.status);
        console.log('Data:', error.response?.data);
      } else {
        console.error(error);
      }
    }
  };

  const oauthLogin = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    type: string,
  ) => {
    e.preventDefault();
  };

  return (
    <main className="login-page">
      <h2>LogIn</h2>
      <Form.Root className="login-form" onSubmit={(e) => handleSubmit(e)}>
        <Form.Field className="email-field" name="email">
          <Form.Label className="FormLabel">Email</Form.Label>
          <Form.Control asChild className="email-control">
            <input className="email" type="email" required />
          </Form.Control>
          <Form.Message className="message" match="valueMissing">
            Please enter your email
          </Form.Message>
          <Form.Message className="message" match="typeMismatch">
            Please provide a valid email
          </Form.Message>
        </Form.Field>
        <Form.Field className="password-field" name="password">
          <Form.Label className="FormLabel">Password</Form.Label>
          <div className="password-inputs">
            <Form.Control asChild className="password-control">
              <input
                className="password"
                type={open ? 'text' : 'password'}
                minLength={8}
                required
              />
            </Form.Control>
            <Button
              className="hide-btn"
              variant="ghost"
              onClick={() => setOpen((prev) => !prev)}
            >
              {open ? <EyeOpenIcon /> : <EyeClosedIcon />}
            </Button>
          </div>
          <Form.Message className="message" match="tooShort">
            Min 8 char
          </Form.Message>
        </Form.Field>
        <Form.Submit asChild>
          <Button className="Button">Login</Button>
        </Form.Submit>
      </Form.Root>
      <Text>
        Don`t have account? <Link href={'signup'}>SignUp</Link>
      </Text>
      <div>
        <IconButton onClick={(e) => oauthLogin(e, 'google')} className="google">
          <Google />
        </IconButton>
        <IconButton onClick={(e) => oauthLogin(e, 'git')} className="github">
          <Github />
        </IconButton>
      </div>
    </main>
  );
}
