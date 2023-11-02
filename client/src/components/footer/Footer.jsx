

export default function Footer() {
    return (
        <footer className="bg-light text-dark p-5 shadow mt-5">
            <div className="d-flex justify-content-center">
                <div className="text-center">
                    <p>Made with <i className="fa fa-heart text-danger" /> by <span className="cursor-pointer">Team Mess Buddy</span></p>
                    <div className="mt-3">
                        <a rel="noreferrer" href="https://github.com/Ayush211107/dbms-miniproject" className="text-white text-decoration-none me-3" target="_blank">
                            <i className="text-dark fa-brands fa-github" />
                        </a>
                    </div>
                </div>
            </div>
        </footer>

    )
}
