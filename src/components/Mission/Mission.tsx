import { CircleCheck } from 'lucide-react';
import communityImage from '../../assets/images/community-study.jpg';
import './Mission.scss';

const commitments = ['For Churches and Individuals', 'Focused on Biblical Truth', 'Safe and Moderated', 'Designed for Real Life'];

export function Mission() {
  return (
    <section className="mission" id="about" aria-labelledby="mission-title">
      <div className="mission__image-wrap">
        <img className="mission__image" src={communityImage} alt="Three friends enjoying Bible study together" loading="lazy" />
        <p className="mission__scribble" aria-hidden="true">Same Faith.<br />New Possibilities.</p>
      </div>

      <div className="mission__content">
        <p className="mission__eyebrow">Built for a brighter generation</p>
        <h2 id="mission-title">Faith. Friends. Fun. Growth.</h2>
        <p className="mission__summary">
          We believe young people can make a difference. FaithLink helps churches engage, teach,
          and inspire through technology — with tools that make learning the Bible exciting and accessible.
        </p>
        <ul className="mission__list">
          {commitments.map((commitment) => (
            <li key={commitment}><CircleCheck aria-hidden="true" fill="currentColor" /><span>{commitment}</span></li>
          ))}
        </ul>
      </div>
    </section>
  );
}
