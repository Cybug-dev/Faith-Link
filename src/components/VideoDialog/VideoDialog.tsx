import { X } from 'lucide-react';
import { useEffect, useRef } from 'react';
import heroImage from '../../assets/images/hero-worship.jpg';
import './VideoDialog.scss';

type VideoDialogProps = { open: boolean; onClose: () => void };

export function VideoDialog({ open, onClose }: VideoDialogProps) {
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
        <img src={heroImage} alt="A worship gathering" />
        <div><span>FaithLink</span><h2>Learn. Play. Grow. Together.</h2><p>Our full story is coming soon.</p></div>
      </div>
    </dialog>
  );
}
