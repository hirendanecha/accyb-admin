import { Button } from '@/components/ui/button';
import FormGroup from '../../form-group';
import { Input } from 'rizzui';
import Image from 'next/image';

export default function ProductDetailsRelatedProducts({ eventsDetails }: any) {
  console.log(eventsDetails, 'eventsDetails');

  return (
    <div className="flex items-center justify-center @container">
      <FormGroup title="" description="" className="w-9/12">

      

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

        <div>
          <label>Program Type</label>
          <div
            dangerouslySetInnerHTML={{ __html: eventsDetails?.programType }}  
            className="mt-2 border border-gray-300 p-4 rounded transition duration-200 hover:border-black h-52 overflow-auto"
          />
        </div>

        <div>
          <label>Description</label>
          <div
            dangerouslySetInnerHTML={{ __html: eventsDetails?.description }}
            className="mt-2 border border-gray-300 p-4 rounded transition duration-200 hover:border-black h-52 overflow-auto"
          />
        </div>
        
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
        <Input
          label="IsFeatured"
          placeholder="isFeatured"
          value={eventsDetails?.isFeatured}
          readOnly
        />
        <Input
          label="Location"
          placeholder="location"
          value={eventsDetails?.location}
          readOnly
        />



        
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

        <div className='flex flex-col gap-2'>
          <label>Event Image :</label>
          <Image
            src={eventsDetails?.pictureLink}
            alt="Event"
            style={{ borderRadius: '10px' }}
            width={500}
            height={100}
          />
        </div>

        {eventsDetails?.videolink ? (
          <div className="relative" style={{ paddingBottom: '56.25%', overflow: 'hidden',width: '100%' }}>
            <iframe
              src={`https://www.youtube.com/embed/${eventsDetails?.videolink.split('v=')[1]}`}
              // style={{width: '100%', height: '100%' }}
              title={eventsDetails?.videolink}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        ) : (
          <div className="p-4 rounded border border-gray-300 text-center">
            Video not available
          </div>
        )}
      </FormGroup>
    </div>
  );
}
