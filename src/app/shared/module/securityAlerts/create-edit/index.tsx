'use client';

import { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import cn from '@/utils/class-names';
import { Input } from '@/components/ui/input';
import FormGroup from '@/app/shared/form-group';
import { useLayout } from '@/hooks/use-layout';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { DatePicker } from '@/components/ui/datepicker';
import QuillEditor from '@/components/ui/quill-editor';
import { useRouter } from 'next/navigation';
import FormFooter from '@/components/form-footer';
import {
  SecurityAlertInput,
  securityAlertFormSchema,
} from '@/utils/validators/create-security-alerts.schema';
import { createSecurityAlert } from '@/redux/actions/securityAlertsAction';
import { routes } from '@/config/routes';
import { Button, Text } from 'rizzui';
import { CiSquareRemove } from 'react-icons/ci';
import { isArray } from 'lodash';

interface IndexProps {
  slug?: string;
  className?: string;
  alertDetails?: any;
  alert?: SecurityAlertInput;
}

export default function CreateEditProduct({
  alertDetails,
  slug,
  className,
}: IndexProps) {
  const { layout } = useLayout();
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();

  console.log(alertDetails, 'newsDetails');

  const defaultValues = useMemo(
    () => ({
      title: alertDetails?.title || '',
      description: alertDetails?.description || '',
      Date: alertDetails?.Date ? new Date(alertDetails.Date) : new Date(),
      Heading: alertDetails?.Heading || [''],
    }),
    [alertDetails]
  );

  console.log('defaultvalues', defaultValues);

  const {
    control,
    handleSubmit,
    setValue,
    register,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: zodResolver(securityAlertFormSchema),
  });

  console.log('errors', errors);

  const dispatch = useDispatch<AppDispatch>();

  const Heading = watch('Heading') || [];
  console.log(Heading, 'Heading');

  const addHeading = () => {
    setValue('Heading', Heading.concat(''));
  };

  const removeHeading = (index: number) => {
    const updatedHeading = [...Heading];
    updatedHeading.splice(index, 1);
    setValue('Heading', updatedHeading);
  };

  const handleHeadingChange = (index: number, value: string) => {
    const updatedHeading = [...Heading];
    updatedHeading[index] = value;
    setValue('Heading', updatedHeading);
  };

  const onSubmit: SubmitHandler<SecurityAlertInput> = async (data) => {
    setLoading(true);
    console.log('security_Alert_data', data);

    

    try {
      await dispatch(createSecurityAlert({ data })).unwrap();
      setLoading(false);
      router.push(routes.securityAlerts);
      toast.success(
        <Text as="b">
          Security Alert successfully {slug ? 'updated' : 'created'}
        </Text>
      );
    } catch (err) {
      console.log('err', err);
      setLoading(false);
    }
  };

  

  useEffect(() => {
    reset(defaultValues);
  }, [reset, defaultValues]);

  return (
    <div className="flex items-center justify-center @container">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={cn('[&_label.block>span]:font-medium', className)}
        style={{ width: '70%' }}
      >
        <FormGroup title="" description="" className={cn(className)}>
          <Input
            label="Title"
            placeholder="Title"
            {...register('title')}
            error={errors.title?.message as string}
          />

          <Controller
            control={control}
            name="description"
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <QuillEditor
                value={value}
                onChange={onChange}
                error={errors.description?.message as string}
                label="Description"
                className="col-span-full [&_.ql-editor]:min-h-[100px]"
                labelClassName="font-medium text-gray-700 dark:text-gray-600 mb-1.5"
              />
            )}
          />

          <Controller
            name="date"
            control={control}
            render={({ field: { value, onChange, onBlur } }) => (
              <DatePicker
                inputProps={{ label: 'date' }}
                placeholderText="date"
                dateFormat="dd/MM/yyyy"
                onChange={onChange}
                onBlur={onBlur}
                selected={value}
              />
            )}
          />

          <div>
            {isArray(Heading) &&
              Heading.length > 0 &&
              Heading.map((heading, index) => (
                <div key={index} className="flex w-full flex-grow items-end ">
                  <Input
                    label={`Heading ${index + 1}`}
                    placeholder="heading"
                    value={heading}
                    className="flex-grow"
                    onChange={(e) => handleHeadingChange(index, e.target.value)}
                  />
                  {index > 0 && (
                    <Button
                      type="button"
                      onClick={() => removeHeading(index)}
                      variant="text"
                      className="p-0"
                    >
                      <CiSquareRemove className="h-12 w-12" />
                    </Button>
                  )}
                </div>
              ))}
            <Button type="button" onClick={addHeading} className="mt-4">
              Add Heading
            </Button>
          </div>
        </FormGroup>
        <FormFooter
          isLoading={isLoading}
          submitBtnText={
            slug ? 'Update Security Alert' : 'Create Security Alert'
          }
        />
      </form>
    </div>
  );
}
