import { FC, ReactElement } from 'react';
import { Link } from 'react-router-dom';

export const Breadcrumbs: FC<{
  items: Array<{
    name: string;
    path: string;
  }>;
}> = ({ items }): ReactElement => {
  return (
    <div className="flex gap-x-2 text-sm">
      {items.map((item) => (
        <>
          <Link className="text-primary-700 hover:text-primary-600 hover:underline" to={item.path} key={item.path}>
            {item.name}
          </Link>
          <span className="text-grey-400">/</span>
        </>
      ))}
    </div>
  );
};
