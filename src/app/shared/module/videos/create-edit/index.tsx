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
  VideoInput,
  videoFormSchema,
} from '@/utils/validators/create-video.schema';
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
import { createVideo, updateVideo } from '@/redux/actions/videoAction';

interface IndexProps {
  slug?: string;
  className?: string;
  videoDetails?: any;
  alert?: VideoInput;
}

export default function CreateEditProduct({
  videoDetails,
  slug,
  className,
}: IndexProps) {
  const { layout } = useLayout();
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();

  const [docs, setDocs] = useState<File[]>([]);
  const [docUrl, setDocUrl] = useState<string>('');
  console.log(docUrl, 'docUrl');

  console.log(videoDetails, 'newsDetails');

  const defaultValues = useMemo(
    () => ({
      name: videoDetails?.name || '',
      link: videoDetails?.link || '',
      thumbnail: videoDetails?.thumbnail || [],
    }),
    [videoDetails]
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
    resolver: zodResolver(videoFormSchema),
  });

  console.log('errors', errors);

  const dispatch = useDispatch<AppDispatch>();

  

  const onSubmit: SubmitHandler<VideoInput> = async (data) => {
    setLoading(true);
    console.log('security_Alert_data', data);

    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('link', data.link);

    // console.log(
    //   'formdata',
    //   formData.forEach((s) => {
    //     console.log(s);
    //   })
    // );

    for (const file of docs) {
      if (file) { 
        formData.append('thumbnail', file);
      }
    }
  //   for (var pair of formData.entries()) {
  //     console.log(pair[0]+ ', ' + pair[1],'formdata'); 
  // }

    if (slug) {
      await dispatch(updateVideo({ id: slug, data: formData }))
        .unwrap()
        .then((res) => {
          console.log('res', res);
          setLoading(false);
          router.push(routes.videos);
          toast.success(
            <Text as="b">
              Video successfully {slug ? 'updated' : 'created'}
            </Text>
          );
        });
    } else {
      await dispatch(createVideo(formData))
        .unwrap()
        .then((res) => {
          console.log('res', res);
          setLoading(false);
          router.push(routes.videos);
          toast.success(
            <Text as="b">
              Video successfully {slug ? 'updated' : 'created'}
            </Text>
          );
        });
    }
  };

  useEffect(() => {
    reset(defaultValues);
    setDocUrl(videoDetails?.thumbnail || '');
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
            label="Name"
            placeholder="name"
            {...register('name')}
            error={errors.name?.message as string}
          />

          <Input
            label="Link"
            placeholder="link"
            {...register('link')}
            error={errors.link?.message as string}
          />


          {slug ? (
            <EditDocUpload
              label="Thumbnail"
              accept="all"
              multiple={false}
              files={docs}
              setFiles={setDocs}
              docUrl={docUrl}
              setDocUrl={setDocUrl}
              
            />
          ) : (
            <FileUpload
              label="Thumbnail"
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
            slug ? 'Update Video' : 'Create Video'
          }
        />
      </form>
    </div>
  );
}
