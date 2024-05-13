import { Button } from '@/components/ui/button';
import FormGroup from '../../form-group';
import { Input } from 'rizzui';

export default function ProductDetailsRelatedProducts({ eventsDetails }: any) {
  console.log(eventsDetails, 'eventsDetails');

  

  return (
    <div className="@container flex justify-center items-center">
      <FormGroup title="" description="" className='w-9/12'>
        <Input
          label="Title"
          placeholder="Event title"
          value={eventsDetails?.title}
          readOnly
        />
        <Input
          label="Targeted Audience"
          placeholder="Targeted Audience"
          value={eventsDetails?.targetAudience}
          readOnly
        />
        <Input
          label="Access"
          placeholder="access"
          value={eventsDetails?.access}
          readOnly
        />
        <Input
          label="Register Link"
          placeholder="Register Link"
          value={eventsDetails?.registerLink}
          readOnly
        />
        <Input
          label="Event Type"
          placeholder="Event Type"
          value={eventsDetails?.eventType}
          readOnly
        />

        <Input
          label="Speakers"
          placeholder="Speakers"
          value={eventsDetails?.speakers}
          readOnly
        />
        <Input
          label="Start Date"
          placeholder="startDate"
          value={eventsDetails?.startDate}
          readOnly
        />
        <Input
          label="End Date"
          placeholder="endDate"
          value={eventsDetails?.endDate}
          readOnly
        />
       
        <div>
          <label>Description</label>
          <div
            dangerouslySetInnerHTML={{ __html: eventsDetails?.description }}
            style={{
              marginTop:20,
              // border:'1px solid rgb(var(--gray-300) / var(--tw-border-opacity));'
              border:'1px solid #DEDEDE',
              padding:20,
              borderRadius:'5px',
            }}
            className="hover-effect"
          />
        </div>
        {/* <textarea
          readOnly
          className="col-span-full [&_.ql-editor]:min-h-[100px]"
          placeholder="description"
          value={eventsDetails?.description}
        /> */}

        {/* <Input
        dangerouslySetInnerHTML={{__html:eventsDetails?.description}}
          label="Description"
          placeholder="description"
          value={eventsDetails?.description}
          readOnly
          className="col-span-full [&_.ql-editor]:min-h-[100px]"
          labelClassName="font-medium text-gray-700 dark:text-gray-600 mb-1.5"
        /> */}

        <img src={eventsDetails?.pictureLink} alt='Event' />
      </FormGroup>
    </div>
  );
}
