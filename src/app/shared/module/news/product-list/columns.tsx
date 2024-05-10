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
import { PiStarFill } from 'react-icons/pi';

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
  source: string;
  title: string;
  description: string;
  publishedDate: string;
  isPublished: boolean;
  rate: number;
  targetAudience: string;
};

export const getColumns = ({
  data,
  sortConfig,
  checkedItems,
  onDeleteItem,
  onHeaderCellClick,
  handleSelectAll,
  onChecked,
}: Columns) => [
    // {
    //   title: (
    //     <div className="ps-3.5">
    //       <Checkbox
    //         title={'Select All'}
    //         onChange={handleSelectAll}
    //         checked={checkedItems.length === data?.length}
    //         className="cursor-pointer"
    //       />
    //     </div>
    //   ),
    //   dataIndex: 'checked',
    //   key: 'checked',
    //   width: 30,
    //   render: (_: any, row: any) => (
    //     <div className="inline-flex ps-3.5">
    //       <Checkbox
    //         className="cursor-pointer"
    //         checked={checkedItems.includes(row.id)}
    //         {...(onChecked && { onChange: () => onChecked(row.id) })}
    //       />
    //     </div>
    //   ),
    // },
    {
      title: <HeaderCell title="News" />,
      dataIndex: 'attachment',
      key: 'attachment',
      width: 300,
      hidden: 'customer',
      render: (_: string, row: any) => (
        <AvatarCard
          src={row?.attachment[0]}
          name={row?.title}
          avatarProps={{
            name: row?.attachment[0],
            size: 'lg',
            className: 'rounded-lg',
          }}
        />
      ),
    },
    {
      title: <HeaderCell title="Title" />,
      dataIndex: 'title',
      key: 'title',
      width: 150,
      render: (title: string) => <Text className="text-sm">{title}</Text>,
    },
    {
      title: <HeaderCell title="Published Date" />,
      dataIndex: 'publishedDate',
      key: 'publishedDate',
      width: 150,
      render: (publishedDate: string) => (
        <Text className="text-sm">{dayjs(publishedDate).format('DD/MM/YYYY')}</Text>
      ),
    },
    {
      title: <HeaderCell title="Is Published" />,
      dataIndex: 'isPublished',
      key: 'isPublished',
      width: 150,
      render: (isPublished: string) => (
        <Text className="text-sm">{isPublished ? 'Yes' : 'No'}</Text>
      ),
    },
    {
      title: (
        <HeaderCell
          title="Rating"
          sortable
          ascending={
            sortConfig?.direction === 'asc' && sortConfig?.key === 'rate'
          }
        />
      ),
      dataIndex: 'rate',
      key: 'rate',
      width: 120,
      render: (rate: any) => (
        <div className="inline-flex items-center rounded-full border border-gray-300 px-2.5 py-1">
          <span className="me-1 shrink-0">{rate}</span>
          <PiStarFill className="-mt-px w-4 fill-orange text-orange" />
        </div>
      ),
    },
    {
      // Need to avoid this issue -> <td> elements in a large <table> do not have table headers.
      title: <HeaderCell title="Actions" className="opacity-0" />,
      dataIndex: 'action',
      key: 'action',
      width: 120,
      render: (_: string, row: any) => (
        <div className="flex items-center justify-end gap-3 pe-4">
          <Tooltip
            size="sm"
            content={() => 'Edit News'}
            placement="top"
            color="invert"
          >
            <Link href={routes.module.editNews(row?._id)}>
              <ActionIcon size="sm" variant="outline" aria-label={'Edit News'}>
                <PencilIcon className="h-4 w-4" />
              </ActionIcon>
            </Link>
          </Tooltip>
          <Tooltip
            size="sm"
            content={() => 'View News'}
            placement="top"
            color="invert"
          >
            <Link href={routes.module.viewNews(row?._id)}>
              <ActionIcon size="sm" variant="outline" aria-label={'View News'}>
                <EyeIcon className="h-4 w-4" />
              </ActionIcon>
            </Link>
          </Tooltip>
          <DeletePopover
            title={`Delete the product`}
            description={`Are you sure you want to delete this #${row?._id} product?`}
            onDelete={() => onDeleteItem(row._id)}
          />
        </div>
      ),
    },
  ];
