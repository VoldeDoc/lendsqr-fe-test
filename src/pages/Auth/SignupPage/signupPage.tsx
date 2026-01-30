import '../../../styles/welcome.scss'
import { welcomeImage, logo } from '../../../../public';
import Floaters from '../../../components/Auth/Tools/floaters';
import SignupForm from '../../../components/Auth/signUpForm';


export default function SignupPage() {
    return (
        <div className="container">
            <div>
                <img src={logo} alt="Logo" className="topImage" />
            </div>
            <div className="welcome-container">
                <div className="spaced">    
                    <Floaters />
                    {/* Welcome image section (hidden on mobile) */}
                    <div className="welcomeImages">
                        <div>
                            <img src={welcomeImage} alt="Welcome Illustration" className="leftImage" />
                        </div>
                    </div>
                    {/* Signup form */}
                    <SignupForm />
                </div>
            </div>
        </div>
    );
}