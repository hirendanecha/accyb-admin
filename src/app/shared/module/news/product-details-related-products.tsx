import { Button } from '@/components/ui/button';
import FormGroup from '../../form-group';
import { Input } from 'rizzui';

export default function ProductDetailsRelatedProducts({ newsDetails }: any) {
  console.log(newsDetails, 'newsDetails');

  return (
    <div className="flex items-center justify-center @container">
      <FormGroup title="" description="" className="w-9/12">
        <div>
          <label>Image</label>
          <img
            src={newsDetails?.attachment}
            alt="attachment"
            style={{ borderRadius: '10px', marginTop: 5 }}
          />
        </div>

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
        {/* <Input
          label="Description"
          placeholder="description"
          value={newsDetails?.description}
          readOnly
        /> */}

        <div>
          <label>Description</label>
          <div
            dangerouslySetInnerHTML={{ __html: newsDetails?.description }}
            className="mt-2 h-52 overflow-auto rounded border border-gray-300 p-4 transition duration-200 hover:border-black"
          />
        </div>

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

        {newsDetails?.videoLink ? (
          <div
            className="relative"
            style={{
              paddingBottom: '56.25%',
              overflow: 'hidden',
              width: '100%',
            }}
          >
            <iframe
              src={`https://www.youtube.com/embed/${newsDetails?.videoLink.split(
                'v='
              )[1]}`}
              // style={{width: '100%', height: '100%' }}
              title={newsDetails.videoLink}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        ) : (
          <div className="rounded border border-gray-300 p-4 text-center">
            Video not available
          </div>
        )}
      </FormGroup>
    </div>
  );
}
