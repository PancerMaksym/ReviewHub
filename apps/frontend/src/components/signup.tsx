'use client';

import { Form } from 'radix-ui';
import { EyeClosedIcon, EyeOpenIcon } from '@radix-ui/react-icons';
import React from 'react';
import { Button, IconButton, Text } from '@radix-ui/themes';
import Link from 'next/link';
import '../style/login.scss';
import axios from 'axios';
import { Google, Github } from '@mynaui/icons-react';
import { useRouter } from 'next/navigation';

export default function SignUpPage() {
  const [open, setOpen] = React.useState(false);
  const [openRepeat, setOpenRepeat] = React.useState(false);
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
      const res = await axios.post('http://myapp.local/auth/register', {
        login,
        password,
      });

      console.log('Res:', res.data);

      router.push('/login');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log('Status:', error.response?.status);
        console.log('Data:', error.response?.data);
      } else {
        console.error(error);
      }
    }
  };

  const oauthSignUp = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    type: string,
  ) => {
    e.preventDefault();
  };

  return (
    <main className="signup-page">
      <h2>SignUp</h2>
      <Form.Root className="signup-form" onSubmit={(e) => handleSubmit(e)}>
        <Form.Field className="email-field" name="email">
          <Form.Label className="FormLabel">Email</Form.Label>

          <Form.Control asChild>
            <input className="Input" type="email" required />
          </Form.Control>
          <Form.Message className="FormMessage" match="valueMissing">
            Please enter your email
          </Form.Message>
          <Form.Message className="FormMessage" match="typeMismatch">
            Please provide a valid email
          </Form.Message>
        </Form.Field>
        <Form.Field className="password-field" name="password">
          <Form.Label className="FormLabel">Password</Form.Label>
          <div className="password-inputs">
            <Form.Control asChild>
              <input
                className="password"
                type={open ? 'text' : 'password'}
                minLength={8}
                id="origin-passwd"
                required
              />
            </Form.Control>
            <Button
              variant="ghost"
              className="hide-btn"
              onClick={() => setOpen((prev) => !prev)}
            >
              {open ? <EyeOpenIcon /> : <EyeClosedIcon />}
            </Button>
          </div>
          <Form.Message className="message" match="tooShort">
            Min 8 char
          </Form.Message>
        </Form.Field>
        <Form.Field className="password-field" name="password-repeat">
          <Form.Label className="FormLabel">Password repeat</Form.Label>
          <div className="password-inputs">
            <Form.Control asChild>
              <input
                className="password"
                type={openRepeat ? 'text' : 'password'}
                minLength={8}
                required
              />
            </Form.Control>
            <Button
              className="hide-btn"
              variant="ghost"
              onClick={() => setOpenRepeat((prev) => !prev)}
            >
              {openRepeat ? <EyeOpenIcon /> : <EyeClosedIcon />}
            </Button>
          </div>
          <Form.Message className="message" match="tooShort">
            Min 8 char
          </Form.Message>
          <Form.Message
            className="message"
            match={(value) =>
              value !==
              (document.getElementById('origin-passwd') as HTMLInputElement)
                .value
            }
          >
            Passwords do not match
          </Form.Message>
        </Form.Field>
        <Form.Submit asChild>
          <Button className="Button">SignUp</Button>
        </Form.Submit>
      </Form.Root>
      <Text>
        Do you have account? <Link href={'login'}>Login</Link>
      </Text>
      <div>
        <IconButton
          onClick={(e) => oauthSignUp(e, 'google')}
          className="google"
        >
          <Google />
        </IconButton>
        <IconButton onClick={(e) => oauthSignUp(e, 'git')} className="github">
          <Github />
        </IconButton>
      </div>
    </main>
  );
}
