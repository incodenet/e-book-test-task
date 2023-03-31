import { memo } from 'react';
import { ICustomer } from '../../interfaces';
import Image from 'next/image';
import Jdenticon from 'react-jdenticon';

type TCustomerRowProps = {
  entity: ICustomer;
  disableDelete: boolean;
  handleEdit: () => void;
  handleDelete: () => void;
};

const CustomerRow = ({ entity, disableDelete, handleEdit, handleDelete }: TCustomerRowProps) => {
  return (
    <tr key={entity.id}>
      <td>
        <div className="flex gap-2 items-center">
          <div className="w-[32px] h-[32px] p-1 bg-blue60 rounded-lg">
            <Jdenticon size="24" value={entity.email || entity.firstName} />
          </div>
          <div className="font-medium text-primColor">
            {entity.firstName} {entity.lastName}
          </div>
        </div>
      </td>
      <td>{entity.company}</td>
      <td>{entity.email}</td>
      <td>
        <div
          className={`w-[49px] h-[24px] rounded relative top-[-2px] ${
            entity.status === 'User' ? 'bg-grey60' : 'bg-blue'
          }`}
        ></div>
      </td>
      <td>
        <div className="flex gap-4">
          <button className="cursor-pointer" onClick={handleEdit}>
            <Image src="/icon-edit.svg" alt="Edit" width={24} height={24} />
          </button>
          <button
            className="cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={disableDelete}
            onClick={handleDelete}
          >
            <Image src="/icon-trash.svg" alt="Delete" width={24} height={24} />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default memo(CustomerRow);
