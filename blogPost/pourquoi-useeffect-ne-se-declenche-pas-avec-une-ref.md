# Pourquoi useEffect ne se déclenche pas avec une ref

## Introduction

Dans le monde de React, `useEffect` est un crochet (hook) essentiel pour la gestion des effets secondaires dans les composants fonctionnels. Son tableau de dépendances peut être source de confusion.

## 1. À quoi servent les dépendances de useEffect ?

Les dépendances dans `useEffect` servent à indiquer à React quand réexécuter l'effet. Si les valeurs dans le tableau changent entre les rendus, l'effet s'exécute à nouveau. C'est une solution pour garder les dépendances externes à React à jour avec le state.

**Exemple de Code avec Problème :**

```jsx
const App = () => {
  const [count, setCount] = useState(0);

  useEffect(function () {
    setInterval(function log() {
      console.log(`Count is: ${count}`);
    }, 2000);
  }, []); // Tableau de dépendances vide

  return (
    <div className="App">
      {count}
      <button onClick={() => setCount(count + 1)}>Increase</button>
    </div>
  );
};
```

Ici, le tableau étant vide, le code à l'intérieur ne se lance qu'une seule fois à l'initialisation du composant. Nous avons donc un seul `console.log` affiché, peu importe le nombre de fois où l'on clique sur le bouton :

`Count is: 0`

Rien de bien compliqué pour corriger le souci, il suffit de rajouter `count` en dépendance.

```jsx
useEffect(
  function () {
    setInterval(function log() {
      console.log(`Count is: ${count}`);
    }, 2000);
  },
  [count]
);
```

La règle habituelle est simple, incluez dans le tableau toutes les valeurs (props, états, etc.) utilisées et susceptibles de changer. Pour s'assurer que toutes les dépendances nécessaires soient incluses, vous pouvez utiliser la règle [ESLint `exhaustive-deps`](https://www.npmjs.com/package/eslint-plugin-react-hooks). Cela permet d'éviter les oublis de dépendances, assurant ainsi que votre code fonctionne à chaque fois.

Voilà, par exemple, à quoi ressemble l'erreur affichée avec ESLint quand on oublie de rajouter la dépendance :

![React Hook useEffect has a missing dependency: 'count'.
Either include it or remove the dependency array  react-hooks/exhaustive-deps](https://react-formation.fr/missingDependenciesError.png)

Lorsque ESLint détecte une dépendance manquante, il vous alerte. Corriger ces erreurs implique généralement d'ajouter la dépendance manquante au tableau.

## 2. Pourquoi ma ref ne relance pas le UseEffect ?

Vous avez peut-être déjà été tenté de mettre une référence dans le tableau de dépendance de votre useEffect, par exemple pour essayer de faire une action lorsqu'un élément du DOM apparaît. Ou alors dans les formulaires pour gérer le focus d'un champ lors d'une erreur. Voilà un petit exemple assez simple :

```jsx
import * as React from "react";

export function UsernameForm({
  onSubmitUsername,
}: {
  onSubmitUsername: (username: string) => void,
}) {
  const [username, setUsername] = React.useState("");
  const [blur, setBlur] = React.useState(false);
  const NameRef = React.useRef < HTMLInputElement > null;
  const usernameIsLowerCase = username === username.toLowerCase();
  const formIsValid = usernameIsLowerCase;
  const displayError = blur && !formIsValid;

  React.useEffect(() => {
    if (!displayError) {
      NameRef.current?.focus();
    }
  }, [displayError, NameRef.current]);

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
          ref={NameRef}
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
```

Ce code marche très bien, il n'y a a priori aucune erreur. Cependant, si vous avez ESLint d'installé avec le plugin exhaustive-deps, vous devriez avoir un avertissement qui ressemble à ça :

```js
React Hook React.useEffect has an unnecessary dependency: 'NameRef.current'.
Either exclude it or remove the dependency array. Mutable values like
'NameRef.current' aren't valid dependencies because mutating them doesn't re-render the component
```

En français ça donne :

> `NameRef.current` n'est pas nécessaire, vous pouvez le supprimer de la liste de dépendances. `NameRef.current` n'est pas une dépendance valide car le changer ne provoque pas de re-render du composant.

Bon, essayons de comprendre plus en détail pourquoi. Première chose, quelle est la différence entre useState et useRef ?
D'après la doc [React.js](https://fr.react.dev/reference/react/useRef) :

> useRef est un Hook React qui vous permet de référencer une valeur qui n’est pas nécessaire au code du rendu lui-même.

> useRef renvoie un objet doté d’une unique propriété : current
>
> elle vaut initialement la initialValue que vous avez passée. Vous pourrez ensuite la modifier. Si vous passez l’objet ref à React en tant que prop ref d’un nœud JSX, React définira automatiquement sa propriété current.
>
> Lors des rendus ultérieurs, useRef renverra le même objet.

Il y a plusieurs infos intéressantes ici, la première que vous ne savez peut-être pas, c'est que vous pouvez utiliser useRef pour n'importe quelle valeur, et pas seulement un élément JSX. (On peut par exemple garder un identifiant de timer entre deux rendus. Je ferai un post de blog pour en parler plus en détail dans le futur).
Ce qui est important dans notre contexte, c'est cette dernière phrase : `useRef renverra le même objet`. Cela implique donc qu'une ref est un pointeur qui référence toujours le même objet. Et donc que React n'a aucun moyen de savoir que la valeur d'une ref a changé.

Si React ne sait pas que la valeur a changé, il ne peut pas relancer la fonction du `useEffect`. Tout s'explique, pour React, la ref a toujours la même valeur. Par conséquent, mettre ou ne pas mettre la ref dans le tableau de dépendances ne change absolument rien. C'est pourquoi ESLint nous donne seulement un avertissement et pas une erreur.

## 3. Conclusion

Comprendre le tableau de dépendances de `useEffect` est essentiel pour écrire des composants React efficaces et sans bugs. En suivant les règles d'ESLint, vous pouvez éviter les erreurs courantes et améliorer les performances de vos applications. Mais rappelez-vous qu'une ref reste toujours constante et donc qu'elle n'a pas sa place dans le tableau de dépendances. Si vous avez besoin que votre `useEffect` se relance, vous pouvez toujours mettre votre valeur dans un `useState` plutôt qu'un `useRef`.