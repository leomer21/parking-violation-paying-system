export { default as request } from "./request";

export const formatMinutesToHHmm = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  // Pad the hours and minutes with leading zeros if necessary
  const paddedHours = String(hours).padStart(2, "0");
  const paddedMinutes = String(remainingMinutes).padStart(2, "0");

  return `${paddedHours}:${paddedMinutes}`;
};

export const blobToBase64 = (blob: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};

// Utility function to convert Base64 to Blob
export const base64ToBlob = (base64: string): Blob => {
  const byteString = atob(base64.split(",")[1]);
  const mimeString = base64.split(",")[0].split(":")[1].split(";")[0];
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ab], { type: mimeString });
};

export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));
