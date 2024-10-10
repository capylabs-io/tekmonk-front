import { Input } from "@/components/common/Input";
import { TextArea } from "@/components/common/TextArea";

type Props = {
  title: string;
  value?: string;
  type: "text" | "text-area";
  customInputClassNames?: string;
  customClassNames?: string;
  error?: string;
  placeholder?: string;
  name?: string;
  isSearch?: boolean;
  onChange?: (value: string) => void;
  onBlur?: () => void;
};

export default function InputField({
  title,
  value,
  error,
  type = "text",
  onChange,
  placeholder,
  onBlur,
  name = "",
  isSearch = false,
  customInputClassNames,
  customClassNames,
}: Props) {
  return (
    <div className={`flex flex-wrap items-center ${customClassNames}`}>
      <label htmlFor="name" className="text-SubheadSm text-primary-950 w-1/4">
        {title}
      </label>
      {type === "text-area" ? (
        <TextArea
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          customInputClassName={`w-full ${customInputClassNames}`}
        />
      ) : (
        <Input
          value={value}
          type={type}
          onChange={onChange}
          placeholder={placeholder}
          onBlur={onBlur}
          name={name}
          isSearch={isSearch}
          customInputClassNames={`${customInputClassNames}`}
          customClassNames={`h-10 flex items-center text-bodyXs ${customInputClassNames}`}
        />
      )}
    </div>
  );
}
