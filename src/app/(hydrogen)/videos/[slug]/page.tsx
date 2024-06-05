'use client';
import { routes } from '@/config/routes';
import PageHeader from '@/app/shared/page-header';

import ProductDetailsRelatedProducts from '@/app/shared/module/securityAlerts/product-details-related-products';
import { AppDispatch } from '@/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getAlertById } from '@/redux/actions/securityAlertsAction';
import { getVideoById } from '@/redux/actions/videoAction';
export default function ProductDetailsPage({ params }: any) {
  const pageHeader = {
    title: 'Video Detail',
    breadcrumb: [
      {
        href: routes.videos,
        name: 'Video',
      },
      {
        name: params.slug,
      },
    ],
  };
  const  videoDetails  = useSelector((state: any) => state.video.video);
  console.log(videoDetails, 'videoDetails');
  

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getVideoById(params.slug))
      .unwrap()
      .then((res) => {
        console.log(res, 'res');
      }).catch((err) => {
        console.log(err, 'err');
      })
  }, []);
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <ProductDetailsRelatedProducts videoDetails={videoDetails} />
    </>
  );
}
