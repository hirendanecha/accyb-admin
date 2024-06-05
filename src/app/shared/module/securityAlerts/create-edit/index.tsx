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
import {
  createSecurityAlert,
  updateSecurityAlert,
} from '@/redux/actions/securityAlertsAction';
import { routes } from '@/config/routes';
import { Button, Text } from 'rizzui';
import { CiSquareRemove } from 'react-icons/ci';
import { isArray } from 'lodash';
import EditDocUpload from '../../events/create-edit/edit-doc-upload';
import FileUpload from '../../events/create-edit/file-upload';

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

  const [docs, setDocs] = useState<File[]>([]);
  const [docUrl, setDocUrl] = useState<string>('');
  console.log(docUrl, 'docUrl');

  console.log(alertDetails, 'newsDetails');

  const defaultValues = useMemo(
    () => ({
      title: alertDetails?.title || '',
      description: alertDetails?.description || '',
      date: alertDetails?.date ? new Date(alertDetails.date) : new Date(),
      Heading: alertDetails?.Heading || [],
      document: alertDetails?.document || [],
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

    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('date', data.date);
    formData.append('Heading', JSON.stringify(data.Heading));

    // console.log(
    //   'formdata',
    //   formData.forEach((s) => {
    //     console.log(s);
    //   })
    // );

    for (const file of docs) {
      if (file) { 
        formData.append('document', file);
      }
    }
    for (var pair of formData.entries()) {
      console.log(pair[0]+ ', ' + pair[1],'formdata'); 
  }

    if (slug) {
      await dispatch(updateSecurityAlert({ id: slug, data: formData }))
        .unwrap()
        .then((res) => {
          console.log('res', res);
          setLoading(false);
          router.push(routes.securityAlerts);
          toast.success(
            <Text as="b">
              Security Alert successfully {slug ? 'updated' : 'created'}
            </Text>
          );
        });
    } else {
      await dispatch(createSecurityAlert(formData))
        .unwrap()
        .then((res) => {
          console.log('res', res);
          setLoading(false);
          router.push(routes.securityAlerts);
          toast.success(
            <Text as="b">
              Security Alert successfully {slug ? 'updated' : 'created'}
            </Text>
          );
        });
    }
  };

  useEffect(() => {
    reset(defaultValues);
    setDocUrl(alertDetails?.document || '');
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

          {slug ? (
            <EditDocUpload
              label="Documents"
              accept="all"
              multiple={false}
              files={docs}
              setFiles={setDocs}
              docUrl={docUrl}
              setDocUrl={setDocUrl}
              
            />
          ) : (
            <FileUpload
              label="Documents"
              accept="all"
              multiple={false}
              files={docs}
              setFiles={setDocs}
            />
          )}
        </FormGroup>
        <FormFooter
          // isLoading={isLoading}
          submitBtnText={
            slug ? 'Update Security Alert' : 'Create Security Alert'
          }
        />
      </form>
    </div>
  );
}
