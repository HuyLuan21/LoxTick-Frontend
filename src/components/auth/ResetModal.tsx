import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import ResetPassWord from "./ResetPassWord";

interface ResetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBack: () => void;
}

export default function ResetModal({
  isOpen,
  onClose,
  onBack,
}: ResetModalProps) {
  const handleClose = () => {
    onClose();
  };

  const handleBack = () => {
    handleClose();
    onBack();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="sm:max-w-sm">
        <ResetPassWord onBack={handleBack} />
      </DialogContent>
    </Dialog>
  );
}
