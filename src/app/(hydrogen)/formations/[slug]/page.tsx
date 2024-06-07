'use client';
import { routes } from '@/config/routes';
import PageHeader from '@/app/shared/page-header';

import ProductDetailsRelatedProducts from '@/app/shared/module/formations/product-details-related-products';
import { AppDispatch } from '@/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { getNewsById } from '@/redux/actions/newsActions';
import { useEffect } from 'react';
import { getFormationById } from '@/redux/actions/formationAction';
export default function ProductDetailsPage({ params }: any) {
  const pageHeader = {
    title: 'Formations',
    breadcrumb: [
      {
        href: routes.formations,
        name: 'formations',
      },
      {
        name: params.slug,
      },
    ],
  };
  const { formationById } = useSelector((state: any) => state.formation);
  console.log(formationById, 'formationById');

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getFormationById(params.slug))
      .unwrap()
      .then((res) => {
        console.log(res, 'res');
      });
  }, []);
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <ProductDetailsRelatedProducts formationDetails={formationById} />
    </>
  );
}
