'use client';

import { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { Element } from 'react-scroll';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  useForm,
  FormProvider,
  SubmitHandler,
  Controller,
} from 'react-hook-form';
import cn from '@/utils/class-names';
import { Input } from '@/components/ui/input';

import FormGroup from '@/app/shared/form-group';
import EventSummary from '@/app/shared/module/events/create-edit/event-summary';
import { CreateEventInput } from '@/utils/validators/create-event.schema';
import { useLayout } from '@/hooks/use-layout';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { DatePicker } from '@/components/ui/datepicker';
import QuillEditor from '@/components/ui/quill-editor';
import { useRouter } from 'next/navigation';
import FormFooter from '@/components/form-footer';
import {
  caseStudiesInput,
  caseStudiesFormSchema,
} from '@/utils/validators/create-caseStudies.schema';
import FileUpload from '../../events/create-edit/file-upload';
import { routes } from '@/config/routes';
import { NumberInput, Switch, Text } from 'rizzui';
import Image from 'next/image';
import { MdFileUpload } from 'react-icons/md';
import EditFileUpload from '../../events/create-edit/edit-file-upload';
import { createCaseStudies, updateCaseStudies } from '@/redux/actions/caseStudiesAction';

interface IndexProps {
  slug?: string;
  className?: string;
  caseStudiesDetails?: any;
  caseStudies?: caseStudiesInput;
}

export default function CreateEditProduct({
  caseStudiesDetails,
  slug,
  caseStudies,
  className,
}: IndexProps) {
  const { layout } = useLayout();
  const [isLoading, setLoading] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [fileUrl, setFileUrl] = useState<string>('');
  const router = useRouter();
  // const methods = useForm<CreateEventInput>({
  //   resolver: zodResolver(newsFormSchema),
  //   defaultValues: defaultValues(event),
  // });

  console.log(  caseStudiesDetails,'caseStudiesDetails');

  const defaultValues = useMemo(
    () => ({
      title: caseStudiesDetails?.title || '',
      description: caseStudiesDetails?.description || '',
      date: caseStudiesDetails?.date
        ? new Date(caseStudiesDetails.date)
        : new Date(),
      publishedBy: caseStudiesDetails?.publishedBy || '',
      image: caseStudiesDetails?.image || '',
    }),
    [caseStudiesDetails]
  );

  console.log('defaultvalues', defaultValues);

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
    resolver: zodResolver(caseStudiesFormSchema),
  });

  console.log('errors', errors);

  const fileWatch = watch('image');
  const dispatch = useDispatch<AppDispatch>();

  const onSubmit: SubmitHandler<caseStudiesInput> = (data: any) => {
    // alert("fdkjsagdfb")
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      console.log('caseStudies_data', data);
      const formData = new FormData() as any;
      formData.append('title', data.title);
      formData.append('description', data.description);
      formData.append('publishedBy', data.publishedBy);
      formData.append('date', data.date);

      if (!slug && !files[0]) {
        setError('image', {
          type: 'custom',
          message: 'Please select an image',
        });
        return;
      }

      for (const file of files) {
        if (file) {
          formData.append('image', file);
        }
      }

      if (slug) {
        dispatch(updateCaseStudies({ id: slug, data: formData }))
          .unwrap()
          .then((res) => {
            console.log('res', res);
            router.push(routes.caseStudies);
            toast.success(
              <Text as="b">
                Case Study successfully {slug ? 'updated' : 'created'}
              </Text>
            );
          })
          .catch((err) => {
            console.log('err', err);
          });
      } else {
        dispatch(createCaseStudies(formData))
          .unwrap()
          .then((res) => {
            console.log('res', res);
            // routes.module.event;
            router.push(routes.caseStudies);
            toast.success(
              <Text as="b">
                Case Study successfully {slug ? 'updated' : 'created'}
              </Text>
            );
          })
          .catch((err) => {
            console.log('err', err);
          });
      }

      // methods.reset();
    }, 600);
  };

  useEffect(() => {
    setFileUrl(caseStudiesDetails?.image || '');
    reset(defaultValues);
  }, [reset, defaultValues, setFileUrl, caseStudiesDetails?.image]);

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
            name="date"
            control={control}
            render={({ field: { value, onChange, onBlur } }) => (
              <DatePicker
                inputProps={{ label: 'Date' }}
                placeholderText="Date"
                dateFormat="dd/MM/yyyy"
                onChange={onChange}
                onBlur={onBlur}
                selected={value}
              />
            )}
          />

          <Input
            label="Published By"
            placeholder="Published By"
            {...register('publishedBy')}
            error={errors.publishedBy?.message as string}
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

          {slug ? (
            <EditFileUpload
              label="Image"
              accept="all"
              error={errors.image?.message as string}
              multiple
              files={files}
              setFiles={setFiles}
              fileUrl={fileUrl}
              setFileUrl={setFileUrl}
            />
          ) : (
            <FileUpload
              label="Image"
              accept="all"
              error={errors.image?.message as string}
              multiple
              files={files}
              setFiles={setFiles}
            />
          )}
        </FormGroup>
        <FormFooter
          isLoading={isLoading}
          submitBtnText={slug ? 'Update Case Study' : 'Create Case Study'}
        />
      </form>
    </div>
  );
}
