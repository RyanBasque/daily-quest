import { CenterTemplate } from '@/components/templates/CenterTemplate';
import { Typography } from '@/components/atoms/Typography';

export default function DashboardPage() {
  return (
    <CenterTemplate>
      <div className="text-center animate-in fade-in space-y-4">
        <Typography variant="h1">Today&apos;s Quests</Typography>
        <Typography variant="body">Your journey begins here. No quests active yet.</Typography>
      </div>
    </CenterTemplate>
  );
}
