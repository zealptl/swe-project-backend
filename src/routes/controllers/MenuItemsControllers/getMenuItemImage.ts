export const getMenuItemImage = async (req: any, res: any, gfs: any) => {
  const image = gfs.files.findOne({ filename: req.params.filename });

  if (!image) {
    return res.status(404).json({ msg: 'Image not found' });
  }

  res.json({ image });
};
