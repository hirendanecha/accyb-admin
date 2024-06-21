'use client';
import { routes } from '@/config/routes';
import PageHeader from '@/app/shared/page-header';

import ProductDetailsRelatedProducts from '@/app/shared/module/securityAlerts/product-details-related-products';
import { AppDispatch } from '@/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getAlertById } from '@/redux/actions/securityAlertsAction';
export default function ProductDetailsPage({ params }: any) {
  const pageHeader = {
    title: 'Security Alerts',
    breadcrumb: [
      {
        href: routes.securityAlerts,
        name: 'Security Alerts',
      },
      {
        name: params.slug,
      },
    ],
  };
  const  securityAlerts  = useSelector((state: any) => state.securityAlerts.securityAlertByID);
  console.log(securityAlerts, 'securityAlerts');
  

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getAlertById(params.slug))
      .unwrap()
      .then((res) => {
        console.log(res, 'res');
      });
  }, []);
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <ProductDetailsRelatedProducts alertDetails={securityAlerts} />
    </>
  );
}
