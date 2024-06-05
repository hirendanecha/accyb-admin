'use client';
import Link from 'next/link';
import { PiPlusBold } from 'react-icons/pi';
import { routes } from '@/config/routes';
import { Button } from '@/components/ui/button';
import PageHeader from '@/app/shared/page-header';
import ProductsTable from '@/app/shared/module/videos/product-list/table';
import { productsData } from '@/data/products-data';
import { metaObject } from '@/config/site.config';
import ExportButton from '@/app/shared/export-button';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { AppDispatch } from '@/redux/store';
import { getAllSecurityAlert } from '@/redux/actions/securityAlertsAction';
import { getAllVideos } from '@/redux/actions/videoAction';

const pageHeader = {
  title: 'Videos',
  breadcrumb: [
    {
      href: routes.videos,
      name: 'Videos',
    },
    {
      name: 'List',
    },
  ],
};

export default function ProductsPage() {
  //   const {securityAlerts} = useSelector((state: any) => state.securityAlerts);
  const videoData = useSelector((state: any) => state.video.videos);
  console.log(videoData, 'VideodATA');

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getAllVideos())
      .then((res) => {
        console.log('res', res);
      })
      .catch((err) => {
        console.log('err', err);
      });
  }, []);
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <Link href={routes.createVideos} className="w-full @lg:w-auto">
            <Button
              tag="span"
              className="w-full @lg:w-auto dark:bg-gray-100 dark:text-white dark:active:bg-gray-100"
            >
              <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
              Add Video
            </Button>
          </Link>
        </div>
      </PageHeader>

      <ProductsTable data={videoData} />
    </>
  );
}
