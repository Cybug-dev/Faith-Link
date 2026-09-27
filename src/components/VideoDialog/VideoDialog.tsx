import { X } from 'lucide-react';
import { useEffect, useRef } from 'react';
import heroImage from '../../assets/images/hero-worship.jpg';
import './VideoDialog.scss';

type VideoDialogProps = { open: boolean; onClose: () => void };

type VideoDialogContentProps = VideoDialogProps & {
  image?: string;
  imageAlt?: string;
  eyebrow?: string;
  title?: string;
  message?: string;
};

export function VideoDialog({
  open,
  onClose,
  image = heroImage,
  imageAlt = 'A worship gathering',
  eyebrow = 'FaithLink',
  title = 'Learn. Play. Grow. Together.',
  message = 'Our full story is coming soon.',
}: VideoDialogContentProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog className="video-dialog" onCancel={onClose} onClose={onClose} ref={dialogRef}>
      <button className="video-dialog__close" type="button" onClick={onClose} aria-label="Close video"><X aria-hidden="true" /></button>
      <div className="video-dialog__visual">
        <img src={image} alt={imageAlt} />
        <div><span>{eyebrow}</span><h2>{title}</h2><p>{message}</p></div>
      </div>
    </dialog>
  );
}
