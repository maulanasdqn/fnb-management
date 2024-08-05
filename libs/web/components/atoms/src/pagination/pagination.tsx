import { TMetaResponse } from '@fms/entities';
import { Icon } from '@iconify/react';
import { clsx } from 'clsx';
import { FC, ReactElement, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const Num = (props: {
  value: number;
  isActive?: boolean;
  onClick?: () => void;
}) => {
  const className = clsx(
    'rounded-lg cursor-pointer p-2 w-8 flex items-center justify-center text-sm',
    {
      'bg-primary hover:bg-primary text-white': props.isActive,
      'bg-white hover:bg-primary border border-primary text-primary':
        !props.isActive,
    }
  );
  return (
    <div onClick={props.onClick} className={className}>
      {props.value}
    </div>
  );
};

export const Pagination: FC<{ meta: TMetaResponse }> = (
  props
): ReactElement => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(searchParams.get('page') || 1);
  const [perPage, setPerPage] = useState(searchParams.get('perPage') || 5);
  const maxButtons = 5;
  const totalPage = Number(props?.meta?.totalPage);

  useEffect(() => {
    setSearchParams({
      search: String(searchParams.get('search')),
      page: page.toString(),
      perPage: perPage.toString(),
    });
  }, [page, perPage]);

  return (
    <div className="flex items-center p-2 justify-between gap-x-4 bg-white select-none">
      <select
        value={perPage}
        onChange={(e) => setPerPage(Number(e.target.value))}
        className="w-fit p-2 border-grey-100 border text-grey-400 text-sm focus:outline-none focus:ring-0 focus-visible:ring-0 bg-white placeholder-grey-400 rounded-lg"
      >
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="15">15</option>
        <option value="20">20</option>
      </select>
      <div className="w-fit flex items-center gap-x-2">
        <Icon
          icon="mdi:chevron-left"
          className="h-fit w-fit bg-grey-50 p-1 rounded-lg cursor-pointer text-primary text-xl"
        />
        {Array.from({ length: Math.min(maxButtons, totalPage) }, (_, i) => (
          <div className="flex items-center gap-2" key={i}>
            <Num
              isActive={i + 1 === Number(page)}
              onClick={() => setPage(i + 1)}
              value={i + 1}
            />
          </div>
        ))}
        <Icon
          icon="mdi:chevron-right"
          className="h-fit w-fit bg-grey-50 p-1 rounded-lg cursor-pointer text-primary text-xl"
        />
      </div>
    </div>
  );
};
