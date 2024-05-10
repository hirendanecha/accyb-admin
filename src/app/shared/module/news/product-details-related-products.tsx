import { Button } from '@/components/ui/button';
import FormGroup from '../../form-group';
import { Input } from 'rizzui';

export default function ProductDetailsRelatedProducts({ newsDetails }: any) {
  console.log(newsDetails, 'newsDetails');

  return (
    <div className="@container">
      <FormGroup title="" description="">
        <Input
          label="Source"
          placeholder="Source"
          value={newsDetails?.source}
          readOnly
        />
        <Input
          label="Title"
          placeholder="Title"
          value={newsDetails?.title}
          readOnly
        />
        <Input
          label="Description"
          placeholder="description"
          value={newsDetails?.description}
          readOnly
        />
        <Input
          label="Published Date"
          placeholder="Published Date"
          value={newsDetails?.publishedDate}
          readOnly
        />
        <Input
          label="Is Published"
          placeholder="Is Published"
          value={newsDetails?.isPublished}
          readOnly
        />
        <Input
          label="Rate"
          placeholder="Rate"
          value={newsDetails?.rate}
          readOnly
        />
        <Input
          label="Target Audience"
          placeholder="target Audience"
          value={newsDetails?.targetAudience}
          readOnly
        />
      </FormGroup>
    </div>
  );
}
