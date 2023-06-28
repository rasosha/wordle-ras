import { useAuthState } from 'react-firebase-hooks/auth';
import { IMessage } from '../../types';
import S from './Message.module.css';
import { auth } from '../../firebase';
import formatData from '../../utils/formatData';

const Message = ({ message, name, photoURL, createdAt, uid }: IMessage) => {
  const [user] = useAuthState(auth);

  return (
    <div className={`${S.message} ${uid === user?.uid ? S.outgoing : S.incoming}`}>
      <img
        src={photoURL}
        alt={name[0]}
        className={S.photo}
      />
      <div className={S.body}>
        <p className={S.name}>{name}</p>
        <div className={S.messageData}>
          <p className={S.messageText}>{message}</p>
          <p className={S.time}>{createdAt && formatData(createdAt)}</p>
        </div>
      </div>
    </div>
  );
};

export default Message;
