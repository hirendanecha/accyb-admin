'use client';

import { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { Element } from 'react-scroll';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  useForm,
  FormProvider,
  SubmitHandler,
  useFormContext,
  Controller,
} from 'react-hook-form';
import cn from '@/utils/class-names';
import { Text } from '@/components/ui/text';
import { Input } from '@/components/ui/input';

import FormGroup from '@/app/shared/form-group';
import EventSummary from '@/app/shared/module/events/create-edit/event-summary';
import {
  CreateEventInput,
  eventFormSchema,
} from '@/utils/validators/create-event.schema';
import { useLayout } from '@/hooks/use-layout';
import { LAYOUT_OPTIONS } from '@/config/enums';
import { useDispatch } from 'react-redux';
import { createEvent, updateEvent } from '@/redux/actions/eventAction';
import { AppDispatch } from '@/redux/store';
import UploadZone from '@/components/ui/file-upload/upload-zone';
import { DatePicker } from '@/components/ui/datepicker';
import QuillEditor from '@/components/ui/quill-editor';
import FileUpload from './file-upload';
import { Button } from 'rizzui';
import { routes } from '@/config/routes';
import { useRouter } from 'next/navigation';
interface IndexProps {
  slug?: string;
  className?: string;
  eventsDetails?: any;
  event?: CreateEventInput;
}

export default function CreateEditEvent({
  eventsDetails,
  slug,
  event,
  className,
}: IndexProps) {
  const { layout } = useLayout();
  const [isLoading, setLoading] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const router = useRouter();
  // const methods = useForm<CreateEventInput>({
  //   resolver: zodResolver(eventFormSchema),
  //   // defaultValues: defaultValues(event),
  // });
  console.log(eventsDetails, 'eventsDetailsdldldldldldldl');

  const defaultValues = useMemo(
    () => ({
      title: eventsDetails?.title || '',
      description: eventsDetails?.description || '',
      startDate: eventsDetails?.startDate
        ? new Date(eventsDetails.startDate)
        : new Date(),
      endDate: eventsDetails?.endDate
        ? new Date(eventsDetails.endDate)
        : new Date(),
      speakers: eventsDetails?.speakers[0] || '',
      access: eventsDetails?.access || '',
      targetAudience: eventsDetails?.targetAudience[0] || '',
      registerLink: eventsDetails?.registerLink || '',
      pictureLink: eventsDetails?.pictureLink || '',
    }),
    [eventsDetails]
  );

  const {
    control,
    handleSubmit,
    setValue,
    register,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: zodResolver(eventFormSchema),
  });

  console.log('errors', errors);

  const dispatch = useDispatch<AppDispatch>();

  const onSubmit: SubmitHandler<CreateEventInput> = (data: any) => {
    console.log('eventDataaaaaaaaaaaaaa',data);
    
    // alert("fdkjsagdfb")
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      console.log('event_data', data);
      const formData = new FormData() as any;
      formData.append('title', data.title);
      formData.append('description', data.description);
      formData.append('startDate', data.startDate);
      formData.append('endDate', data.endDate);
      formData.append('speakers', data.speakers);
      formData.append('access', data.access);
      formData.append('targetAudience', data.targetAudience);
      formData.append('registerLink', data.registerLink);
      // formData.append('pictureLink', data.files);
      if (!files[0]) {
        setError('pictureLink', {
          type: 'custom',
          message: 'Please select an image',
        });
        return;
      }

      for (const file of files) {
        if (file) {
          formData.append('pictureLink', file);
        }
      }

      if (slug) {
        dispatch(updateEvent({ id: slug, data: formData }))
          .unwrap()
          .then((res) => {
            console.log('res', res);
            router.push(routes.module.event);
          })
          .catch((err) => {
            console.log('err', err);
          });
      } else {
        dispatch(createEvent(formData))
          .unwrap()
          .then((res) => {
            console.log('res', res);
            // routes.module.event;
            router.push(routes.module.event);
          })
          .catch((err) => {
            console.log('err', err);
          });
      }

      toast.success(
        <Text as="b">Event successfully {slug ? 'updated' : 'created'}</Text>
      );
      // methods.reset();
    }, 600);
  };

  useEffect(() => {
    reset(defaultValues);
  }, [reset, defaultValues]);

  return (
    <div className="@container">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={cn('[&_label.block>span]:font-medium', className)}
      >
        <FormGroup title="" description="" className={cn(className)}>
          <Input
            label="Title"
            placeholder="Event title"
            {...register('title')}
            error={errors.title?.message as string}
          />
          <Input
            label="Targeted Audience"
            placeholder="Targeted Audience"
            {...register('targetAudience')}
            error={errors.targetAudience?.message as string}
          />
          <Input
            label="Access"
            placeholder="access"
            {...register('access')}
            error={errors.access?.message as string}
          />
          <Input
            label="Register Link"
            placeholder="Register Link"
            {...register('registerLink')}
            error={errors.registerLink?.message as string}
          />
          <Input
            label="Speakers"
            placeholder="Speakers"
            {...register('speakers')}
            error={errors.speakers?.message as string}
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
            name="startDate"
            control={control}
            render={({ field: { value, onChange, onBlur } }) => (
              <DatePicker
                inputProps={{ label: 'Start date' }}
                placeholderText="Start Date"
                dateFormat="dd/MM/yyyy"
                onChange={onChange}
                onBlur={onBlur}
                selected={value}
              />
            )}
          />
          <Controller
            name="endDate"
            control={control}
            render={({ field: { value, onChange, onBlur } }) => (
              <DatePicker
                inputProps={{ label: 'End date' }}
                placeholderText="End Date"
                dateFormat="dd/MM/yyyy"
                onChange={onChange}
                onBlur={onBlur}
                selected={value}
              />
            )}
          />
          <FileUpload
            label="Files"
            accept="all"
            // name="pictureLink"
            error={errors.pictureLink?.message as string}
            multiple
            files={files}
            setFiles={setFiles}
          />
        </FormGroup>
        <Button
          type="submit"
          isLoading={isLoading}
          className="w-full @xl:w-auto dark:bg-gray-100 dark:text-white dark:active:bg-gray-100"
        >
          {slug ? 'Update Event' : 'Create Event'}
        </Button>
      </form>
    </div>
  );
}
