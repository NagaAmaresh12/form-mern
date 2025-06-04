export default function ProjectCard({
  id,
  projectTitle,
  totalBudget,
  spentBudget,
}) {
  const remainingBudget = totalBudget - spentBudget;

  return (
    <Link
      to={`/projects/${id}`}
      className="w-[80vw] bg-white border border-zinc-900 rounded-lg p-4 my-4 hover:bg-zinc-100 transition-colors"
    >
      <h2 className="text-xl font-semibold">{projectTitle}</h2>
      <p>Total Budget: ₹{totalBudget}</p>
      <p>Spent: ₹{spentBudget}</p>
      <p>Remaining: ₹{remainingBudget}</p>
    </Link>
  );
}
