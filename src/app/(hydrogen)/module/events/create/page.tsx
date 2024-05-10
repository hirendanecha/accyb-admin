import Link from 'next/link';
import { PiPlusBold } from 'react-icons/pi';
import CreateEditProduct from '@/app/shared/module/events/create-edit';
import { metaObject } from '@/config/site.config';
import PageHeader from '@/app/shared/page-header';
import { Button } from '@/components/ui/button';
import { routes } from '@/config/routes';

export const metadata = {
  ...metaObject('Create Product'),
};

const pageHeader = {
  title: 'Create Events',
  breadcrumb: [
    {
      href: routes.eCommerce.dashboard,
      name: 'Module',
    },
    {
      href: routes.eCommerce.products,
      name: 'Events',
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
        <Link
          href={routes.module.createEvents}
          className="mt-4 w-full @lg:mt-0 @lg:w-auto"
        ></Link>
      </PageHeader>

      <CreateEditProduct />
    </>
  );
}
