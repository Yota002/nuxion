<template>
  <aside
    :class="{ 'w-full': !route.params.id }"
    class="h-screen min-w-[280px] overflow-y-auto flex flex-col border-r"
  >
    <h1 class="text-2xl font-bold p-2 border-b">
      <NuxtLink to="/notes">Nuxion</NuxtLink>
    </h1>
    <div class="flex flex-col gap-2 p-2">
      <div class="flex gap-2">
        <input
          placeholder="Search"
          class="p-2 w-full border-2 border-slate-100 rounded-lg"
          type="text"
          v-model="search"
        />
        <button
          class="aspect-square h-full flex items-center justify-center border-2 border-slate-100 rounded-lg"
          @click="createNote()"
        >
          <span class="material-symbols-rounded">add</span>
        </button>
      </div>
      <ul class="h-full transition-all flex flex-col gap-2">
        <li :key="item.id" v-for="item of store.filteredNotes(search)">
          <NuxtLink
            :to="`/notes/${item.id}`"
            active-class="bg-slate-400"
            class="block p-2 bg-slate-200 rounded-lg transition-colors"
            >{{ item.title }}</NuxtLink
          >
        </li>
        <li v-if="!store.filteredNotes(search)?.length" class="text-center p-2">
          Nothing found :(
        </li>
      </ul>
    </div>
  </aside>
</template>

<script lang="ts" setup>
import { useRoute } from "vue-router";
import { useNotesStore } from "~/stores/notes";
const store = useNotesStore();
const route = reactive(useRoute());

const search = ref<string>("");

const createNote = () => {
  store.addNote({
    title: "New note",
    content: "You can add some content here",
  });
};
</script>

<style lang="scss" scoped></style>
