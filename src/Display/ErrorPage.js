import { useNavigate } from "react-router-dom";

function ErrorPage({path}) {

    const navigate = useNavigate()

    setTimeout(function() {
        navigate(path)
    }, 3000);

    return(
        <div className="white-space">
            <div className="textwindow">
                <h1 className="undercontext">Looks Like There's Nothing Here!</h1>
                <h3 className="undercontext">Redirecting in 3 Seconds</h3>
            </div>
        </div>
    )
}

export default ErrorPage
