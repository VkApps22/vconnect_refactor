export default ({ response }) => ({
  images: {
    hasImages: response.length > 0,
    files: response.map((i) => ({
      ...i,
      src: i.image,
      type: 'image/png',
    })),
    mainImage: response.find((i) => i.thumbnail)?._id,
  },
});
