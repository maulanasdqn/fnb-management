import { TSelect } from "@fms/entities";
import ReactSelect, { StylesConfig } from 'react-select';
import clsx from "clsx";
import { Icon } from '@iconify/react';
import { FC, ReactElement, useId } from "react";
import { match } from "ts-pattern";

export const InputSelect: FC<TSelect> = (props): ReactElement => {
    const statusBackgroundColor = match(props.status)
      .with('default', () => '#F9FAFB')
      .with('error', () => '#FEF1F2')
      .otherwise(() => '#F9FAFB');
  
    const statusBorderColor = match(props.status)
      .with('error', () => '#FCA5A5')
      .otherwise(() => '#D1D5DA');
  
    const statusTextColor = match(props.status)
      .with('error', () => '#FCA5A5')
      .otherwise(() => '#6A7280');
  
    const statusDropdownIconColor = clsx('mr-2', {
      'text-error': props.status === 'error',
      'text-grey-400': props.status === 'none' || !props.status,
    });
  
    const id = useId();
  
    const colourStyles: StylesConfig<Record<string, unknown>> = {
      option: (styles, { isDisabled, isFocused, isSelected }) => {
        return {
          ...styles,
          border: 0,
          fontSize: '12px',
          transition: 'all 0.25s',
          cursor: isFocused ? 'pointer' : '',
          padding: '6px 12px',
          backgroundColor: isDisabled
            ? '#F3F4F6'
            : isSelected
            ? '#92afd6'
            : statusBackgroundColor,
          color: isSelected ? 'white' : statusTextColor,
          ':hover': {
            ...styles[':hover'],
            borderColor: statusBorderColor,
            backgroundColor: '#92afd6',
            color: 'white',
          },
        };
      },
      container: (styles) => ({
        ...styles,
        border: 0,
        borderRadius: '8px',
        backgroundColor: statusBackgroundColor,
        cursor: 'pointer',
      }),
      indicatorSeparator: (styles, { isDisabled }) => ({
        ...styles,
        backgroundColor: isDisabled ? '#F3F4F6' : statusBackgroundColor,
        color: statusTextColor,
      }),
      control: (styles, { isDisabled }) => ({
        ...styles,
        borderRadius: '8px',
        backgroundColor: isDisabled ? '#F3F4F6' : statusBackgroundColor,
        borderColor: isDisabled ? '#E4E7EB' : statusBorderColor,
        boxShadow: 'none',
        ':hover': {
          ...styles[':hover'],
          borderColor: statusBorderColor,
          backgroundColor: isDisabled ? '#F3F4F6' : statusBackgroundColor,
          color: 'white',
        },
        ':active': {
          ...styles[':active'],
          borderColor: statusBackgroundColor,
          backgroundColor: isDisabled ? '#F3F4F6' : statusBackgroundColor,
          color: 'white',
        },
        ':focus': {
          ...styles[':focus'],
          borderColor: statusBackgroundColor,
          backgroundColor: isDisabled ? '#F3F4F6' : statusBackgroundColor,
          color: 'white',
        },
      }),
      valueContainer: (styles) => ({
        ...styles,
        border: 0,
        borderRadius: '8px',
        fontSize: '12px',
        backgroundColor: statusBackgroundColor,
        cursor: 'pointer',
      }),
      placeholder: (styles, { isDisabled }) => ({
        ...styles,
        color: isDisabled ? '#D1D5DA' : statusTextColor,
        backgroundColor: statusBackgroundColor,
        fontSize: '12px',
      }),
      multiValue: (styles) => ({
        ...styles,
        borderRadius: '6px',
        fontSize: '14px',
      }),
      noOptionsMessage: (styles) => ({
        ...styles,
        fontSize: '14px',
      }),
      singleValue: (styles) => ({
        ...styles,
        fontSize: '14px',
        border: 0,
        backgroundColor: statusBackgroundColor,
        color: statusTextColor,
      }),
    };
    return (
      <ReactSelect
        {...props}
        id={id}
        onChange={(val: any) =>
          props.onChange?.(
            props?.isMulti
              ? val?.map(
                  (x: {
                    value: string | number | boolean | undefined | unknown;
                  }) => x.value
                )
              : val.value
          )
        }
        components={{
          IndicatorSeparator: () => null,
          DropdownIndicator: () => (
            <Icon icon="iconamoon:arrow-down-2-light" width={20} className={statusDropdownIconColor} />
            // <IoChevronDown className={statusDropdownIconColor} size={20} />
          ),
        }}
        styles={colourStyles}
        value={props?.options?.find((option) => option?.value === props.value)}
        isDisabled={props?.disabled}
      />
    );
  };