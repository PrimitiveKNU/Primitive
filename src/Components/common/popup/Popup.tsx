import React, { useCallback, useState } from 'react';
import { createPortal } from 'react-dom';
import { PopupProvider } from './PopupContext';

export interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  closeOnBackdropClick?: boolean;
  closeOnEscape?: boolean;
  className?: string;
}

interface PopupTitleProps {
  children: React.ReactNode;
  className?: string;
}

interface PopupSubtitleProps {
  children: React.ReactNode;
  className?: string;
}

interface PopupImageProps {
  children: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

interface PopupButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'neutral';
  color?: string;
  className?: string;
  disabled?: boolean;
}

interface PopupContentProps {
  children: React.ReactNode;
  className?: string;
}

// Popup Title Component
const Title: React.FC<PopupTitleProps> = ({ children, className = '' }) => {
  return (
    <h2
      id='popup-title'
      className={`text-2xl font-bold text-foreground text-center mb-2 ${className}`}
    >
      {children}
    </h2>
  );
};

// Popup Subtitle Component
const Subtitle: React.FC<PopupSubtitleProps> = ({
  children,
  className = '',
}) => {
  return (
    <p
      className={`text-sm text-muted-foreground text-center mb-2 ${className}`}
    >
      {children}
    </p>
  );
};

// Popup Image Component
const Image: React.FC<PopupImageProps> = ({
  children,
  className = '',
  size = 'xl',
}) => {
  const sizeClasses: Record<'sm' | 'md' | 'lg' | 'xl', string> = {
    sm: 'text-3xl',
    md: 'text-4xl',
    lg: 'text-5xl',
    xl: 'text-7xl',
  };

  return (
    <div
      className={`flex justify-center items-center my-4 ${sizeClasses[size]} ${className}`}
    >
      {children}
    </div>
  );
};

// Popup Button Component
const Button: React.FC<PopupButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  color,
  className = '',
  disabled = false,
}) => {
  const variantClasses: Record<
    'primary' | 'secondary' | 'success' | 'danger' | 'neutral',
    string
  > = {
    primary:
      'bg-primary hover:bg-primary-600 text-primary-foreground active:bg-primary-700',
    secondary:
      'bg-secondary hover:bg-secondary-600 text-secondary-foreground active:bg-secondary-700',
    success:
      'bg-accent hover:bg-accent-600 text-accent-foreground active:bg-accent-700',
    danger:
      'bg-destructive hover:bg-destructive/90 text-destructive-foreground active:bg-destructive/80',
    neutral:
      'bg-gray-300 hover:bg-gray-400 text-gray-800 active:bg-gray-500',
  };

  const baseClasses =
    'px-6 py-3 rounded-lg font-semibold transition-all duration-200 w-full disabled:opacity-50 disabled:cursor-not-allowed';

  let buttonClasses = baseClasses;

  if (color) {
    buttonClasses = `${baseClasses} bg-${color} hover:bg-${color}/90 text-white`;
  } else {
    buttonClasses = `${baseClasses} ${variantClasses[variant]}`;
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${buttonClasses} ${className}`}
    >
      {children}
    </button>
  );
};

// Popup Content Component
const Content: React.FC<PopupContentProps> = ({ children, className = '' }) => {
  return <div className={`mb-4 ${className}`}>{children}</div>;
};

// Main Popup Wrapper Component
const PopupWrapper: React.FC<PopupProps> & {
  Title: typeof Title;
  Subtitle: typeof Subtitle;
  Image: typeof Image;
  Button: typeof Button;
  Content: typeof Content;
} = ({
  isOpen,
  onClose,
  children,
  closeOnBackdropClick = true,
  closeOnEscape = true,
  className = '',
}) => {
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = useCallback(() => {
    setIsClosing(true);
    // Wait for animation to complete
    const timeoutId = setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [onClose]);

  const handleBackdropClick = useCallback(() => {
    if (closeOnBackdropClick) {
      handleClose();
    }
  }, [closeOnBackdropClick, handleClose]);

  if (!isOpen && !isClosing) return null;

  const popupContent = (
    <PopupProvider
      isOpen={isOpen}
      onClose={handleClose}
      closeOnEscape={closeOnEscape}
    >
      <div
        className='fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4 backdrop-blur-sm'
        role='presentation'
        aria-hidden='true'
        onClick={handleBackdropClick}
      >
        <div
          className={`bg-card rounded-2xl shadow-2xl p-8 w-full max-w-md ${
            isClosing ? 'animate-fade-out' : 'animate-fade-in'
          } ${className}`}
          role='dialog'
          aria-modal='true'
          aria-labelledby='popup-title'
          onClick={(e) => e.stopPropagation()}
        >
          <div className='flex flex-col gap-3'>{children}</div>
        </div>
      </div>
    </PopupProvider>
  );

  return createPortal(popupContent, document.body);
};

// Attach subcomponents
PopupWrapper.Title = Title;
PopupWrapper.Subtitle = Subtitle;
PopupWrapper.Image = Image;
PopupWrapper.Button = Button;
PopupWrapper.Content = Content;

export const Popup = PopupWrapper;

export type {
  PopupButtonProps,
  PopupContentProps,
  PopupImageProps,
  PopupSubtitleProps,
  PopupTitleProps,
};
