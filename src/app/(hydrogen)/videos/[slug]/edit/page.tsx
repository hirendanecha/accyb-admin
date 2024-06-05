'use client';
import Link from 'next/link';
import { Metadata } from 'next';
import { PiPlusBold } from 'react-icons/pi';
import CreateEditProduct from '@/app/shared/module/videos/create-edit';
import PageHeader from '@/app/shared/page-header';
import { metaObject } from '@/config/site.config';
import { Button } from '@/components/ui/button';
import { routes } from '@/config/routes';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { getNewsById } from '@/redux/actions/newsActions';
import { useEffect } from 'react';
import { getAlertById } from '@/redux/actions/securityAlertsAction';
import { getVideoById } from '@/redux/actions/videoAction';

type Props = {
  params: { slug: string };
};

/**
 * for dynamic metadata
 * @link: https://nextjs.org/docs/app/api-reference/functions/generate-metadata#generatemetadata-function
 */

const pageHeader = {
  title: 'Edit Video',
  breadcrumb: [
    {
      href: routes.videos,
      name: 'Videos',
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
  const videoDetails = useSelector((state: any) => state.video.video);
  console.log(videoDetails, 'videoDetails');

  // const  alertDetails= useSelector((state: any) =>{
  //   console.log(state.securityAlerts.securityAlert, 'state');

  // })

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
      <PageHeader
        title={pageHeader.title}
        breadcrumb={pageHeader.breadcrumb}
      ></PageHeader>

      <CreateEditProduct slug={params.slug} videoDetails={videoDetails} />
    </>
  );
}
