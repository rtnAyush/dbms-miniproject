import Dropdown from 'react-bootstrap/Dropdown';
import LogoutBtn from '../login/LogoutBtn';
import { useSelector } from 'react-redux';

export default function AccountIcon() {
  const isLogged = useSelector(state => state.isLogged);
  const currUser = useSelector(state => state.user);
  console.log(currUser, isLogged);
  return (
    <span className="App">

      {
        isLogged ?
          <>
            <Dropdown>
              <Dropdown.Toggle variant='light' id="dropdown-basic">
                <div className="profile" ><img src={currUser?.profileImage} alt="" /></div>
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item >{<LogoutBtn />}</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </>

          :

          <></>

      }
    </span>
  );
}