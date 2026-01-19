import React, {
  createContext,
  useContext,
  useEffect,
  useCallback,
  useMemo,
} from 'react';

export interface PopupContextValue {
  isOpen: boolean;
  closePopup: () => void;
}

interface PopupProviderProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  closeOnEscape?: boolean;
}

const PopupContext = createContext<PopupContextValue | undefined>(undefined);

export const PopupProvider: React.FC<PopupProviderProps> = ({
  children,
  isOpen,
  onClose,
  closeOnEscape = true,
}) => {
  const closePopup = useCallback(onClose, [onClose]);

  // Handle escape key
  useEffect(() => {
    if (!isOpen || !closeOnEscape) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closePopup();
      }
    };

    // Add slight delay to prevent immediate closing from parent events
    const timeoutId = setTimeout(() => {
      document.addEventListener('keydown', handleKeyDown);
    }, 0);

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, closeOnEscape, closePopup]);

  // Prevent body scroll when popup is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    }
  }, [isOpen]);

  const value = useMemo<PopupContextValue>(
    () => ({
      isOpen,
      closePopup,
    }),
    [isOpen, closePopup],
  );

  return (
    <PopupContext.Provider value={value}>{children}</PopupContext.Provider>
  );
};

export const usePopupContext = () => {
  const context = useContext(PopupContext);
  if (!context) {
    throw new Error(
      'Popup subcomponents must be used within a <Popup> component',
    );
  }
  return context;
};
