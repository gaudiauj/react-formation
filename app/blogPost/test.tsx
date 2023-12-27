import * as React from "react";

export function UsernameForm({
  onSubmitUsername,
}: {
  onSubmitUsername: (username: string) => void;
}) {
  const [username, setUsername] = React.useState("");
  const [blur, setBlur] = React.useState(false);
  const usernameInputRef = React.useRef<HTMLInputElement>(null);
  const usernameIsLowerCase = username === username.toLowerCase();
  const formIsValid = usernameIsLowerCase;
  const displayError = blur && !formIsValid;

  React.useEffect(() => {
    if (!displayError) usernameInputRef.current?.focus();
  }, [displayError, usernameInputRef.current]);

  let errorMessage = usernameIsLowerCase ? "" : "Le nom doit être en minuscule";

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setBlur(true);
    if (!formIsValid) return;
    onSubmitUsername(username);
  };
  const onUserChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.currentTarget.value);
  };

  const onBlur = () => {
    setBlur(true);
  };

  return (
    <form name="usernameForm" onSubmit={handleSubmit} noValidate>
      <div>
        <label htmlFor="nom">Nom:</label>
        <input
          ref={usernameInputRef}
          id="nom"
          type="text"
          value={username}
          onBlur={onBlur}
          onChange={onUserChange}
          required
          aria-describedby={!displayError ? "error-message" : undefined}
        />
      </div>
      {!displayError ? (
        <div role="alert" className="error-message">
          {errorMessage}
        </div>
      ) : null}
      <button type="submit">Valider</button>
    </form>
  );
}
