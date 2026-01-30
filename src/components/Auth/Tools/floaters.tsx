import '../../../styles/welcome.scss';
import { floatersData } from '../../../constant/data';
export default function Floaters() {
    return (
        <>
            {/* Main background floating layer */}
            <div className="floating-background">
                {floatersData.greetings.map((greeting, index) => (
                    <span key={`greeting-${index}`} className={`greeting g${index + 1}`}>
                        {greeting}
                    </span>
                ))}
                {Array.from({ length: floatersData.dotsCount }).map((_, index) => (
                    <div key={`dot-${index}`} className={`dot d${index + 1}`}></div>
                ))}
            </div>

            {/* Floating beside the form (right side) */}
            <div className="floating-beside">
                {floatersData.besideGreetings.map((greeting, index) => (
                    <span key={`beside-greeting-${index}`} className={`greeting beside bg${index + 1}`}>
                        {greeting}
                    </span>
                ))}
                {Array.from({ length: floatersData.besideDotsCount }).map((_, index) => (
                    <div key={`beside-dot-${index}`} className={`dot beside bd${index + 1}`}></div>
                ))}
            </div>
        </>
    );
}