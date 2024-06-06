import Link from 'next/link';
import { PiPlusBold } from 'react-icons/pi';
import CreateEditProduct from '@/app/shared/module/news/create-edit';
import { metaObject } from '@/config/site.config';
import PageHeader from '@/app/shared/page-header';
import { Button } from '@/components/ui/button';
import { routes } from '@/config/routes';

export const metadata = {
  ...metaObject('Create Product'),
};

const pageHeader = {
  title: 'Create News',
  breadcrumb: [
    {
      href: routes.news,
      name: 'News',
    },
    {
      name: 'Create',
    },
  ],
};

export default function CreateProductPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
       
      </PageHeader>

      <CreateEditProduct />
    </>
  );
}
