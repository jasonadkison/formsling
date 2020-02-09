const mapping = {
  left: 'has-text-left',
  centered: 'has-text-centered',
  right: 'has-text-right',
};

export default (alignment) => {
  return mapping[alignment] || mapping.left;
};
