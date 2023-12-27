# Comprendre les Tableaux de Dépendance de `useEffect`

## Introduction

Dans le monde de React, `useEffect` est un crochet (hook) essentiel pour la gestion des effets secondaires dans les composants fonctionnels. Son tableau de dépendances peut être source de confusion.

## 1. À Quoi Servent les Dépendances et Que Mettre Dedans?

Les dépendances dans `useEffect` servent à indiquer à React quand ré-exécuter l'effet. Si les valeurs dans le tableau changent entre les rendus, l'effet s'exécute à nouveau.

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

Incluez dans le tableau toutes les valeurs (props, états, etc.) utilisées dans l'effet et susceptibles de changer. Pour s'assurer que toutes les dépendances nécessaires soit incluses, vous pouvez utiliser la règle ESLint `exhaustive-deps`. Cela permet d'éviter les oublis de dépendances, assurant ainsi un comportement plus prévisible et fiable de vos effets.

Voilà par exemple à quoi ressemble l'erreur afficher avec Eslint quand on oublie de rajouter la dépendance :

![example d'erreur afficher par eslint](http://react-formation.fr/blogEffectDependencies.webp)

Lorsque ESLint détecte une dépendance manquante, il vous alertera. Corriger ces erreurs implique généralement d'ajouter la dépendance manquante au tableau.

## 2. Pourquoi useRef ne relance pas le UseEffect ?

Vous avez peut être dèjà essayé de mettre une référence dans le tableau de dépendance de votre useEffect, par exemple pour essayer de faire une action lors qu'un element du DOM apparait. Il y'a d'autre moment ou on peut utiliser useRef, c'est très souvent utilisé dans les formulaires pour gérer le focus d'un champs lors d'une erreur. Voilà un petit exemple assez simple :

```jsx
import * as React from "react";

export function UsernameForm({
  onSubmitUsername,
}: {
  onSubmitUsername: (username: string) => void,
}) {
  const [username, setUsername] = React.useState("");
  const [blur, setBlur] = React.useState(false);
  const usernameInputRef = React.useRef < HTMLInputElement > null;
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
```

Ce code marche très bien, il n'y a à priori aucune erreur. Cependant si vous avez eslint d'installer avec le plugin exhaustive-deps vous devriez avoir un warning qui ressemble à ça :

```
React Hook React.useEffect has an unnecessary dependency: 'usernameInputRef.current'. Either exclude it or remove the dependency array. Mutable values like 'usernameInputRef.current' aren't valid dependencies because mutating them doesn't re-render the component
```

En français ça donne :

> `usernameInputRef.current` n'est pas nécessaire, vous pouvez le supprimer de la liste de dépendance. `usernameInputRef.current` n'est pas une dépendance valide car le changer ne provoque pas de re-render du composant.

Bon essayons de comprendre plus en détail pourquoi. Première question, quel est la différence entre useState, et useRef ?
D'après la doc React :

> useRef est un Hook React qui vous permet de référencer une valeur qui n’est pas nécessaire au code du rendu lui-même.

---

**NOTE**

It works with almost all markdown flavours (the below blank line matters).

---

## 4. Conclusion

Comprendre le tableau de dépendances de `useEffect` est essentiel pour écrire des composants React efficaces et sans bugs. En respectant les règles d'ESLint et en comprenant le rôle des hooks comme `useRef`, vous pouvez éviter les erreurs courantes et améliorer les performances de vos applications.
