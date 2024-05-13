'use client';
import Link from 'next/link';
import { Metadata } from 'next';
import { PiPlusBold } from 'react-icons/pi';
// import { productData } from '@/app/shared/ecommerce/product/create-edit/form-utils';
import CreateEditEvent from '@/app/shared/module/events/create-edit';
import PageHeader from '@/app/shared/page-header';
import { metaObject } from '@/config/site.config';
import { Button } from '@/components/ui/button';
import { routes } from '@/config/routes';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { useEffect } from 'react';
import { getEventById } from '@/redux/actions/eventAction';

type Props = {
  params: { slug: string };
};

/**
 * for dynamic metadata
 * @link: https://nextjs.org/docs/app/api-reference/functions/generate-metadata#generatemetadata-function
 */

const pageHeader = {
  title: 'Edit Event',
  breadcrumb: [
    {
      href: routes.createEvents,
      name: 'Event',
    },
    {
      name: 'Edit',
    },
  ],
};

export default function EditProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const { eventsDetails } = useSelector((state: any) => state.event);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getEventById(params.slug))
      .unwrap()
      .then((res) => {
        console.log(res, 'res');
      });
  }, []);
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <Link
          href={routes.eCommerce.createProduct}
          className="mt-4 w-full @lg:mt-0 @lg:w-auto"
        >
          <Button
            tag="span"
            className="w-full @lg:w-auto dark:bg-gray-100 dark:text-white dark:active:bg-gray-100"
          >
            <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
            Add Event
          </Button>
        </Link>
      </PageHeader>

      <CreateEditEvent slug={params.slug} eventsDetails={eventsDetails} />
    </>
  );
}
