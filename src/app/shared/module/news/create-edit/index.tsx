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
  NewsEventInput,
  newsFormSchema,
} from '@/utils/validators/create-news.schema';
import FileUpload from '../../events/create-edit/file-upload';
import { createNews, updateNews } from '@/redux/actions/newsActions';
import { routes } from '@/config/routes';
import { NumberInput, Switch, Text } from 'rizzui';


interface IndexProps {
  slug?: string;
  className?: string;
  newsDetails?: any;
  event?: CreateEventInput;
}

export default function CreateEditProduct({
  newsDetails,
  slug,
  event,
  className,
}: IndexProps) {
  const { layout } = useLayout();
  const [isLoading, setLoading] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const router = useRouter();
  // const methods = useForm<CreateEventInput>({
  //   resolver: zodResolver(newsFormSchema),
  //   defaultValues: defaultValues(event),
  // });

  console.log(newsDetails, 'newsDetails');

  const defaultValues = useMemo(
    () => ({
      source: newsDetails?.source[0] || '',
      title: newsDetails?.title || '',
      description: newsDetails?.description || '',
      publishedDate: newsDetails?.publishedDate
        ? new Date(newsDetails.publishedDate)
        : new Date(),
      isPublished: newsDetails?.isPublished || '',
      rate: newsDetails?.rate.toString() || '',
      targetAudience: newsDetails?.targetAudience[0] || '',
      attachment: newsDetails?.attachment[0] || '',
    }),
    [newsDetails]
  );

  console.log('defaultvalues',defaultValues);
  

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
    resolver: zodResolver(newsFormSchema),
  });

  console.log('errors', errors);

  const dispatch = useDispatch<AppDispatch>();

  const onSubmit: SubmitHandler<NewsEventInput> = (data: any) => {
    // alert("fdkjsagdfb")
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      console.log('event_data', data);
      const formData = new FormData() as any;
      formData.append('source', data.source);
      formData.append('title', data.title);
      formData.append('description', data.description);
      formData.append('publishedDate', data.publishedDate);
      formData.append('isPublished', data.isPublished);
      formData.append('speakers', data.speakers);
      formData.append('rate', Number(data.rate));
      formData.append('targetAudience', data.targetAudience);
      if (!files[0]) {
        setError('attachment', {
          type: 'custom',
          message: 'Please select an image',
        });
        return;
      }

      for (const file of files) {
        if (file) {
          formData.append('attachment', file);
        }
      }

      if (slug) {
        dispatch(updateNews({ id: slug, data: formData }))
          .unwrap()
          .then((res) => {
            console.log('res', res);
            router.push(routes.module.news);
          })
          .catch((err) => {
            console.log('err', err);
          });
      } else {
        dispatch(createNews(formData))
          .unwrap()
          .then((res) => {
            console.log('res', res);
            // routes.module.event;
            router.push(routes.module.news);
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
            label="Source"
            placeholder="Source"
            {...register('source')}
            error={errors.source?.message as string}
          />

          <Input
            label="Title"
            placeholder="Title"
            {...register('title')}
            error={errors.title?.message as string}
          />
          <Controller
            name="publishedDate"
            control={control}
            render={({ field: { value, onChange, onBlur } }) => (
              <DatePicker
                inputProps={{ label: 'Published Date' }}
                placeholderText="Published Date"
                dateFormat="dd/MM/yyyy"
                onChange={onChange}
                onBlur={onBlur}
                selected={value}
              />
            )}
          />
          <Switch
            variant="active"
            label="Is Published"
            {...register('isPublished')}
            error={errors.isPublished?.message as string}
          />
          <Input
            label="Rate"
            inputClassName="w-24 h-9"
            placeholder="100.00"
            // type="number"
            {...register('rate')}
            error={errors.rate?.message as string}
          />
          <Input
            label="Targeted Audience"
            placeholder="Speakers"
            {...register('targetAudience')}
            error={errors.targetAudience?.message as string}
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
          <FileUpload
            label="Files"
            accept="all"
            // name="pictureLink"
            error={errors.attachment?.message as string}
            multiple
            files={files}
            setFiles={setFiles}
          />
        </FormGroup>
        <FormFooter
          isLoading={isLoading}
          submitBtnText={slug ? 'Update News' : 'Create News'}
        />
      </form>
    </div>
  );
}
