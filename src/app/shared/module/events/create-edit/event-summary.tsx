import { Controller, useFormContext } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import FormGroup from '@/app/shared/form-group';
import cn from '@/utils/class-names';
import {
  categoryOption,
  typeOption,
} from '@/app/shared/module/events/create-edit/form-utils';
import dynamic from 'next/dynamic';
import SelectLoader from '@/components/loader/select-loader';
import QuillLoader from '@/components/loader/quill-loader';
import UploadZone from '@/components/ui/file-upload/upload-zone';
import { DatePicker } from '@/components/ui/datepicker';

const Select = dynamic(() => import('@/components/ui/select'), {
  ssr: false,
  loading: () => <SelectLoader />,
});
const QuillEditor = dynamic(() => import('@/components/ui/quill-editor'), {
  ssr: false,
  loading: () => <QuillLoader className="col-span-full h-[143px]" />,
});

export default function ProductSummary({ className }: { className?: string }) {
  const { getValues, setValue } = useFormContext();

  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();

  console.log(getValues, 'getValues');

  return (
    <>
      <FormGroup
        title=""
        description=""
        className={cn(className)}
      >
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
          render={({ field: { onChange, value } }) => (
            <QuillEditor
              value={value}
              onChange={onChange}
              label="Description"
              className="col-span-full [&_.ql-editor]:min-h-[100px]"
              labelClassName="font-medium text-gray-700 dark:text-gray-600 mb-1.5"
            />
          )}
        />
        <UploadZone
          className="col-span-full"
          name="eventImages"
          getValues={getValues}
          setValue={setValue}
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
      </FormGroup>
    </>
  );
}
