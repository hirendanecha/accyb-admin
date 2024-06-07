import { Button } from '@/components/ui/button';
import FormGroup from '../../form-group';
import { Input } from 'rizzui';

export default function ProductDetailsRelatedProducts({ formationDetails }: any) {
  console.log(formationDetails, 'formationDetails');

  return (
    <div className="flex items-center justify-center @container">
      <FormGroup title="" description="" className="w-9/12">
        

    
        <Input
          label="Title"
          placeholder="Title"
          value={formationDetails?.title}
          readOnly
        />
      
        <div>
          <label>Description</label>
          <div
            dangerouslySetInnerHTML={{ __html: formationDetails?.description }}
            className="mt-2 h-52 overflow-auto rounded border border-gray-300 p-4 transition duration-200 hover:border-black"
          />
        </div>

     
        <Input
          label="Heading"
          placeholder="heading"
          value={formationDetails?.heading}
          readOnly
        />
        <Input
          label="Cost"
          placeholder="cost"
          value={formationDetails?.cost}
          readOnly
        />
        <Input
          label="Duration"
          placeholder="duration"
          value={formationDetails?.duration}
          readOnly
        />
        <Input
          label="Domain"
          placeholder="domain"
          value={formationDetails?.domain}
          readOnly
        />
        <Input
          label="Type of Formation"
          placeholder="type of formation"
          value={formationDetails?.typeOfFormation}
          readOnly
        />
        <Input
          label="Territory"
          placeholder="territory"
          value={formationDetails?.territory}
          readOnly
        />
        <Input
          label="Training Site"
          placeholder="training site"
          value={formationDetails?.trainingSite}
          readOnly
        />
        <Input
          label="Targeted Level"
          placeholder="Targeted Level"
          value={formationDetails?.targetedLevel}
          readOnly
        />
        <Input
          label="Title Obtained"
          placeholder="title obtained"
          value={formationDetails?.titleObtained}
          readOnly
        />
        <Input
          label="Financing Solution"
          placeholder="financing solution"
          value={formationDetails?.financingSolution}
          readOnly
        />
        <Input
          label="Targeted Professions"
          placeholder="targeted professions"
          value={formationDetails?.targetedProfessions}
          readOnly
        />
        

        
      </FormGroup>
    </div>
  );
}
