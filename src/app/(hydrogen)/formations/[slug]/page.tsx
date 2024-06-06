'use client';
import { routes } from '@/config/routes';
import PageHeader from '@/app/shared/page-header';

import ProductDetailsRelatedProducts from '@/app/shared/module/news/product-details-related-products';
import { AppDispatch } from '@/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { getNewsById } from '@/redux/actions/newsActions';
import { useEffect } from 'react';
export default function ProductDetailsPage({ params }: any) {
  const pageHeader = {
    title: 'News',
    breadcrumb: [
      {
        href: routes.news,
        name: 'News',
      },
      {
        name: params.slug,
      },
    ],
  };
  const { newsDetails } = useSelector((state: any) => state.news);
  console.log(newsDetails, 'newsDetails');

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getNewsById(params.slug))
      .unwrap()
      .then((res) => {
        console.log(res, 'res');
      });
  }, []);
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <ProductDetailsRelatedProducts newsDetails={newsDetails} />
    </>
  );
}
