'use client';
import Link from 'next/link';
import { Metadata } from 'next';
import { PiPlusBold } from 'react-icons/pi';
import CreateEditProduct from '@/app/shared/module/formations/create-edit';
import PageHeader from '@/app/shared/page-header';
import { metaObject } from '@/config/site.config';
import { Button } from '@/components/ui/button';
import { routes } from '@/config/routes';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { getNewsById } from '@/redux/actions/newsActions';
import { useEffect } from 'react';
import { getFormationById } from '@/redux/actions/formationAction';

type Props = {
  params: { slug: string };
};

/**
 * for dynamic metadata
 * @link: https://nextjs.org/docs/app/api-reference/functions/generate-metadata#generatemetadata-function
 */

const pageHeader = {
  title: 'Edit Formation',
  breadcrumb: [
    {
      href: routes.news,
      name: 'Formations',
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
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
       
      </PageHeader>

      <CreateEditProduct slug={params.slug} formationDetails={formationById} />
    </>
  );
}
