import Dropdown from 'react-bootstrap/Dropdown';
import LogoutBtn from '../login/LogoutBtn';
import { useSelector } from 'react-redux';
import SignInBtn from '../login/SignInBtn';


export default function AccountIcon() {
  const isLogged = useSelector(state => state?.isLogged);
  const currUser = useSelector(state => state?.user);

  return (
    <span className="App">

      {
        isLogged ?
          <>
            <Dropdown >
              <Dropdown.Toggle variant='light' id="dropdown-basic" className='d-flex align-items-center gap-1'>
                <div className="profile" >
                  {
                    currUser?.profileImage ?
                      <img src={currUser?.profileImage} alt="" />
                      :
                      <i className="border p-2 rounded-circle fa fa-user" />
                  }
                </div>
              </Dropdown.Toggle>

              <Dropdown.Menu className='text-center'>
                <Dropdown.Item >{<LogoutBtn />}</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </>

          :
          <SignInBtn type={'icon'} />
      }
    </span>
  );
}
