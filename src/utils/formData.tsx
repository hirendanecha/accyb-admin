function buildFormData(formData: any, data: any) {
  if (
    data &&
    typeof data === 'object' &&
    !(data instanceof Date) &&
    !(data instanceof File)
  ) {
    Object.keys(data).forEach((key: any) => {
      buildFormData(formData, data[key], key);
    });
  } else {
    const value = data == null ? '' : data;

    formData.append(key, value);
  }
}

export function jsonToFormData(data: any) {
  const formData = new FormData();

  buildFormData(formData, data);

  return formData;
}
