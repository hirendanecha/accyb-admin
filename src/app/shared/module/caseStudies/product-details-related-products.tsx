import { Button } from '@/components/ui/button';
import FormGroup from '../../form-group';
import { Input } from 'rizzui';
import dayjs from 'dayjs';

export default function ProductDetailsRelatedProducts({ caseStudiesDetails }: any) {
  console.log(caseStudiesDetails, 'newsDetails');

  return (
    <div className="flex items-center justify-center @container">
      <FormGroup title="" description="" className="w-9/12">
        <div>
          <label>Image</label>
          <img
            src={caseStudiesDetails?.image}
            alt="image"
            style={{
              borderRadius: '10px',
              marginTop: 5,
              width: '100%',
              height: '300px',
            }}
          />
        </div>

        <div>
          <label>Description</label>
          <div
            dangerouslySetInnerHTML={{ __html: caseStudiesDetails?.description }}
            className="mt-2 h-52 overflow-auto rounded border border-gray-300 p-4 transition duration-200 hover:border-black"
          />
        </div>

        
        <Input
          label="Title"
          placeholder="Title"
          value={caseStudiesDetails?.title}
          readOnly
        />

        <Input
          label="Date"
          placeholder="Date"
          value={dayjs(caseStudiesDetails?.date).format('DD/MM/YYYY')}
          readOnly
        />
        <Input
          label="Published By"
          placeholder="PublishedBy"
          value={caseStudiesDetails?.publishedBy}
          readOnly
        />
        
        
      </FormGroup>
    </div>
  );
}
