'use client';
import Link from 'next/link';
import { PiPlusBold } from 'react-icons/pi';
import { routes } from '@/config/routes';
import { Button } from '@/components/ui/button';
import PageHeader from '@/app/shared/page-header';
import ProductsTable from '@/app/shared/module/formations/product-list/table';
import { productsData } from '@/data/products-data';
import { metaObject } from '@/config/site.config';
import ExportButton from '@/app/shared/export-button';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getAllNews } from '@/redux/actions/newsActions';
import { AppDispatch } from '@/redux/store';
import { getAllCaseStudies } from '@/redux/actions/caseStudiesAction';
import { getAllFormations } from '@/redux/actions/formationAction';

const pageHeader = {
  title: 'Formations',
  breadcrumb: [
    {
      href: routes.event,
      name: 'Formations',
    },
    {
      name: 'List',
    },
  ],
};

export default function ProductsPage() {
  const { formations } = useSelector((state: any) => state.formation);
  console.log(formations, 'formations');

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getAllFormations())
      .unwrap()
      .then((res) => {
        console.log('res', res);
      });
  }, []);
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          {/* <ExportButton
            data={productsData}
            fileName="product_data"
            header="ID,Name,Category,Product Thumbnail,SKU,Stock,Price,Status,Rating"
          /> */}
          <Link href={routes.createNews} className="w-full @lg:w-auto">
            <Button
              tag="span"
              className="w-full @lg:w-auto dark:bg-gray-100 dark:text-white dark:active:bg-gray-100"
            >
              <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
              Add Case Studies
            </Button>
          </Link>
        </div>
      </PageHeader>

      <ProductsTable data={formations} />
    </>
  );
}
