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
import { Button, FileInput, Switch } from 'rizzui';
import { routes } from '@/config/routes';
import { useRouter } from 'next/navigation';
import { isArray } from 'lodash';
import FormFooter from '@/components/form-footer';
import { CiSquareRemove } from 'react-icons/ci';
import Image from 'next/image';
import EditFileUpload from './edit-file-upload';
import EditDocUpload from './edit-doc-upload';

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
  // const [isLoading, setLoading] = useState(false);

  const [files, setFiles] = useState<File[]>([]);
  const [fileUrl, setFileUrl] = useState<string>('');
  const [filesError, setFilesError] = useState('');
  console.log('filesError', filesError);

  useEffect(() => {
    if (files.length) {
      setFilesError('');
    }
  }, [files]);

  const [docs, setDocs] = useState<File[]>([]);
  const [docUrl, setDocUrl] = useState<string>('');
  console.log(docUrl, 'docUrl');

  const router = useRouter();
  // const methods = useForm<CreateEventInput>({
  //   resolver: zodResolver(eventFormSchema),
  //   // defaultValues: defaultValues(event),
  // });
  console.log(eventsDetails, 'eventsDetailsdldldldldldldl');

  const defaultValues: CreateEventInput = useMemo(
    () => ({
      title: eventsDetails?.title || '',
      description: eventsDetails?.description || '',
      startDate: eventsDetails?.startDate
        ? new Date(eventsDetails.startDate)
        : new Date(),
      endDate: eventsDetails?.endDate
        ? new Date(eventsDetails.endDate)
        : new Date(),
      speakers: eventsDetails?.speakers || [],
      programType: eventsDetails?.programType || [],
      access: eventsDetails?.access || '',
      targetAudience: eventsDetails?.targetAudience[0] || '',
      registerLink: eventsDetails?.registerLink || '',
      pictureLink: eventsDetails?.pictureLink || [],
      otherDocument: eventsDetails?.otherDocument || [],
      eventType: eventsDetails?.eventType || '',
      isFeatured: eventsDetails?.isFeatured || '',
      location: eventsDetails?.location || '',
      videolink: eventsDetails?.videolink || '',
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
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: zodResolver(eventFormSchema),
  });

  console.log('errors', errors);

  const dispatch = useDispatch<AppDispatch>();
  const speakers = watch('speakers') || [];
  console.log(speakers, 'speakers');

  const ProgramTypes = watch('programType') || [];

  //handleSpeakerChange

  const addSpeaker = () => {
    setValue('speakers', speakers.concat(''));
  };

  console.log(eventsDetails?.pictureLink, 'eventsDetails?.pictureLink');

  const removeSpeaker = (index: number) => {
    const updatedSpeakers = [...speakers];
    updatedSpeakers.splice(index, 1);

    setValue('speakers', updatedSpeakers);
  };

  const handleSpeakerChange = (index: number, value: string) => {
    const updatedSpeakers = [...speakers];
    updatedSpeakers[index] = value;
    setValue('speakers', updatedSpeakers);
  };

  const onSubmit: SubmitHandler<CreateEventInput> = async (data) => {
    console.log('eventDataaaaaaaaaaaaaa', data);

    if (!slug && !files[0]) {
      setFilesError('Please select an image');
      return;
    }
    console.log('event_data', data);
    console.log('speakersData', data.speakers);

    const formData = new FormData() as any;
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('startDate', data.startDate);
    formData.append('endDate', data.endDate);
    formData.append('speakers', JSON.stringify(data.speakers));
    formData.append('programType', data.programType);
    formData.append('access', data.access);
    formData.append('targetAudience', data.targetAudience);
    formData.append('registerLink', data.registerLink);
    formData.append('eventType', data.eventType);
    formData.append('isFeatured', data.isFeatured);
    formData.append('location', data.location);
    formData.append('videolink', data.videolink);

    console.log('FORMDATA', formData);

    for (const file of files) {
      if (file) {
        formData.append('pictureLink', file);
      }
    }

    for (const doc of docs) {
      if (doc) {
        formData.append('otherDocument', doc);
      }
    }

    if (slug) {
      await dispatch(updateEvent({ id: slug, data: formData }))
        .unwrap()
        .then((res) => {
          console.log('res', res);
          router.push(routes.event);
          if (res?.success) {
            toast.success(
              <Text as="b">
                Event successfully {slug ? 'updated' : 'created'}
              </Text>
            );
            router.push(routes.event);
          }
        })
        .catch((err) => {
          console.log('err', err);
        });
    } else {
      await dispatch(createEvent(formData))
        .unwrap()
        .then((res) => {
          console.log('res', res);
          if (res?.success) {
            toast.success(
              <Text as="b">
                Event successfully {slug ? 'updated' : 'created'}
              </Text>
            );
            router.push(routes.event);
          }
        })
        .catch((err) => {
          console.log('err', err);
        });
    }
  };

  useEffect(() => {
    setFileUrl(eventsDetails?.pictureLink || '');
    setDocUrl(eventsDetails?.otherDocument || '');
    reset(defaultValues);
  }, [
    reset,
    defaultValues,
    setFileUrl,
    eventsDetails?.pictureLink,
    setDocUrl,
    eventsDetails?.otherDocument,
  ]);

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

          {/* {/ speaker /} */}

          <div>
            {isArray(speakers) &&
              speakers.length > 0 &&
              speakers?.map((speaker, index) => {
                return (
                  <div key={index} className="flex w-full flex-grow items-end ">
                    <Input
                      label={`Speaker ${index + 1}`}
                      placeholder="Speaker"
                      value={speaker}
                      className="flex-grow"
                      onChange={(e) =>
                        handleSpeakerChange(index, e.target.value)
                      }
                    />
                    {index > 0 && (
                      <Button
                        type="button"
                        onClick={() => removeSpeaker(index)}
                        variant="text"
                        className="p-0"
                      >
                        <CiSquareRemove className="h-12 w-12" />
                      </Button>
                    )}
                  </div>
                );
              })}
            <Button type="button" onClick={addSpeaker} className="mt-4">
              Add Speaker
            </Button>
          </div>

          <Input
            label="Location"
            // inputClassName="w-24 h-9"
            placeholder="location"
            // type="number"
            {...register('location')}
            error={errors.location?.message as string}
          />

          <Controller
            control={control}
            name="programType"
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <QuillEditor
                value={value}
                onChange={onChange}
                error={errors.programType?.message as string}
                label="Program Type"
                className="col-span-full [&_.ql-editor]:min-h-[100px]"
                labelClassName="font-medium text-gray-700 dark:text-gray-600 mb-1.5"
              />
            )}
          />

          <div style={{ display: 'flex', gap: 10, alignItems: 'start' }}>
            <label style={{ fontWeight: 500 }}>Event Type :</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <input
                type="radio"
                id="free"
                value="free"
                defaultChecked
                {...register('eventType')}
              />
              <label htmlFor="free">Free</label>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <input
                type="radio"
                id="paid"
                value="paid"
                {...register('eventType')}
              />
              <label htmlFor="paid">Paid</label>
            </div>
          </div>

          <Switch
            label="Is Featured"
            variant="active"
            {...register('isFeatured')}
            error={errors.isFeatured?.message as string}
          />

          <Input
            label="Video Link"
            placeholder="video link"
            {...register('videolink')}
            error={errors.videolink?.message as string}
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
                dateFormat="dd MMMM yyyy hh:mm"
                onChange={onChange}
                onBlur={onBlur}
                selected={value}
                showTimeSelect
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
                dateFormat="dd MMMM yyyy hh:mm"
                onChange={onChange}
                onBlur={onBlur}
                selected={value}
                showTimeSelect
              />
            )}
          />

          {slug ? (
            <EditFileUpload
              label="Files"
              accept="all"
              multiple={false}
              files={files}
              setFiles={setFiles}
              error={filesError}
              fileUrl={fileUrl}
              setFileUrl={setFileUrl}
            />
          ) : (
            <FileUpload
              label="Files"
              accept="all"
              multiple={false}
              files={files}
              setFiles={setFiles}
              error={filesError}
            />
          )}

          {slug ? (
            <EditDocUpload
              label="Other Documents"
              accept="all"
              multiple={false}
              files={docs}
              setFiles={setDocs}
              docUrl={docUrl}
              setDocUrl={setDocUrl}
            />
          ) : (
            <FileUpload
              label="Other Documents"
              accept="all"
              multiple={false}
              files={docs}
              setFiles={setDocs}
            />
          )}
        </FormGroup>
        <FormFooter
          isLoading={isSubmitting}
          submitBtnText={slug ? 'Update Event' : 'Create Event'}
        />
      </form>
    </div>
  );
}
