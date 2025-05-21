// Global type declarations

interface Window {
  Calendly?: {
    initInlineWidget: (options: any) => void;
    initPopupWidget: (options: any) => void;
    showPopupWidget: (url: string) => void;
    closePopupWidget: () => void;
  };
}
