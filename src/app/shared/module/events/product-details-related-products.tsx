import { Button } from '@/components/ui/button';
import FormGroup from '../../form-group';
import { Input } from 'rizzui';

export default function ProductDetailsRelatedProducts({ eventsDetails }: any) {
  console.log(eventsDetails, 'eventsDetails');

  return (
    <div className="@container">
      <FormGroup title="" description="">
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
        <Input
          label="Target Audience"
          placeholder="targetAudience"
          value={eventsDetails?.targetAudience}
          readOnly
        />
      </FormGroup>
    </div>
  );
}
