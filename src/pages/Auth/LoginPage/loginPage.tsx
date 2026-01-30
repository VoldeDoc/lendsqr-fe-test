import '../../../styles/welcome.scss';
import { welcomeImage } from '../../../../public';
import { logo } from '../../../../public';
import Floaters from '../../../components/Auth/Tools/floaters';
import LoginForm from '../../../components/Auth/loginForm';

export default function LoginPage() {
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
          {/* Login form */}
          <LoginForm />
        </div>
      </div>
    </div>
  );
}