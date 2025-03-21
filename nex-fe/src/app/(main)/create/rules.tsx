// this creates the rules in the /create

const Rules = () => {
  return (
    <>
      <section className="rounded-md mt-4 mr-4 h-[80vh] w-[20vw] border-2 p-4">
        <h2 className="font-bold mb-2">Posting Guidelines</h2>
        <ul className="list-disc ml-4 space-y-2">
          <li>Do not include inappropriate, vulgar, or offensive language.</li>
          <li>Avoid using slurs, hate speech, or discriminatory remarks.</li>
          <li>
            Refrain from discussing illegal activities or promoting violence.
          </li>
          <li>
            Stay on topic and ensure your posts are relevant to development,
            collaboration, and tech-related discussions.
          </li>
          <li>Avoid spamming, advertising, or posting unrelated content.</li>
        </ul>
      </section>
    </>
  );
};

export default Rules;
