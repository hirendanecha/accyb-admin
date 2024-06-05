import { Button } from '@/components/ui/button';
import FormGroup from '../../form-group';
import { Input } from 'rizzui';
import dayjs from 'dayjs';

export default function ProductDetailsRelatedProducts({ videoDetails }: any) {
  console.log(videoDetails, 'videoDetails');

  return (
    <div className="flex items-center justify-center @container">
      <FormGroup title="" description="" className="w-9/12">
      <Input
          label="Name"
          placeholder="name"
          value={videoDetails?.name}
          readOnly
        />

        <Input
          label="Link"
          placeholder="link"
          value={videoDetails?.link}
          readOnly
        />

        <div>
          <label>Thumbnail</label>
          <div className="rounded border border-gray-300 p-4 text-center">
            <img src={videoDetails?.thumbnail} alt={videoDetails?.thumbnail} />
          </div>
        </div>
      </FormGroup>
    </div>
  );
}
