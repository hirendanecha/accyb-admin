'use client';
import Logo from '@/components/logo';
import { changePassword } from '@/redux/actions/authAction';
import { AppDispatch } from '@/redux/store';
import {
  ChangePasswordInput,
  changePasswordSchema,
} from '@/utils/validators/change-password.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { Button, Input, Text } from 'rizzui';

export default function ChangePassword() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const defaultValues = {
    oldPassword: '',
    newPassword: '',
  };

  const {
    control,
    handleSubmit,
    setValue,
    register,
    reset,
    setError,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: zodResolver(changePasswordSchema),
  });

  const onSubmit: SubmitHandler<ChangePasswordInput> = async (data) => {
    console.log(data, 'data');

    if (data.oldPassword === data.newPassword) {
      toast.error(
        <Text as="b">New password should not be same as old password</Text>
      );
      return;
    } else {
      dispatch(changePassword(data))
        .unwrap()
        .then((res) => {
          console.log(res, 'res');
          toast.success(<Text as="b">Password changed successfully</Text>);
          router.push('/events');
        })
        .catch((err) => {
          console.log(err, 'err');
          toast.error(<Text as="b">Please enter corect password</Text>);
        });
    }
  };

  return (
    <>
      <div className="display my-36 flex min-h-screen w-full flex-col items-center gap-4">
        <div>
          <Link href={'/'} className="mb-6 inline-flex max-w-[168px] xl:mb-8">
            <Logo className="max-w-[155px]" />
          </Link>
        </div>
        <div
          className="[&>label>span]:font-medium"
          // style={{
          //   marginTop: -30,
          //   marginBottom: 30,
          // }}
        >
          <span
            style={{
              fontSize: '18px',
              fontWeight: 600,
            }}
          >
            Change Password
          </span>
        </div>
        <form
          className="display !important flex w-1/4 flex-col gap-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Input
            type="text"
            label="Old Password"
            placeholder="Enter Old Password"
            {...register('oldPassword')}
            error={errors.oldPassword?.message as string}
          />
          <Input
            type="text"
            label="New Password"
            placeholder="Enter New Password"
            {...register('newPassword')}
            error={errors.newPassword?.message as string}
          />
          <Button
            className="w-full"
            type="submit"
            size="lg"
            color="info"
            // onClick={()=>handleSubmit()}
          >
            <span>Submit</span>
          </Button>
        </form>
      </div>
    </>
  );
}
