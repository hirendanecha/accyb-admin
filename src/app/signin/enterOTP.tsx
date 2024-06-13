'use client';
import { enterOtp } from '@/redux/actions/authAction';
import { AppDispatch } from '@/redux/store';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Input, Text } from 'rizzui';
import { signIn } from 'next-auth/react';
import { error } from 'console';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function EnterOTP({ email }: any) {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const [otp, setOtp] = useState(0);
  console.log(otp, 'otp');

  const handleSubmit = (otp: number) => {
    const result = dispatch(enterOtp({ email, otp }))
      .unwrap()
      .then((res) => {
        console.log(res, 'res');
        window.location.replace('/events');
      })
      .catch((err) => {
        toast.error(
          <Text as="b">Invalid OTP!!</Text>
        );
      });

      
  };

  return (
    <>
      <div className="space-y-5">
        <Input
          name="otp"
          type="number"
          label="OTP"
          placeholder="Enter your OTP"
          onChange={(e) => setOtp(e.target.value)}
        />
        <Button
          className="w-full"
          type="button"
          size="lg"
          color="info"
          onClick={() => handleSubmit(otp)}
        >
          <span>Submit OTP</span>
        </Button>
      </div>
    </>
  );
}
