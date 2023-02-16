import { memo, useContext } from 'react';
import { AuthContext } from '../../../Auth/Auth';
import { colors } from '../../../data/colors';
import { iconsCategory } from '../../../data/icons';
import { TransactionType } from '../../../enums';
import { ITransaction } from '../../../interfaces';

interface AccountProps {
  transaction: ITransaction;
}

export const Transaction = memo(({ transaction }: AccountProps) => {
  const { userData } = useContext(AuthContext);
  const { setCurrency } = useContext(AuthContext);

  const { type, account, category, amount, description } = transaction;
  const { accounts, categories } = userData.data;
  const categoryItem = categories.find((categoryItem) => categoryItem.id === category);
  const categoryIcon = iconsCategory.find((icon) => icon.id === categoryItem?.iconID)?.name;
  const categoryColor = colors.find((color) => color.id === categoryItem?.colorID)?.color;
  const accountItem = accounts.find((accountItem) => accountItem.id === account);
  const accountIcon = accountItem?.icon;
  const accountName = accountItem?.name;

  return (
    <div>
      <div>
        <div style={{ backgroundColor: `${categoryColor}` }}>
          <span className='material-icons'>{categoryIcon}</span>
          <span className='material-icons'>{accountIcon}</span>
          <span>{accountName}</span>
          <p>{description}</p>
        </div>
        <h2>{setCurrency(type === TransactionType.Income ? amount : amount * -1)}</h2>
      </div>
    </div>
  );
});
