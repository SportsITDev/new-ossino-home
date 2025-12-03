import Icon from "components/shared/Icon"
import documentCopyIcon from '/icons/documentCopy.svg?url'

const NoTransactionsPlaceholder = () => {
  return (
    <div className="w-full min-h-[300px] sm:min-h-[350px] md:min-h-[400px] flex flex-col justify-center items-center bg-gray-800 rounded-lg">
      <div className="flex flex-col items-center gap-4">
        <Icon href={documentCopyIcon} id='documentCopyIcon' className="h-16 w-16 opacity-70" />
        <p className="text-gray-400 text-base text-center font-normal">No transactions to show here</p>
      </div>
    </div>
  )
}

export default NoTransactionsPlaceholder