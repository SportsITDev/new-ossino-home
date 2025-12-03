import SheetHeading from 'components/shared/SheetHeading';
import { Sheet, SheetContent } from 'components/shared/ui/Sheet';
import { BREAKPOINTS, useBreakpoint, useDialog } from 'helpers/hooks';
import { selectDialogById } from 'store/dialog/selectors';
import { DIALOG_TYPE } from 'store/dialog/slice';
import { useAppSelector } from 'store/index';
import NotificationMarkdown from '../NotificationMarkdown';

const NotificationDetailsSheet = () => {
  const { open, data } = useAppSelector(
    selectDialogById(DIALOG_TYPE.notificationDetails),
  );
  const { closeDialog, openDialog } = useDialog();
  const { screenWidth } = useBreakpoint();

  const handleOpenChange = (open: boolean) => {
    if (open) {
      openDialog(DIALOG_TYPE.notificationDetails);
    } else {
      closeDialog(DIALOG_TYPE.notificationDetails);
    }
  };

  if (screenWidth < BREAKPOINTS.xl) return null;

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetContent
        className="flex flex-col border-l border-gray-700 max-w-[400px] z-[620] xl:pb-10"
        overlayClassName="z-[610] bg-transparent"
      >
        <SheetHeading title="Notification Details" />
        <NotificationMarkdown>{data?.details ?? ''}</NotificationMarkdown>
      </SheetContent>
    </Sheet>
  );
};

export default NotificationDetailsSheet;
