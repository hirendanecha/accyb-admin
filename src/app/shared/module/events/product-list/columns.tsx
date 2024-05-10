'use client';

import Link from 'next/link';
import { HeaderCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Title, Text } from '@/components/ui/text';
import { Tooltip } from '@/components/ui/tooltip';
import { ActionIcon } from '@/components/ui/action-icon';
import { routes } from '@/config/routes';
import EyeIcon from '@/components/icons/eye';
import PencilIcon from '@/components/icons/pencil';
import AvatarCard from '@/components/ui/avatar-card';
import DeletePopover from '@/app/shared/delete-popover';
import dayjs from 'dayjs';

// get status badge
function getStatusBadge(status: string) {
  switch (status.toLowerCase()) {
    case 'pending':
      return (
        <div className="flex items-center">
          <Badge color="warning" renderAsDot />
          <Text className="ms-2 font-medium text-orange-dark">{status}</Text>
        </div>
      );
    case 'publish':
      return (
        <div className="flex items-center">
          <Badge color="success" renderAsDot />
          <Text className="ms-2 font-medium text-green-dark">{status}</Text>
        </div>
      );
    default:
      return (
        <div className="flex items-center">
          <Badge renderAsDot className="bg-gray-400" />
          <Text className="ms-2 font-medium text-gray-600">{status}</Text>
        </div>
      );
  }
}

type Columns = {
  data: any[];
  sortConfig?: any;
  handleSelectAll: any;
  checkedItems: string[];
  onDeleteItem: (id: string) => void;
  onHeaderCellClick: (value: string) => void;
  onChecked?: (id: string) => void;
};

type ProductType = {
  _id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  targetAudience: any;
  access: string;
  registerLink: string;
  speakers: string[];
};

export const getColumns = ({ onDeleteItem }: Columns) => [
  {
    title: <HeaderCell title="Title" />,
    dataIndex: 'pictureLink',
    key: 'pictureLink',
    width: 300,
    hidden: 'customer',
    render: (_: string, row: any) => (
      <AvatarCard
        src={row?.pictureLink}
        name={row?.title}
        description={row?.category}
        avatarProps={{
          name: row?.pictureLink,
          size: 'lg',
          className: 'rounded-lg',
        }}
      />
    ),
  },
  {
    title: <HeaderCell title="Start Date" />,
    key: 'startDate',
    dataIndex: 'startDate',
    width: 150,
    render: (startDate: string) => (
      <Text className="text-sm">{dayjs(startDate).format('DD/MM/YYYY')}</Text>
    ),
  },
  {
    title: <HeaderCell title="End Date" />,
    key: 'endDate',
    dataIndex: 'endDate',
    width: 150,
    render: (endDate: string) => (
      <Text className="text-sm">{dayjs(endDate).format('DD/MM/YYYY')}</Text>
    ),
  },
  {
    title: <HeaderCell title="Taregeted Audience" />,
    key: 'targetAudience',
    dataIndex: 'targetAudience',
    width: 150,
    render: (targetAudience: string) => (
      <Text className="text-sm">{targetAudience}</Text>
    ),
  },
  {
    title: <HeaderCell title="access" />,
    key: 'access',
    dataIndex: 'access',
    width: 150,
    render: (access: string) => <Text className="text-sm">{access}</Text>,
  },
  {
    title: <HeaderCell title="Actions" className="opacity-0" />,
    dataIndex: 'action',
    key: 'action',
    width: 120,
    render: (_: string, row: any) => (
      <div className="flex items-center justify-end gap-3 pe-4">
        <Tooltip
          size="sm"
          content={() => 'Edit Event'}
          placement="top"
          color="invert"
        >
          <Link href={routes.module.editEvent(row?._id)}>
            <ActionIcon size="sm" variant="outline" aria-label={'Edit Event'}>
              <PencilIcon className="h-4 w-4" />
            </ActionIcon>
          </Link>
        </Tooltip>
        <Tooltip
          size="sm"
          content={() => 'View Event'}
          placement="top"
          color="invert"
        >
          <Link href={routes.module.eventDetails(row?._id)}>
            <ActionIcon size="sm" variant="outline" aria-label={'View Event'}>
              <EyeIcon className="h-4 w-4" />
            </ActionIcon>
          </Link>
        </Tooltip>
        <DeletePopover
          title={`Delete the product`}
          description={`Are you sure you want to delete this #${row?._id} product?`}
          onDelete={() => onDeleteItem(row?._id)}
        />
      </div>
    ),
  },
];
