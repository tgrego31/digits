type ContactPhotoData = {
  firstName: string;
  lastName: string;
  image: string;
};

const contactPhoto = ({ firstName, lastName, image }: ContactPhotoData): string => {
  const scottRobertson = firstName.trim().toLowerCase() === 'scott'
    && lastName.trim().toLowerCase() === 'robertson';
  const legacyImage = /www2\.hawaii\.edu\/~scottpr|RobertsonThumb|ScottRobertson500x500/i.test(image);

  return scottRobertson && legacyImage ? '/images/scott-robertson.png' : image;
};

export default contactPhoto;
