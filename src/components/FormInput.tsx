import type {
  UseFormRegister,
  FieldErrors,
  Path,
  FieldValues,
  RegisterOptions,
} from 'react-hook-form';

interface IFormInputProps<T extends FieldValues> {
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  classSpace: string;
  type: string;
  id: Path<T>;
  placeholder: string;
  rules?: RegisterOptions<T, Path<T>>;
  maxLength?: number;
  disabled?: boolean;
  changeFunc?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormInput = <T extends FieldValues>({
  register,
  errors,
  classSpace,
  type,
  id,
  placeholder,
  rules,
  maxLength,
  disabled,
  changeFunc,
}: IFormInputProps<T>) => {
  return (
    <>
      <input
        type={type}
        id={id}
        className={`${classSpace} border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition
          ${
            errors[id]
              ? 'border-red-500 ring-1 ring-red-500'
              : 'border-gray-200 focus:ring-2 focus:ring-emerald-500'
          }
          ${!disabled ? 'bg-white' : 'bg-gray-300'}`}
        placeholder={placeholder}
        {...register(id, rules)}
        maxLength={maxLength}
        disabled={disabled}
        onChange={changeFunc}
      />
      {errors[id] && (
        <p className="text-red-500 text-xs pt-1">
          {String(errors[id].message)}
        </p>
      )}
    </>
  );
};

export default FormInput;
