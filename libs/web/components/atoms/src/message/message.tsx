import { FC, ReactElement } from 'react';
import { clsx } from 'clsx';
import { match } from 'ts-pattern';
import { Icon } from '@iconify/react';
import { TMessage } from '@fms/entities';

export const Message: FC<TMessage> = (props): ReactElement => {
  const { status = 'default' } = props;

  const statusIcon = match(status)
    .with('error', () => <Icon icon="bi:exclamation-circle-fill" />)
    .with('success', () => <Icon icon="bi:check-circle-fill" />)
    .with('warning', () => <Icon icon="bi:exclamation-triangle-fill" />)
    .with('info', () => <Icon icon="bi:info-circle-fill" />)
    .with('default', () => null)
    .otherwise(() => null);

  const className = clsx(
    'text-xs flex items-start pt-1 gap-x-1 mt-[-7px]',
    {
      'text-error': status === 'error',
      'text-success': status === 'success',
      'text-grey': status === 'default',
      'text-warning': status === 'warning',
    },
    props.className
  );

  return (
    <span className={className} {...props}>
      {statusIcon}
      {props.children}
    </span>
  );
};
