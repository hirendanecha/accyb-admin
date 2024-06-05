import { Button } from '@/components/ui/button';
import FormGroup from '../../form-group';
import { Input } from 'rizzui';
import dayjs from 'dayjs';

export default function ProductDetailsRelatedProducts({ alertDetails }: any) {
  console.log(alertDetails, 'newsDetails');

  return (
    <div className="flex items-center justify-center @container">
      <FormGroup title="" description="" className="w-9/12">
        <Input
          label="Title"
          placeholder="Title"
          value={alertDetails?.title}
          readOnly
        />

        <div>
          <label>Description</label>
          <div
            dangerouslySetInnerHTML={{ __html: alertDetails?.description }}
            className="mt-2 h-52 overflow-auto rounded border border-gray-300 p-4 transition duration-200 hover:border-black"
          />
        </div>

        <Input
          label="Date"
          placeholder="date"
          value={dayjs(alertDetails?.date).format('DD/MM/YYYY')}
          readOnly
        />

        <Input
          label="Heading"
          placeholder="heading"
          value={alertDetails?.Heading}
          readOnly
        />

        <div>
          <label>Document</label>
          <div className="rounded border border-gray-300 p-4 text-center">
            <img src={alertDetails?.document} alt={alertDetails?.document} />
          </div>
        </div>
      </FormGroup>
    </div>
  );
}
