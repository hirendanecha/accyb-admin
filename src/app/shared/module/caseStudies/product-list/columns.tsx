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
  title: string;
  description: string;
  image: string;
  date: Date;
  publishedBy: string;
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
      title: <HeaderCell title="Case Studies" />,
      dataIndex: 'image',
      key: 'image',
      width: 300,
      hidden: 'customer',
      render: (_: string, row: any) => (
        <AvatarCard
          src={row?.image}
          name={row?.title}
          avatarProps={{
            name: row?.image[0],
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
      title: <HeaderCell title="Description" />,
      dataIndex: 'description',
      key: 'description',
      width: 150,
      render: (description: string) => {
        const DescriptionData = description
        .split("\n")
        .slice(0, 4)
        .map((line, index) => {
          if (index === 0) {
            return line.substring(0, 100) + "...";
          } else {
            return line;
          }
        })
        .join("\n");
        return(
        <div dangerouslySetInnerHTML={{ __html: DescriptionData }}></div>

        )
      },
    },
    {
      title: <HeaderCell title="Date" />,
      dataIndex: 'date',
      key: 'date',
      width: 150,
      render: (date: Date) => (
        <Text className="text-sm">{dayjs(date).format('DD/MM/YYYY')}</Text>
      ),
    },
    {
      title: <HeaderCell title="Published By" />,
      dataIndex: 'publishedBy',
      key: 'publishedBy',
      width: 150,
      render: (publishedBy: String) => (
        <Text className="text-sm">{publishedBy}</Text>
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
            content={() => 'Edit Case Studies'}
            placement="top"
            color="invert"
          >
            <Link href={routes.editCaseStudies(row?._id)}>
              <ActionIcon size="sm" variant="outline" aria-label={'Edit News'}>
                <PencilIcon className="h-4 w-4" />
              </ActionIcon>
            </Link>
          </Tooltip>
          <Tooltip
            size="sm"
            content={() => 'View Case Studies'}
            placement="top"
            color="invert"
          >
            <Link href={routes.viewCaseStudies(row?._id)}>
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
