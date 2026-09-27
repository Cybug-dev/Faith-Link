import { useState } from 'react';
import { CallToAction } from '../../components/CallToAction/CallToAction';
import { FeatureGrid } from '../../components/FeatureGrid/FeatureGrid';
import { Hero } from '../../components/Hero/Hero';
import { Mission } from '../../components/Mission/Mission';
import { VideoDialog } from '../../components/VideoDialog/VideoDialog';

export function HomePage() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <>
      <div className="hero-frame">
        <Hero onWatchVideo={() => setIsVideoOpen(true)} />
      </div>
      <main>
        <FeatureGrid />
        <Mission />
        <CallToAction />
      </main>
      <VideoDialog open={isVideoOpen} onClose={() => setIsVideoOpen(false)} />
    </>
  );
}
