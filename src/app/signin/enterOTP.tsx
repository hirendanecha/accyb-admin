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

  const[data,setData]=useState(null);
  console.log(data, 'data');
  
  const [token,setToken]=useState('');
console.log(token, 'token');

  const [otp, setOtp] = useState(null);
  console.log(otp, 'otp');

  const handleSubmit = async(otp: number) => {
    console.log(otp, 'otp11');
    try {
      const response = await dispatch(enterOtp({ email, otp })).unwrap();
      
      console.log(response, 'response');
      const { data, token } = response;
      setData(data);
      setToken(token);
  
      const signInResponse = await signIn('credentials', {
       email: data.email,
        otp: otp,
        redirect: false,
      });
  
      console.log("signInResponse",signInResponse);
      
      if (signInResponse?.error) {
        toast.error(<Text as="b">Invalid credentials!!</Text>);
      } else {
        // handle successful sign-in
        localStorage.setItem('adminToken', token);
        router.push('/events');
        // window.location.replace('/events');
      }
    } catch (err) {
      toast.error(<Text as="b">Invalid OTP!!</Text>);
    }
      // const result = await signIn('credentials', {
      //   ...data,
      //   token,
      //   redirect: false,
      //   // callbackUrl: routes.signIn,
      // });
      // if (result?.ok) {
      //   console.log(result, 'ele');
      //   window.location.replace('/events');
      //   // setLoading(false);
      //   // setShowOTP(true);
      // }
      // console.log("this is result", result);
  
      // if (result?.error) {
      //   toast.error(
      //     <Text as="b">Please enter valid OTP</Text>
      //   )
      //   // setLoading(false);
      // } 
      
  };

  return (
    <>
      <div className="min-h-screen w-full display flex flex-col gap-4">
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
