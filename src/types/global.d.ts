// Global type declarations

interface Window {
  Calendly?: {
    initInlineWidget: (options: any) => void;
    showPopupWidget: (url: string) => void;
    closePopupWidget: () => void;
  };
}
