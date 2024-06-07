'use client';
import { routes } from '@/config/routes';
import PageHeader from '@/app/shared/page-header';

import ProductDetailsRelatedProducts from '@/app/shared/module/caseStudies/product-details-related-products';
import { AppDispatch } from '@/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { getNewsById } from '@/redux/actions/newsActions';
import { useEffect } from 'react';
import { getCaseStudiesById } from '@/redux/actions/caseStudiesAction';
export default function ProductDetailsPage({ params }: any) {
  const pageHeader = {
    title: 'Case Studies',
    breadcrumb: [
      {
        href: routes.caseStudies,
        name: 'Case Studies',
      },
      {
        name: params.slug,
      },
    ],
  };
  const { caseStudyByID } = useSelector((state: any) => state.caseStudies);
  console.log(caseStudyByID, 'caseStudyByID');

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getCaseStudiesById(params.slug))
      .unwrap()
      .then((res) => {
        console.log(res, 'res');
      })
      .catch((err) => {
        console.log(err, 'err');
      });
  }, []);
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <ProductDetailsRelatedProducts caseStudiesDetails={caseStudyByID} />
    </>
  );
}
