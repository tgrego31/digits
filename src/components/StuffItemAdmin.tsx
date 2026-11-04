import { Stuff } from '@prisma/client';


const StuffItemAdmin = ({ name, quantity, condition, owner, id }: Stuff) => (
  <tr>
    <td>{name}</td>
    <td>{quantity}</td>
    <td>{condition}</td>
    <td>{owner}</td>
    <td>
      <a href={`/edit/${id}`}>Edit</a>
    </td>
  </tr>
);

export default StuffItemAdmin;
