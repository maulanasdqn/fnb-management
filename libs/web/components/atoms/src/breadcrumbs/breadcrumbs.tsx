import { FC, ReactElement } from 'react';
import { Link } from 'react-router-dom';

export const Breadcrumbs: FC<{
  items: Array<{
    name: string;
    path: string;
  }>;
}> = ({ items }): ReactElement => {
  return (
    <div className="flex gap-x-2">
      {items.map((item) => (
        <Link className="text-grey" to={item.path} key={item.path}>
          {item.name}
        </Link>
      ))}
    </div>
  );
};
