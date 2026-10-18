import type { ReactNode } from 'react';
import { useId } from 'react';
import type { FieldError as TypeFieldError } from 'react-hook-form';

import { cn } from '@/shared/lib/utils';
import {
    Checkbox,
    CheckboxProps,
    Field,
    FieldContent,
    FieldDescription,
    FieldError,
    FieldLabel
} from '@/shared/components/ui';

export type CheckboxFieldProps = {
    label?: ReactNode;
    description?: ReactNode;
    error?: TypeFieldError;
} & CheckboxProps;

export function CheckboxField({
                                  label,
                                  description,
                                  error,
                                  ...props
                              }: CheckboxFieldProps) {
    const generatedId = useId();
    const id = props.id ?? generatedId;

    return (
        <Field
            orientation="horizontal"
            data-invalid={!!error}
            data-disabled={props.disabled}
            className="items-start"
        >
            <Checkbox
                {...props}
                id={id}
                aria-invalid={error ? true : props['aria-invalid']}
                className={cn('mt-0.5', props.className)}
            />
            <FieldContent>
                {label && (
                    <FieldLabel
                        htmlFor={id}
                        className="cursor-pointer group-data-[disabled=true]/field:cursor-not-allowed"
                    >
                        {label}
                    </FieldLabel>
                )}
                {!!description && !error && (
                    <FieldDescription>{description}</FieldDescription>
                )}
                {error && <FieldError errors={[error]}/>}
            </FieldContent>
        </Field>
    );
}
