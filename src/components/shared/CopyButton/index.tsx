import { cn } from "helpers/ui";
import Icon from "../Icon";
import copyIcon from '/icons/copy.svg?url';

type CopyButtonProps = {
  valueToCopy: string;
  isAbsolute?: boolean;
}

const CopyButton = ({ valueToCopy, isAbsolute = false }: CopyButtonProps) => {

  const onCopy = () => {
    navigator.clipboard.writeText(valueToCopy);
  };

  return (
    <div onClick={onCopy} className={cn("cursor-pointer", { "absolute right-3 top-1/3": isAbsolute })}>
      <Icon
        id="copyIcon"
        href={copyIcon}
        className="w-4 h-4 text-gray-500 hover:text-gray-700"
      />
    </div>
  )
}

export default CopyButton