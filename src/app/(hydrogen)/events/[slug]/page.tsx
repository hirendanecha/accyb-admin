'use client';
import { routes } from '@/config/routes';
import PageHeader from '@/app/shared/page-header';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { getEventById } from '@/redux/actions/eventAction';
import ProductDetailsRelatedProducts from '@/app/shared/module/events/product-details-related-products';

export default function ProductDetailsPage({ params }: any) {
  const { eventsDetails } = useSelector((state: any) => state.event);
  const pageHeader = {
    title: 'View Event',
    breadcrumb: [
      {
        href: routes.event,
        name: 'Event',
      },
      {
        name: params.slug,
      },
    ],
  };
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getEventById(params.slug))
      .unwrap()
      .then((res) => {
        console.log(res, 'res');
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <ProductDetailsRelatedProducts eventsDetails={eventsDetails} />
    </>
  );
}
