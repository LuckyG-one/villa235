// "Website door Rouby.nl" credit, matching the mark used on Lukas' other sites.
export default function RoubyCredit() {
  return (
    <a
      className="rouby-credit"
      href="https://rouby.nl"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Website gebouwd door Rouby.nl"
    >
      <span className="rouby-credit-label">Website door</span>
      <span className="rouby-logo">
        <span className="rouby-word">
          Rouby<span className="rouby-tld">.nl</span>
        </span>
      </span>
    </a>
  );
}
