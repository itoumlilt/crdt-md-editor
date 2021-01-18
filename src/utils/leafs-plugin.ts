export const createParagraph = (options:any, text: string, mark?: string) => {
  const leaf: any = { text };
  if (mark) {
    leaf[mark] = true;
  }

  return {
    type: options.p.type,
    children: [leaf],
  };
};