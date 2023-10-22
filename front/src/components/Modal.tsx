import { Dialog } from '@headlessui/react';
import { AnimatePresence, motion } from 'framer-motion';
import { Box } from '@/components//Box';

interface ModalProps {
  isOpen: boolean;
  children: React.ReactNode;
  title?: string;
  onClose: () => void;
}

export const Modal = ({ isOpen, title, children, onClose }: ModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog open={true} onClose={onClose} className="relative z-50">
          <motion.div animate={{ opacity: 1 }} initial={{ opacity: 0 }} exit={{ opacity: 0 }}>
            <div className="fixed inset-0 bg-dark-100/50" aria-hidden="true" />
            <Box className="fixed top-[50%] p-8 left-[50%] w-[30vw] min-w-[300px] max-w-[600px] translate-y-[-50%] translate-x-[-50%]">
              <Dialog.Panel>
                <Dialog.Title className="text-lg text-white font-semibold">{title}</Dialog.Title>
                <div className="mt-6 z-[60]">{children}</div>
              </Dialog.Panel>
            </Box>
          </motion.div>
        </Dialog>
      )}
    </AnimatePresence>
  );
};
