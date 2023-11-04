export default defineNuxtRouteMiddleware((to, from) => {
  const store = useNotesStore();
  const id = to.params.id;
  const note = store.getNotes().find((n) => n.id === id);
  if (!note) return navigateTo("/notes");
  return !!note;
});
