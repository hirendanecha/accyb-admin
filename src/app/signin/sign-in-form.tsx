'use client';
import { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { PiArrowRightBold } from 'react-icons/pi';
import { Password } from '@/components/ui/password';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form } from '@/components/ui/form';
import { loginSchema, LoginSchema } from '@/utils/validators/login.schema';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { logIn } from '@/redux/actions/authAction';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { routes } from '@/config/routes';
import authAPI from '@/services/api/auth';
import toast from 'react-hot-toast';
import { Text } from 'rizzui';
import EnterOTP from './enterOTP';
// const initialValues: LoginSchema = {
//   email: 'admin@gmail.com',
//   password: 'password@123',
// };

export default function SignInForm() {
  const [reset, setReset] = useState({});
  const dispatch = useDispatch<AppDispatch>();
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();
  const [showOTP, setShowOTP] = useState(false);
  const [email,setEmail]=useState('');

  const onSubmit: SubmitHandler<LoginSchema> = async (data: LoginSchema) => {
    setLoading(true);
    setShowOTP(true);

    dispatch(logIn({ email: data.email, password: data.password })).unwrap().then((res) => {
      console.log('res', res);
      setEmail(res.data.data.email);
      
    });

    const result = await signIn('credentials', {
      ...data,
      redirect: false,
      // callbackUrl: routes.signIn,
    });
    // if (result?.ok) {
    //   console.log(result, 'ele');
    //   setLoading(false);
    //   setShowOTP(true);
    // // }
    // console.log("this is result", result);

    // if (result?.error) {
    //   toast.error(
    //     <Text as="b">Please enter valid credentials</Text>
    //   )
    //   setLoading(false);
    // } 
  };

  return (
    <>
    {!showOTP ? (
      <>
         <Form<LoginSchema>
        validationSchema={loginSchema}
        // resetValues={reset}
        onSubmit={(s) => {
          console.log(s, 'elesss');
          onSubmit(s);
        }}
        useFormProps={
          {
            // defaultValues: initialValues,
          }
        }
        className="min-h-screen w-full justify-between"
      >
        {({ register, formState: { errors } }) => (
          <div className="space-y-5">
            <Input
              type="email"
              size="lg"
              label="Email"
              placeholder="Enter your email"
              color="info"
              className="[&>label>span]:font-medium"
              inputClassName="text-sm"
              {...register('email')}
              error={errors.email?.message}
            />
            <Password
              label="Password"
              placeholder="Enter your password"
              size="lg"
              className="[&>label>span]:font-medium"
              inputClassName="text-sm"
              color="info"
              {...register('password')}
              error={errors.password?.message}
            />
            <Button className="w-full" type="submit" size="lg" color="info" isLoading={isLoading} >
              <span>Log in</span>{' '}
              <PiArrowRightBold className="ms-2 mt-0.5 h-5 w-5" />
            </Button>
          </div>
        )}
      </Form>
      </>
    ) : (
      <>
        <EnterOTP email={email} />
      </>
    )}

     
    </>
  );
}
