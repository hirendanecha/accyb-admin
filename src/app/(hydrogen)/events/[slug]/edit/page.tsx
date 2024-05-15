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
      href: routes.event,
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
        
      </PageHeader>

      <CreateEditEvent slug={params.slug} eventsDetails={eventsDetails} />
    </>
  );
}
