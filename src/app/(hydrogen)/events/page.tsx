'use client';
import Link from 'next/link';
import { PiPlusBold } from 'react-icons/pi';
import { routes } from '@/config/routes';
import { Button } from '@/components/ui/button';
import PageHeader from '@/app/shared/page-header';
import EventTable from '@/app/shared/module/events/product-list/table';
import { productsData } from '@/data/products-data';
import { metaObject } from '@/config/site.config';
import ExportButton from '@/app/shared/export-button';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { getAllEvents } from '@/redux/actions/eventAction';
import { CreateEventInput } from '@/utils/validators/create-event.schema';
interface IndexProps {
  slug?: string;
  className?: string;
  event?: CreateEventInput;
}

const pageHeader = {
  title: 'Event',
  breadcrumb: [
    {
      href: routes.createEvents,
      name: 'Events',
    },
    {
      name: 'List',
    },
  ],
};

export default function ProductsPage() {
  const { userEvents } = useSelector((state: any) => state.event);
  console.log(userEvents, 'userEvents');

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getAllEvents())
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
            data={userEvents}
            fileName="accyb_event_data"
            header="ID,pictureLink,description,startDate,endDate,access,speakers,targetAudience,registerLink"
          /> */}
          <Link href={routes.createEvents} className="w-full @lg:w-auto">
            <Button
              tag="span"
              className="w-full @lg:w-auto dark:bg-gray-100 dark:text-white dark:active:bg-gray-100"
            >
              <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
              Add Event
            </Button>
          </Link>
        </div>
      </PageHeader>

      <EventTable data={userEvents} />
    </>
  );
}
