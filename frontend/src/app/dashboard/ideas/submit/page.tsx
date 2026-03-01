import { IdeaForm } from '../../../../components/ideas/IdeaForm';

export default function SubmitIdeaPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Submit New Idea</h1>
        <p className="text-gray-400 text-sm mt-1">Fill out all steps to submit your idea. Costs 5 coins.</p>
      </div>
      <IdeaForm />
    </div>
  );
}
