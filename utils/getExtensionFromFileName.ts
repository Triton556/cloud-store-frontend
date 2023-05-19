export const getExtensionFromFileName = (filename: string) => {
  return filename.split('.').pop();
};
