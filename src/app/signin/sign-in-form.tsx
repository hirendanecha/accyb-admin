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
const initialValues: LoginSchema = {
  email: 'admin@gmail.com',
  password: 'password@123',
};

export default function SignInForm() {
  const [reset, setReset] = useState({});
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const onSubmit: SubmitHandler<LoginSchema> = async (data: LoginSchema) => {
    const result = await signIn('credentials', {
      ...data,
      redirect: false,
    });
    if (result?.ok) {
      console.log(result, 'ele');
      // router.push(routes.module.event);
      window.location.replace(routes.module.event);
    }
  };

  return (
    <>
      <Form<LoginSchema>
        validationSchema={loginSchema}
        // resetValues={reset}
        onSubmit={ (s) =>{
            console.log(s, 'elesss');
          onSubmit(s)}}
        useFormProps={{
          // defaultValues: initialValues,
        }}
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
            <Button className="w-full" type="submit" size="lg" color="info">
              <span>Log in</span>{' '}
              <PiArrowRightBold className="ms-2 mt-0.5 h-5 w-5" />
            </Button>
          </div>
        )}
      </Form>
    </>
  );
}
