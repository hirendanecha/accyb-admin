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
  FormationInput,
  formationSchema,
} from '@/utils/validators/create-formation.schema';
import FileUpload from '../../events/create-edit/file-upload';
import { createNews, updateNews } from '@/redux/actions/newsActions';
import { routes } from '@/config/routes';
import { Button, NumberInput, Switch, Text } from 'rizzui';
import Image from 'next/image';
import { MdFileUpload } from 'react-icons/md';
import EditFileUpload from '../../events/create-edit/edit-file-upload';
import { isArray } from 'lodash';
import { CiSquareRemove } from 'react-icons/ci';
import { createFormation, updateFormation } from '@/redux/actions/formationAction';

interface IndexProps {
  slug?: string;
  className?: string;
  formationDetails?: any;
  formation?: FormationInput;
}

export default function CreateEditProduct({
  formationDetails,
  slug,
  formation,
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

  console.log(formationDetails, 'formationDetails');

  const defaultValues = useMemo(
    () => ({
      title: formationDetails?.title || '',
      description: formationDetails?.description || '',
      heading: formationDetails?.heading || [],
      cost: formationDetails?.cost || '',
      duration: formationDetails?.duration || '',
      domain: formationDetails?.domain || '',
      typeOfFormation: formationDetails?.typeOfFormation || '',
      territory: formationDetails?.territory || '',
      trainingSite: formationDetails?.trainingSite || '',
      targetedLevel: formationDetails?.targetedLevel || '',
      titleObtained: formationDetails?.titleObtained || '',
      financingSolution: formationDetails?.financingSolution || '',
      targetedProfessions: formationDetails?.targetedProfessions || [],
    }),
    [formationDetails]
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
    resolver: zodResolver(formationSchema),
  });

  console.log('errors', errors);

  // const fileWatch = watch('attachment');
  const dispatch = useDispatch<AppDispatch>();

  const heading = watch('heading') || [];
  console.log(heading, 'heading');

  const addheading = () => {
    setValue('heading', heading.concat(''));
  };

  const removeheading = (index: number) => {
    const updatedheading = [...heading];
    updatedheading.splice(index, 1);
    setValue('heading', updatedheading);
  };

  const handleheadingChange = (index: number, value: string) => {
    const updatedheading = [...heading];
    updatedheading[index] = value;
    setValue('heading', updatedheading);
  };

  const targetedProfessions = watch('targetedProfessions') || [];
  console.log(targetedProfessions, 'targetedProfessions');

  const addtargetedProfessions = () => {
    setValue('targetedProfessions', targetedProfessions.concat(''));
  };

  const removetargetedProfessions = (index: number) => {
    const updatedtargetedProfessions = [...targetedProfessions];
    targetedProfessions.splice(index, 1);
    setValue('heading', targetedProfessions);
  };

  const handletargetedProfessionsChange = (index: number, value: string) => {
    const updatedtargetedProfessions = [...targetedProfessions];
    updatedtargetedProfessions[index] = value;
    setValue('targetedProfessions', updatedtargetedProfessions);
  };

  const onSubmit: SubmitHandler<FormationInput> = (data: any) => {
    // alert("fdkjsagdfb")
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      console.log('formation_data', data);
      // const formData = new FormData() as any;
      // formData.append('title', data.title);
      // formData.append('description', data.description);
      // formData.append('heading', JSON.stringify(data.heading));
      // formData.append('cost', data.cost);
      // formData.append('duration', data.duration);
      // formData.append('domain', data.domain);
      // formData.append('typeOfFormation', data.typeOfFormation);
      // formData.append('territory', data.territory);
      // formData.append('trainingSite', data.trainingSite);
      // formData.append('targetedLevel', data.targetedLevel);
      // formData.append('titleObtained', data.titleObtained);
      // formData.append('financingSolution', data.financingSolution);
      // formData.append('targetedProfessions', JSON.stringify(data.targetedProfessions));

      if (slug) {
        dispatch(updateFormation({ id: slug, data: data }))
          .unwrap()
          .then((res) => {
            console.log('res', res);
            router.push(routes.formations);
            toast.success(
              <Text as="b">
                Formation successfully {slug ? 'updated' : 'created'}
              </Text>
            );
          })
          .catch((err) => {
            console.log('err', err);
          });
      } else {
        dispatch(createFormation(data))
          .unwrap()
          .then((res) => {
            console.log('res', res);
            // routes.module.event;
            router.push(routes.formations);
            toast.success(
              <Text as="b">
                Formation successfully {slug ? 'updated' : 'created'}
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

          <div>
            {isArray(heading) &&
              heading.length > 0 &&
              heading.map((ele, index) => (
                <div key={index} className="flex w-full flex-grow items-end ">
                  <Input
                    label={`Heading ${index + 1}`}
                    placeholder="heading"
                    value={ele}
                    className="flex-grow"
                    onChange={(e) => handleheadingChange(index, e.target.value)}
                  />
                  {index > 0 && (
                    <Button
                      type="button"
                      onClick={() => removeheading(index)}
                      variant="text"
                      className="p-0"
                    >
                      <CiSquareRemove className="h-12 w-12" />
                    </Button>
                  )}
                </div>
              ))}
            <Button type="button" onClick={addheading} className="mt-4">
              Add Heading
            </Button>
          </div>

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
          <Input
            label="Cost"
            placeholder="Cost"
            {...register('cost', { valueAsNumber: true })}
            error={errors.cost?.message as string}
          />
          <Input
            label="Duration"
            placeholder="Duration"
            {...register('duration')}
            error={errors.duration?.message as string}
          />
          <Input
            label="Domain"
            placeholder="Domain"
            {...register('domain')}
            error={errors.domain?.message as string}
          />
          <Input
            label="Type of Formation"
            placeholder="Type Of Formation"
            {...register('typeOfFormation')}
            error={errors.typeOfFormation?.message as string}
          />
          <Input
            label="Territory"
            placeholder="Territory"
            {...register('territory')}
            error={errors.territory?.message as string}
          />
          <Input
            label="Training Site"
            placeholder="Training Site"
            {...register('trainingSite')}
            error={errors.trainingSite?.message as string}
          />
          <Input
            label="Targeted Level"
            placeholder="Targeted Level"
            {...register('targetedLevel')}
            error={errors.targetedLevel?.message as string}
          />

          <Input
            label="Title Obtained"
            placeholder="Title Obtained"
            {...register('titleObtained')}
            error={errors.titleObtained?.message as string}
          />
          <Input
            label="Financing Solution"
            placeholder="Financing Solution"
            {...register('financingSolution')}
            error={errors.financingSolution?.message as string}
          />
           <div>
            {isArray(targetedProfessions) &&
              targetedProfessions.length > 0 &&
              targetedProfessions.map((ele, index) => (
                <div key={index} className="flex w-full flex-grow items-end ">
                  <Input
                    label={`Targeted Professions ${index + 1}`}
                    placeholder="Targeted Professions"
                    value={ele}
                    className="flex-grow"
                    onChange={(e) => handletargetedProfessionsChange(index, e.target.value)}
                  />
                  {index > 0 && (
                    <Button
                      type="button"
                      onClick={() => removetargetedProfessions(index)}
                      variant="text"
                      className="p-0"
                    >
                      <CiSquareRemove className="h-12 w-12" />
                    </Button>
                  )}
                </div>
              ))}
            <Button type="button" onClick={addtargetedProfessions} className="mt-4">
              Add Targeted Professions
            </Button>
          </div>
        </FormGroup>
        <FormFooter
          isLoading={isLoading}
          submitBtnText={slug ? 'Update Formation' : 'Create Formation'}
        />
      </form>
    </div>
  );
}
