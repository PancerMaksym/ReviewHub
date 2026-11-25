'use client';

import { Button } from '@radix-ui/themes';
import {
  Form,
  unstable_OneTimePasswordField as OneTimePasswordField,
} from 'radix-ui';
import * as React from 'react';
import { EyeClosedIcon, EyeOpenIcon } from '@radix-ui/react-icons';
import '../../style/login.scss';

export default function ResetPage() {
  const [open, setOpen] = React.useState(false);
  const [openRepeat, setOpenRepeat] = React.useState(false);

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <main className="reset-page">
      <h2>Reset password</h2>
      <Form.Root className="reset-form">
        <Form.Field className="password-field" name="password">
          <Form.Label className="FormLabel">Password</Form.Label>
          <div className="password-inputs">
            <Form.Control asChild>
              <input
                className="password"
                id="origin-passwd"
                type={open ? 'text' : 'password'}
                minLength={8}
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
          <Button className="Button" style={{ marginTop: 10 }}>
            Reset
          </Button>
        </Form.Submit>
      </Form.Root>
    </main>
  );
}
