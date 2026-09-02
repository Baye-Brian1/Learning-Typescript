export function getElement<T extends HTMLElement>(selector: string): T | null {
  return document.querySelector<T>(selector);
}
