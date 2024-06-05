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
import Image from 'next/image';
import { MdFileUpload } from 'react-icons/md';
import EditFileUpload from '../../events/create-edit/edit-file-upload';

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
  const [fileUrl, setFileUrl] = useState<string>('');
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
      rate: newsDetails?.rate || '',
      targetAudience: newsDetails?.targetAudience[0] || '',
      attachment: newsDetails?.attachment[0] || '',
      videoLink: newsDetails?.videoLink || '',
    }),
    [newsDetails]
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
    resolver: zodResolver(newsFormSchema),
  });

  console.log('errors', errors);

  const fileWatch = watch('attachment');
  const dispatch = useDispatch<AppDispatch>();

  const onSubmit: SubmitHandler<NewsEventInput> = (data: any) => {
    // alert("fdkjsagdfb")
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      console.log('news_data', data);
      const formData = new FormData() as any;
      formData.append('source', data.source);
      formData.append('title', data.title);
      formData.append('description', data.description);
      formData.append('publishedDate', data.publishedDate);
      formData.append('isPublished', data.isPublished);
      formData.append('rate', data.rate);
      formData.append('targetAudience', data.targetAudience);
      formData.append('videoLink', data.videoLink);

      if (!slug && !files[0]) {
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
            router.push(routes.news);
            toast.success(
              <Text as="b">
                News successfully {slug ? 'updated' : 'created'}
              </Text>
            );
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
            router.push(routes.news);
            toast.success(
              <Text as="b">
                News successfully {slug ? 'updated' : 'created'}
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
    setFileUrl(newsDetails?.attachment[0] || '');
    reset(defaultValues);
  }, [reset, defaultValues, setFileUrl, newsDetails?.attachment[0]]);

  return (
    <div className="flex items-center justify-center @container">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={cn('[&_label.block>span]:font-medium', className)}
        style={{ width: '70%' }}
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
            // error={errors.isPublished?.message as string}
          />

          <Input
            label="Rate"
            placeholder="Rate"
            {...register('rate', {
              valueAsNumber: true,
            })}
            error={errors.rate?.message as string}
            type="number"
          />

          <Input
            label="Targeted Audience"
            placeholder="Targeted audience"
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

          {slug ? (
            <EditFileUpload
              label="Files"
              accept="all"
              error={errors.attachment?.message as string}
              multiple
              files={files}
              setFiles={setFiles}
              fileUrl={fileUrl}
              setFileUrl={setFileUrl}
            />
          ) : (
            <FileUpload
              label="Files"
              accept="all"
              error={errors.attachment?.message as string}
              multiple
              files={files}
              setFiles={setFiles}
            />
          )}

          {/* <div
            className={merger}
            
          >
            <input
              {...register('attachment')}
              id="documents"
              type="file"
              accept="application/pdf"
              multiple={false}
            />
            <label
              htmlFor="documents"
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                setValue('attachment', e.dataTransfer.files);
              }}
            >
              {fileWatch && fileWatch?.item(0) ? (
                <div
                  direction={'row'}
                  alignItems={'center'}
                  gap={1.5}
                  maxWidth={'100%'}
                >
                  <Image src={FileThumbnail} alt='' />
                  <div className='flex flex-col'>
                    <p className="file-name" title={fileWatch?.item(0)?.name}>
                      {fileWatch?.item(0)?.name}
                    </p>
                    <p className="file-helper-text">
                      {`Size: ${(fileWatch?.item(0)?.size || 0) / 1000} KB`}
                    </p>
                  </div>
                </div>
              ) : (
                <>
                  <MdFileUpload />
                  <p className="file-name">Drag & Drop PDF Here</p>
                  <p className="file-helper-text">Maximum 80 MB</p>
                </>
              )}
            </label>
          </div>
          {errors.attachment && <p>{errors?.attachment.message}</p>} */}
        </FormGroup>
        <FormFooter
          isLoading={isLoading}
          submitBtnText={slug ? 'Update News' : 'Create News'}
        />
      </form>
    </div>
  );
}
