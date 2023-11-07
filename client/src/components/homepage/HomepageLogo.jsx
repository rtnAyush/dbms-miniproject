import { useSelector } from 'react-redux';

const HomepageLogo = () => {
    const currUser = useSelector(state => state?.user);

    return (
        <div className='container2'>
            <div >
                {currUser && <h2 className='mt-2 text-center'>Hello, {currUser?.name}</h2>}
                <img style={{ width: "100%", height: "380px" }} src="/assets/Mess Buddy.png" alt="" />
            </div>
        </div>

    )
}

export default HomepageLogo
