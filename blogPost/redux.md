# Vous utilisez probablement redux de la mauvaise façon

## introduction

Je suis developpeur web depuis un peu plus de 8 ans. Depuis ces 8 ans, j'ai connu angular, vue.js, aurelia.js, react.js, Embersjs. Et franchement ils ont tous à leur façon révolutionner le web front. Les SPA, l'approche composant plutôt que balancer des script à droite à gauche, et surtout un state gérer par ces frameworks. De bases un state, c'est super, ça permet de communiquer de la data entre différente partie de l'application de façon efficace. Dans la pratique chaque framework (ou librairie :) ) gère les choses de manière un peu différente. Et c'est la ou Redux est apparu qui se défini comme

> Redux a Predictable State Container for JS Apps

Redux viens avec sa philosophie et tant que 'state manager' agnostique, et qui peux donc être utilisé sur l'ensemble des frameworks.

## Redux

Petit disclaimer, je suis expert sur React donc l'ensemble des exemples sont fait sur React. Mais aujourd'hui vu qu'on parle de redux, l'ensemble de ce que je vais dire rester vrai même si vous utilisez angular, svelte ou du vanilla js etc.
L'une des raisons pour lesquelles Redux a connu un tel succès sur React était le fait que React-Redux a résolu le problème de '[props drilling](https://kentcdodds.com/blog/prop-drilling)'. Le fait que vous puissiez partager des données entre différentes parties de votre arborescence en passant simplement votre composant dans une fonction à régler un des plus gros soucis de React à l'époque. Le soucis c'est que toute la philosophie dêrrière Redux à été mise de coter, et il à été utiliser seulement pour regler ce soucis de 'props driling'. Même si React c'est bien amèliorer dans la gestion de son state, redux est encore très souvent utiliser, et souvent mal optimiser. J'ai récement travailler sur un projet dont mon rôle etait de supprimer Redux pour mettre du contexst React à la place. La raison principal :

> Redux c'est lent, et compliqué à utiliser, beaucoup trop verbeux.

Dans les fait le soucis c'est pas Redux mais comment il à été utilisé

## Un petit exemple de ce qu'il ne faut pas faire

Dans un code Redux typique, les actions sont couramment utilisées comme setters. Par exemple voilà à quoi peux ressembler un code d'une petite todo app :

```js
// Component/Button.js
import { useDispatch } from "react-redux";
import { addTodo } from "../actions/todoActions";
import { analyticsTrack } from "../actions/analyticsActions";

const AddTodoButton = ({ todo }) => {
  const dispatch = useDispatch();

  const handleAddTodo = () => {
    dispatch(addTodo(todo));
  };

  return <button onClick={handleAddTodo}>Ajouter une Tâche</button>;
};
```

l'action :

```js
// actions/todoActions.js
export const addTodo = (todo) => ({
  type: "ADD_TODO",
  payload: todo,
});
```

et le reducer :

```js
// reducers/todoReducer.js
const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TODO":
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };
    default:
      return state;
  }
};
```

Jusque la, tout semble assez facile et rien de choquant.
Sauf qu'un jour votre equipe marketing à une super idée ! ils veulent rajouter des tracking sur l'ajout de todo. Pas de soucis pour vous, il suffit de rajouter un dispatch !

```js
// Component/Button.js
import { useDispatch } from "react-redux";
import { addTodo } from "../actions/todoActions";
import { analyticsTrack } from "../actions/analyticsActions";

const AddTodoButton = ({ todo }) => {
  const dispatch = useDispatch();

  const handleAddTodo = () => {
    dispatch(addTodo(todo));
    dispatch(addTracking);
  };

  return <button onClick={handleAddTodo}>Ajouter une Tâche</button>;
};
```

```js
// reducers/marketingReducer.js
const marketingReducer = (state = initialState, action) => {
  // on est d'accord que dans la vrai vie on met pas la data dans un state en local, mais c'est pour l'exemple alors faites comme si c'est normal
  switch (action.type) {
    case "ADD_TRACKING":
      return {
        ...state,
        track: state.track + 1,
      };
    default:
      return state;
  }
};
```

Puis une autre super idée le Marketing, encore eux, veulent rajouter une lotterie sur l'ajout des todos, easy peasy :

```js
// Component/Button.js
import { useDispatch } from "react-redux";
import { addTodo } from "../actions/todoActions";
import { analyticsTrack } from "../actions/analyticsActions";

const AddTodoButton = ({ todo }) => {
  const dispatch = useDispatch();

  const handleAddTodo = () => {
    dispatch(addTodo(todo));
    dispatch(addTracking);
    dispatch(addLotterieTicket);
  };

  return <button onClick={handleAddTodo}>Ajouter une Tâche</button>;
};
```

```js
// reducers/LotterieReducer.js
const lotterieReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_LOTTERIE_TICKET":
      return {
        ...state,
        tickets: state.ticket + 1,
      };
    default:
      return state;
  }
};
```

Vous commencez à voir le soucis ? car le marketing oui, ils ont reçus seulement 500 evénément de tracking alors qu'en base de donnée on en à eu 2000 nouvelles todo !
Mais il est ou le soucis ?
Mauvaise nouvelle vous avez oublier de rajouter le dispatch sur le deuxième bouton en haut de page :( .

Ca peux sembler un peux bête mais je suis certain que ca vous est dèjà arriver d'oublier de mettre à jour une partie de votre code, 2 actions similaires à 2 endroits différents. Mais alors comment mieux faire ?

## Comment bien utiliser Redux ?

### L'Approche Événementielle avec redux

Dans les bonne pratiques de Redux il y'a une chose qui est très souvent oublié ou juste pas connu, c'est de [traiter les actions comme des événement et pas des setters](https://redux.js.org/style-guide/#model-actions-as-events-not-setters). Alors qu'est ce que ça donne quand on essaye de prendre ça en compte.

Reprennons notre bouton :

```js
// Component/Button.js
import { useDispatch } from "react-redux";
import { addTodo } from "../actions/todoActions";
import { analyticsTrack } from "../actions/analyticsActions";

const AddTodoButton = ({ todo }) => {
  const dispatch = useDispatch();

  const handleAddTodo = () => {
    dispatch(onAddTodo(todo));
  };

  return <button onClick={handleAddTodo}>Ajouter une Tâche</button>;
};
```

Vous voyer la différence ? c'est pas forcément évident à voir, mais on dispatch pas la même action, on est passé de `addTodo` à `onAddTodo`. Et ça fait toute la différence.

Pourquoi ? et bien regardon maintenant le reducers :

```js
// reducers/todoReducer.js
const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ON_ADD_TODO":
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };
    default:
      return state;
  }
};
```

Bon c'est la même chose qu'avant mais, maintenant quand le marketing vous demande de rajouter le tracking, et bien c'est beaucoup plus simple, il suffit de rajouter un reducer sans changer le code du bouton :

```js
// reducers/marketingReducer.js
const marketingReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ON_ADD_TODO":
      return {
        ...state,
        track: state.track + 1,
      };
    default:
      return state;
  }
};
```

```js
// reducers/LotterieReducer.js
const lotterieReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ON_ADD_TODO":
      return {
        ...state,
        tickets: state.ticket + 1,
      };
    default:
      return state;
  }
};
```

Et ben oui en pensant nos action comme des événements et non des setters, on peut faire plusieurs actions avec un seul Dispatch. Ca peut paraitre un peu simple, mais je vous assure que sur une grosse app ça fait toute la difference pour la maintenance et la robustesse. Tout simplement en pensant un tout petit peut différement.

## Avantages de l'approche événementielle :

### 1. Maintenabilité :

Les événements favorisent un code plus propre en permettant à des réducteurs distincts de gérer différents aspects d'une action. Cette séparation améliore la maintenabilité du code et réduit le besoin de modifications importantes lors de l'ajout de nouvelles fonctionnalités.

### 2. Évolutivité :

À mesure que votre application se développe, la gestion des événements devient plus évolutive. De nouvelles fonctionnalités, telles que des analyses supplémentaires ou des fonctionnalités liées à un événement de tâche, peuvent être ajoutées de manière transparente sans modifier les composants existants.

### 3. Logique centralisée :

L'approche événementielle centralise la logique associée à une action, ce qui facilite sa gestion et sa mise à jour. Les analyses ou tout autre effet secondaire deviennent plus modulaires et peuvent être modifiés indépendamment.

## Conclusion:

Traiter les actions comme des événements plutôt que comme de simples setters offre une approche plus flexible et plus maintenable. En adoptant ce changement de paradigme, les développeurs peuvent facilement intégrer de nouvelles fonctionnalités sans constamment revoir et mettre à jour les composants.
